"use client";

import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import JobDetail from "@/app/components/Career/JobDetail";
import SvgArrow from "@/app/components/Icon/Arrow";
import Modal from "@/app/components/Modal/Modal";
import FilterPill from "@/app/components/PillCheckbox/FiterPill";
import { dummyJobs, dummyJobsCategory, IDummyJob } from "@/app/dummyData";
import { normalizeFilter } from "@/app/library/normalizeFilter";
import { usePaginationFilter } from "@/app/library/usePagination";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // smooth easeOut
    },
  }),
};
export default function CareersPage() {
  const {
    items: jobs,
    page,
    hasNext,
    hasPrev,
    handlePageChange,
    filters,
    handleFilterChange,
  } = usePaginationFilter({
    data: dummyJobs,
    limit: 10,
    filterFn: (item, filters) => {
      const selectedTags = normalizeFilter(filters.tag);

      if (!selectedTags.length) return true;

      return item.tags.some((tag) => selectedTags.includes(tag));
    },
  });

  // const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<IDummyJob>();
  const [isOpen, setIsopen] = useState<boolean>(false);

  const toggleModal = () => setIsopen((prevState) => !prevState);
  console.log("??filtersxx", normalizeFilter(filters?.tag), filters);
  return (
    <main className="bg-linear-to-br from-fuchsia-50 to-teal-50 min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <Modal
          widthModal="lg"
          isOpen={isOpen}
          title={`Detail Job ${selectedData?.title}`}
          onClose={toggleModal}
          footer={
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-gray-500 text-center lg:text-left">
                {selectedData?.applicantsCount} applicants • Posted{" "}
                {selectedData?.postedAt}
              </div>

              <button className="bg-emerald-600 cursor-pointer text-white px-6 py-2 rounded-xl hover:opacity-90 transition">
                Apply Now
              </button>
            </div>
          }
        >
          <JobDetail job={selectedData as IDummyJob} />
        </Modal>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16"
        >
          {/* Soft Medical Gradient */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-tr from-blue-400 to-teal-300 rounded-full blur-3xl opacity-30 -z-10" />
          <span className="inline-block text-sm px-4 py-1 border border-emerald-800/50 rounded-full mb-6 text-emerald-800/50">
            We’re hiring!
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-700">
            Join Our Healthcare Mission
          </h1>

          <p className="text-lg text-neutral-600 max-w-2xl">
            Be part of a compassionate team dedicated to excellence in patient
            care. We value teamwork, integrity, and innovation.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <FilterPill
            selected={normalizeFilter(filters?.tag)}
            onChange={(v) => handleFilterChange("tag", v)}
            arrPill={dummyJobsCategory as []}
          />
        </motion.div>

        <hr className="border-neutral-300 mb-10" />

        <div className="space-y-10">
          {jobs.map((job, index) => (
            <motion.div
              key={job.title}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition border-b border-dashed lg:pb-2 md:pb-2 xl:pb-2 pb-1 border-b-slate-400"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-slate-700">
                  {job.title}
                </h2>
                <p className="text-neutral-600 mb-4">{job.description}</p>

                <div className="flex gap-3 flex-wrap">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 border border-slate-500/50 bg-slate-600 rounded-full text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                className="text-lg font-medium pl-2 w-20 text-blue-700 hover:underline flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setSelectedData(job);
                  toggleModal();
                }}
              >
                Detail
                <SvgArrow />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
