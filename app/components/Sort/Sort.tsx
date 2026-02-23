"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SvgSort from "../Icon/Sort";
import clsx from "clsx";

interface SortDropdownProps {
  children: React.ReactNode;
}

export default function SortDropdown({ children }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const selectedOption = options.find((opt) => opt.value === value);
  // 🔹 Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "px-3 py-2 rounded-full font-medium shadow-sm text-xs lg:text-sm md:text-sm flex gap-1 hover:cursor-pointer",
          isOpen ? "bg-[#1d4ed8] text-white" : "bg-white text-slate-500",
        )}
      >
        Sort
        <span className="flex items-center gap-2">
          <SvgSort />
        </span>
      </button>

      {/* 🔹 Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
