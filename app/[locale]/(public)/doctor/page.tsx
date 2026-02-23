"use client";

import {
  doctorsDummy,
  mappingSpecialties,
  dummySpecialties,
  Doctor,
} from "@/app/dummyData";
import DoctorCard from "@/app/components/CardDoctor/CardDoctor";
import FilterPill from "@/app/components/PillCheckbox/FiterPill";
import Pagination from "@/app/components/Pagination/Pagination";
import { usePaginationFilter } from "@/app/library/usePagination";
import SortDropdown from "@/app/components/Sort/Sort";
import { useMediaQuery } from "@/app/library/useMediaQuery";
import { useTranslations } from "next-intl";
import SvgCircleDown from "@/app/components/Icon/CircleDown";
import SortData from "./components/SortData";
import ListDoctors from "./components/ListDoctor";

export default function DoctorPage() {
  const t = useTranslations();

  return (
    <section className="w-[90%] md:w-[85%] xl:w-[85%] mx-auto pt-40 bg-linear-to-br from-fuchsia-50 to-teal-50 relative py-4">
      <section className="text-center mb-14">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
          {t("doctor.title")}
          <span className="text-emerald-600">
            &nbsp;{t("doctor.highlight")}
          </span>
        </h1>
        <div className="py-6">
          <ListDoctors showSearch={true} />
        </div>
      </section>
    </section>
  );
}
