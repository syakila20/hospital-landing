"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useCallback, useTransition } from "react";

type Filters = Record<string, string | string[]>;

interface UsePaginationFilterProps<T> {
  data: T[];
  limit?: number;
  searchKey?: string;
  searchFn?: (item: T, search: string) => boolean;
  filterFn?: (item: T, filters: Filters) => boolean;
  sortFn?: (a: T, b: T, field: string, order: "asc" | "dsc") => number;
}

export function usePaginationFilter<T>({
  data,
  limit = 10,
  searchKey = "search",
  searchFn,
  filterFn,
  sortFn,
}: UsePaginationFilterProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // -------------------------------
  // URL as source of truth
  // -------------------------------
  const page = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get(searchKey) ?? "";
  const sort = searchParams.get("sort") ?? "";
  const sortOrder = (searchParams.get("order") as "asc" | "dsc") ?? "asc";
  const filters: Filters = useMemo(() => {
    const obj: Filters = {};
    searchParams.forEach((value, key) => {
      if (key !== "page" && key !== searchKey) {
        obj[key] = value.split(",").map((v) => decodeURIComponent(v)); // decode setiap item
      }
    });
    return obj;
  }, [searchParams, searchKey]);

  // -------------------------------
  // Helper update query
  // -------------------------------
  const updateQuery = useCallback(
    (
      params: Record<string, string | string[] | number | undefined>,
      options?: { replace?: boolean },
    ) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          newParams.delete(key);
        } else {
          if (Array.isArray(value)) {
            newParams.set(key, value.join(",")); // multiple values
          } else {
            newParams.set(key, String(value));
          }
        }
      });

      startTransition(() => {
        if (options?.replace) {
          router.replace(`?${newParams.toString()}`, { scroll: false });
        } else {
          router.push(`?${newParams.toString()}`, { scroll: false });
        }
      });
    },
    [router, searchParams],
  );

  // -------------------------------
  // Filter & search logic
  // -------------------------------

  const filteredData = useMemo(() => {
    let result = data;

    if (search && searchFn) {
      result = result.filter((item) => searchFn(item, search));
    }

    if (filterFn) {
      result = result.filter((item) => filterFn(item, filters));
    }

    if (sort && sortFn) {
      result = result.slice().sort((a, b) => sortFn(a, b, sort, sortOrder));
    }

    return result;
  }, [data, search, filters, sort, sortOrder, searchFn, filterFn, sortFn]);

  // -------------------------------
  // Pagination
  // -------------------------------
  const totalPages = Math.ceil(filteredData.length / limit);
  const safePage = page < 1 ? 1 : page > totalPages ? totalPages : page;

  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * limit;
    return filteredData.slice(start, start + limit);
  }, [filteredData, safePage, limit]);

  // -------------------------------
  // Handlers
  // -------------------------------
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    updateQuery({ page: newPage });
  };

  const handleSearchChange = (value: string) => {
    updateQuery(
      {
        [searchKey]: value,
        page: 1,
      },
      { replace: true }, // search pakai replace
    );
  };

  const handleSortChange = (field: string, order: "asc" | "dsc") => {
    updateQuery({
      sort: field,
      order,
      page: 1,
    });
  };

  const handleFilterChange = (key: string, value: string | string[]) => {
    updateQuery({
      [key]: value,
      page: 1,
    });
  };

  const hasNext = safePage < totalPages;
  const hasPrev = safePage > 1;

  return {
    items: paginatedData,
    page: safePage,
    totalPages,
    search,
    filters,
    sort,
    sortOrder,
    isPending,
    hasNext,
    hasPrev,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
  };
}
