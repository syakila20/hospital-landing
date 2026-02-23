/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/app/library/useMediaQuery";
import MotionCheckboxPill from "./PillCheck";

interface PillItem {
  label: string;
  value: string;
}

interface Props {
  selected: any[];
  onChange: (value: string[]) => void;
  arrPill: PillItem[];
}

export default function FilterPill({ selected, onChange, arrPill }: Props) {
  const [open, setOpen] = useState(false);
  const { isMobile, isTablet } = useMediaQuery();

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((i) => i !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const visible = arrPill.slice(0, isMobile ? 2 : isTablet ? 5 : 10);
  const hiddenCount = arrPill.length - visible.length;

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        {visible.map((item) => (
          <MotionCheckboxPill
            key={item.value}
            label={item.label}
            checked={selected.includes(item.value)}
            onToggle={() => toggle(item.value)}
          />
        ))}

        {hiddenCount > 0 && (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-full border text-xs lg:text-sm md:text-sm text-gray-600 hover:bg-gray-100"
          >
            +{hiddenCount} lainnya
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md
                         -translate-x-1/2 -translate-y-1/2
                         bg-white rounded-2xl p-4 shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h3 className="text-sm font-semibold mb-3 text-slate-800">
                Pilih Spesialis
              </h3>

              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {arrPill.map((item) => (
                  <MotionCheckboxPill
                    key={item.value}
                    label={item.label}
                    checked={selected.includes(item.value)}
                    onToggle={() => toggle(item.value)}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
