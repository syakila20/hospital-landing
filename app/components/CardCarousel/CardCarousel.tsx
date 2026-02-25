// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import SvgChevronLeft from "../Icon/Chevron";

// export type CarouselItem = {
//   key: string;
//   [key: string]: any;
// };

// type CarouselProps<T> = {
//   items: T[];
//   renderActive: (item: T) => React.ReactNode;
//   renderItem: (item: T) => React.ReactNode;
// };

// export default function CarouselPremiumSimple({
//   items,
//   activeWidth = "w-70",
//   activeHeight = "h-95",
//   itemWidth = "w-50",
//   itemHeight = "h-85",
// }: CarouselProps) {
//   const [carousel, setCarousel] = useState(items);

//   const rotateLeft = () => {
//     setCarousel((prev) => [...prev.slice(1), prev[0]]);
//   };

//   const rotateRight = () => {
//     setCarousel((prev) => [
//       prev[prev.length - 1],
//       ...prev.slice(0, prev.length - 1),
//     ]);
//   };

//   const activeCard = carousel[0];
//   const rightCards = carousel.slice(1);

//   return (
//     <section className="w-[95%] md:w-[85%] xl:w-[85%] mx-auto relative py-24  overflow-hidden">
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative">
//         <motion.div
//           key={activeCard.key}
//           layout
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ type: "spring", stiffness: 120 }}
//           className={`${activeWidth} ${activeHeight}
//           border-4 border-amber-600
//           rounded-xl overflow-hidden shadow-lg shrink-0 relative cursor-pointer`}
//         >
//           <div></div>
//           <Image
//             src={activeCard.image}
//             alt={activeCard.label}
//             fill
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
//             <span className="text-white font-semibold text-center px-2">
//               {activeCard.label}
//             </span>
//           </div>
//         </motion.div>

//         <div className="flex-1 flex items-center gap-4 overflow-x-auto scrollbar-hide py-2 px-1 relative">
//           <button
//             onClick={rotateLeft}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
//           >
//             <SvgChevronLeft className="w-6 h-6 text-gray-700" />
//           </button>

//           <div className="flex gap-4 pl-12 md:pl-16">
//             {rightCards.map((item) => (
//               <motion.div
//                 key={item.key}
//                 layout
//                 onClick={() => {
//                   const index = carousel.findIndex((c) => c.key === item.key);
//                   const rotated = [
//                     ...carousel.slice(index),
//                     ...carousel.slice(0, index),
//                   ];
//                   setCarousel(rotated);
//                 }}
//                 className={`${itemWidth} ${itemHeight}border border-gray-200 p-2 shrink-0 rounded-xl overflow-hidden relative cursor-pointer hover:shadow-xl transition-shadow`}
//               >
//                 <div className="w-full h-45 p-2 relative rounded-md">
//                   <span className="text-sm font-medium bg-emerald-500/90 text-white backdrop-blur absolute z-50 px-2 rounded-tl-md rounded-br-md top-0 left-0">
//                     15% OFF
//                   </span>
//                   <Image
//                     src={item.image}
//                     alt={item.label}
//                     fill
//                     className="object-cover rounded-md"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-slate-500 text-[10pt] h-10">
//                     {item.label}
//                   </span>
//                   <div className="h-15 border">Desc</div>
//                   <div>
//                     <button className="bg-slate-700 w-full hover:bg-emerald-600 cursor-pointer px-2 py-1.5 rounded-sm">
//                       Pesan
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <button
//             onClick={rotateRight}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
//           >
//             <SvgChevronLeft className="w-6 h-6 text-gray-700 rotate-180" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SvgChevronLeft from "../Icon/Chevron";

export type CarouselItem = {
  key: string;
  [key: string]: any;
};

type CarouselProps<T> = {
  items: T[];
  renderActive: (item: T) => React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
};

export default function PremiumCarousel<T extends CarouselItem>({
  items,
  renderActive,
  renderItem,
}: CarouselProps<T>) {
  const [carousel, setCarousel] = useState(items);

  const rotateLeft = () => {
    setCarousel((prev) => [...prev.slice(1), prev[0]]);
  };

  const rotateRight = () => {
    setCarousel((prev) => [
      prev[prev.length - 1],
      ...prev.slice(0, prev.length - 1),
    ]);
  };

  const active = carousel[0];
  const rest = carousel.slice(1);

  return (
    <section className="w-[95%] md:w-[85%] xl:w-[85%] mx-auto relative py-24  overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative">
        <motion.div layout className="flex-shrink-0">
          {renderActive(active)}
        </motion.div>

        <div className="flex-1 flex items-center gap-4 overflow-x-auto scrollbar-hide py-2 px-1 relative">
          <button
            onClick={rotateLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
          >
            <SvgChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex gap-4 pl-12 md:pl-16">
            {rest.map((item) => (
              <motion.div
                key={item.key}
                layout
                onClick={() => {
                  const index = carousel.findIndex((c) => c.key === item.key);
                  const rotated = [
                    ...carousel.slice(index),
                    ...carousel.slice(0, index),
                  ];
                  setCarousel(rotated);
                }}
                className="cursor-pointer"
              >
                {renderItem(item)}
              </motion.div>
            ))}
          </div>

          <button
            onClick={rotateRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all"
          >
            <SvgChevronLeft className="w-6 h-6 text-gray-700 rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}
