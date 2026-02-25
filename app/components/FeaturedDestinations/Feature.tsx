// "use client";

import { motion } from "framer-motion";
import Carousel, { CarouselItem } from "../CardCarousel/CardCarousel";
import Image from "next/image";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import SvgChevronLeft from "../Icon/Chevron";
// import Image from "next/image";

//
// export default function FacilitiesPremiumFull() {
//   const [carousel, setCarousel] = useState(items);

//   const rotateLeft = () => {
//     // Ambil first element, push ke akhir
//     setCarousel((prev) => [...prev.slice(1), prev[0]]);
//   };

//   const rotateRight = () => {
//     // Ambil last element, unshift ke depan
//     setCarousel((prev) => [
//       prev[prev.length - 1],
//       ...prev.slice(0, prev.length - 1),
//     ]);
//   };

//   const activeCard = carousel[0];
//   const rightCards = carousel.slice(1);

//   return (
//     <div className="w-[90%] md:w-[85%] xl:w-[85%] mx-auto">
//       <div className="flex items-center gap-6 relative">
//         {/* Arrow Left */}

//         {/* Active Card */}
//         <motion.div
//           key={activeCard.key}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ type: "spring", stiffness: 120 }}
//           className="w-80 h-100 rounded-xl overflow-hidden shadow-lg flex-shrink-0 relative cursor-pointer"
//         >
//           <Image
//             src={activeCard.image}
//             alt={activeCard.label}
//             fill
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
//             <span className="text-white font-semibold text-center px-2">
//               {activeCard.label}
//             </span>
//           </div>
//         </motion.div>
//         <div className="flex item bg-red-500 relative">
//           <button
//             onClick={rotateLeft}
//             className="absolute -right-12 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow"
//           >
//             <SvgChevronLeft className="w-6 h-6 text-gray-700" />
//           </button>
//         </div>
//         {/* Right Cards */}
//         <div className="flex-1 flex items-center gap-4 overflow-x-auto scrollbar-hide py-2 px-1 relative">
//           {rightCards.map((item) => (
//             <motion.div
//               key={item.key}
//               layout
//               whileHover={{ scale: 1.05 }}
//               onClick={() => {
//                 // Klik card di kanan → put it to left
//                 const index = carousel.findIndex((c) => c.key === item.key);
//                 const rotated = [
//                   ...carousel.slice(index),
//                   ...carousel.slice(0, index),
//                 ];
//                 setCarousel(rotated);
//               }}
//               className="w-50 h-70 shrink-0 rounded-xl overflow-hidden relative cursor-pointer shadow-md"
//             >
//               <Image
//                 src={item.image}
//                 alt={item.label}
//                 fill
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                 <span className="text-white text-sm font-medium text-center px-2">
//                   {item.label}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <div className="relative">
//           <button
//             onClick={rotateRight}
//             className="absolute right-0 top-0 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow"
//           >
//             <SvgChevronLeft className="w-6 h-6 text-gray-700 rotate-180" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

const facilities: CarouselItem[] = [
  {
    key: "icu",
    label: "MEDICAL CHECK UP STANDARD 2026",
    image:
      "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746754/samples/landscapes/architecture-signs.jpg",
  },
  {
    key: "nicu",
    label: "VAKSIN DEWASA DENGUE - SATUAN 2026",
    image:
      "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746758/samples/landscapes/landscape-panorama.jpg",
  },
  {
    key: "cathlab",
    label: "ADVANCED PREMARITAL SCREENING (FEMALE)",
    image:
      "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746755/samples/people/bicycle.jpg",
  },
  {
    key: "mri",
    label: "MCU RAMADAN FIT ",
    image:
      "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746757/samples/landscapes/nature-mountains.jpg",
  },
];

export default function FacilitiesSection() {
  return <div>lala</div>;
}
