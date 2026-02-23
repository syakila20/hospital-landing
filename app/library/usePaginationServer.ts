"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface UsePaginationOptions {
  searchKey?: string;
}

export function usePagination({
  searchKey = "search",
}: UsePaginationOptions = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const page = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get(searchKey) ?? "";

  // ambil semua filter selain page
  const filters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== "page") {
      filters[key] = value;
    }
  });

  const updateQuery = useCallback(
    (
      params: Record<string, string | number | undefined>,
      options?: { replace?: boolean },
    ) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
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

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    updateQuery({ page: newPage });
  };

  const handleSearchChange = (value: string) => {
    updateQuery(
      {
        [searchKey]: value,
        page: 1,
      },
      { replace: true },
    );
  };

  const handleFilterChange = (key: string, value: string) => {
    updateQuery({
      [key]: value,
      page: 1,
    });
  };

  return {
    page,
    search,
    filters,
    isPending,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
  };
}
