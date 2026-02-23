import { Doctor, doctorsDummy, dummySpecialties } from "@/app/dummyData";

import { usePaginationFilter } from "@/app/library/usePagination";
import { useMediaQuery } from "@/app/library/useMediaQuery";
import { useTranslations } from "next-intl";
import FilterPill from "@/app/components/PillCheckbox/FiterPill";
import Pagination from "@/app/components/Pagination/Pagination";
import DoctorCard from "@/app/components/CardDoctor/CardDoctor";
import SortDropdown from "@/app/components/Sort/Sort";
import SortData from "./SortData";
import SvgSort from "@/app/components/Icon/Sort";

interface IListDoctors {
  showSearch?: boolean;
}

const ListDoctors = ({ showSearch }: IListDoctors) => {
  const t = useTranslations("");

  const { isDesktop, isTablet } = useMediaQuery();

  const {
    items: doctors,
    page,
    hasNext,
    hasPrev,
    handlePageChange,
    filters,
    handleFilterChange,
    handleSearchChange,
    search,
    handleSortChange,
    sort,
    sortOrder,
    isPending,
  } = usePaginationFilter({
    data: doctorsDummy,
    limit: isDesktop ? 10 : isTablet ? 9 : 5,
    searchFn: (item, search) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    filterFn: (item, filters) => {
      if (!filters.specialty) return true;

      const specialties = Array.isArray(filters.specialty)
        ? filters.specialty
        : [filters.specialty];

      return specialties.includes(item.specialty);
    },
    sortFn: (a, b, field, order) => {
      const valA = a[field as keyof Doctor];
      const valB = b[field as keyof Doctor];

      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    },
  });

  const arrPill = dummySpecialties.map((s) => ({
    value: s.label,
    label: t(`specialties.${s.id}`),
  }));

  return (
    <>
      {showSearch && (
        <div className="mt-8 max-w-2xl mx-auto mb-15">
          <input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari nama dokter..."
            className="w-full px-6 py-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none text-slate-800"
          />
        </div>
      )}
      <div className="w-full flex flex-row text-gray-700 py-2 justify-between items-center">
        <FilterPill
          selected={
            filters.specialty
              ? Array.isArray(filters.specialty)
                ? filters.specialty
                : [filters.specialty]
              : []
          }
          onChange={(v) => handleFilterChange("specialty", v)}
          arrPill={arrPill as []}
        />
        <div className="pr-2">
          <SortDropdown title="sort" icon={<SvgSort />}>
            <SortData
              option={[{ key: 1, label: "Name", value: "name" }]}
              onChange={(val, order) => handleSortChange(val, order)}
              value={[sort, sortOrder]}
            />
          </SortDropdown>
        </div>
      </div>

      <div
        className="
         grid gap-4
    grid-cols-2
    md:grid-cols-3
    lg:grid-cols-5
    lg:gap-10
    xl:grid-cols-6
    xl:gap-4
        "
      >
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            specialty={t(`specialties.${doctor.specialtyId}`)}
            experience={doctor.experience}
            location={doctor.location}
            isOnline={doctor.isOnline}
            reviews={doctor.reviews}
            rating={doctor.rating}
            image="/doctor.webp"
            slug={doctor.name}
          />
        ))}
      </div>

      {doctors.length === 0 && !isPending && (
        <p className="text-center mt-10 text-slate-700">
          Dokter tidak ditemukan.
        </p>
      )}
      <div className="mt-2 flex">
        <Pagination
          next={() => handlePageChange(page + 1)}
          prev={() => handlePageChange(page - 1)}
          hasNextPage={hasNext}
          hasPreviousPage={hasPrev}
        />
      </div>
    </>
  );
};

export default ListDoctors;
