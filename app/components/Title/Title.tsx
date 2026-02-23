"use client";

import { motion } from "framer-motion";
import SvgArrow from "../Icon/Arrow";
import Link from "next/link";

interface ISectionTitle {
  title: string;
  linkTo?: string;
}

const SectionTitle = ({ title, linkTo }: ISectionTitle) => {
  // Variants untuk stagger animasi garis
  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: "auto", opacity: 1 },
  };

  return (
    <section className="py-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <div className="flex flex-row gap-2 items-center sm:w-70 lg:w-130">
          <span className="text-3xl font-semibold text-slate-700  capitalize lg:text-4xl">
            {title}
          </span>
          {linkTo && (
            <Link href={linkTo}>
              <SvgArrow
                height="25"
                className="text-neutral-700 w-10 hover:text-blue-500 cursor-pointer"
              />
            </Link>
          )}
        </div>

        {/* Garis putus-putus */}
        <div className="mt-2 flex items-center gap-1">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-block h-1 w-20 rounded-full bg-blue-500"
          ></motion.span>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-block h-1 w-3 rounded-full bg-blue-500"
          ></motion.span>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-block h-1 w-1 rounded-full bg-blue-500"
          ></motion.span>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionTitle;
