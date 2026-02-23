import React from "react";
import SvgChevronLeft from "../Icon/Chevron";
import clsx from "clsx";

interface IPagination {
  next: () => void;
  prev: () => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  page?: number;
  totalPages?: number;
}

const Pagination: React.FC<IPagination> = ({
  next,
  prev,
  hasNextPage,
  hasPreviousPage,
  page,
  totalPages,
}) => {
  return (
    <div className="flex flex-row gap-2 justify-end items-center w-full">
      {page && (
        <p className="text-slate-800 flex-6">
          Page {page} of {totalPages}
        </p>
      )}
      <div className="flex flex-row gap-2 items-center">
        <button
          className={clsx(
            "px-2 py-2 rounded-full text-white transition",
            hasPreviousPage
              ? "bg-blue-600 hover:bg-blue-800 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed",
          )}
          // disabled={!hasPreviousPage}
          onClick={prev}
        >
          <SvgChevronLeft height="20" />
        </button>

        <button
          className={clsx(
            "px-2 py-2 rounded-full text-white transition",
            hasNextPage
              ? "bg-blue-600 hover:bg-blue-800 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed",
          )}
          // disabled={!hasNextPage}
          onClick={next}
        >
          <SvgChevronLeft className="rotate-180" height="20" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
