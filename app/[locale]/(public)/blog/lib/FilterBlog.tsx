import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionCheckboxPill from "@/app/components/PillCheckbox/PillCheck";

const specialties = [
  "Anak",
  "Jantung",
  "Tidur",
  "Diabetes",
  "Mental Health",
  "Nutrisi",
  "Olahraga",
];

export default function FilterBlogPill() {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const visible = specialties.slice(0, 10);
  const hiddenCount = specialties.length - visible.length;

  return (
    <div className="relative -mt-4">
      <div className="flex flex-wrap gap-2">
        {visible.map((item) => (
          <MotionCheckboxPill
            key={item}
            label={item}
            checked={selected.includes(item)}
            onToggle={() => toggle(item)}
          />
        ))}

        {hiddenCount > 0 && (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-full border text-sm text-gray-600 hover:bg-gray-100"
          >
            +{hiddenCount} lainnya
          </button>
        )}
      </div>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md
                         -translate-x-1/2 -translate-y-1/2
                         bg-white rounded-2xl p-4 shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h3 className="text-sm font-semibold mb-3">Pilih Spesialis</h3>

              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {specialties.map((item) => (
                  <MotionCheckboxPill
                    key={item}
                    label={item}
                    checked={selected.includes(item)}
                    onToggle={() => toggle(item)}
                  />
                ))}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-4 w-full py-2 rounded-lg bg-blue-500 text-white text-sm cursor-pointer"
              >
                Terapkan
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
