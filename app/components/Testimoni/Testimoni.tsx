"use client";

const testimonials = [
  {
    id: 1,
    quote:
      "The personalized itinerary saved us so much time planning. Best family trip ever!",
    name: "Sarah",
    meta: "Joined 2024",
    image:
      "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746753/samples/people/boy-snow-hoodie.jpg",
  },
  {
    id: 2,
    quote: "Everything was perfectly organized. We just enjoyed the trip.",
    name: "Emily",
    meta: "Joined 2023",
    image:
      "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746752/samples/people/smiling-man.jpg",
  },
  {
    id: 3,
    quote: "Stress-free planning and amazing experiences!",
    name: "Jessica",
    meta: "Joined 2022",
    image:
      "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746753/samples/people/jazz.jpg",
  },
  {
    id: 4,
    quote: "Everything felt seamless from start to finish.",
    name: "Daniel",
    meta: "Joined 2021",
    image:
      "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746751/samples/people/kitchen-bar.jpg",
  },
];

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialSwiper() {
  // Stack menyimpan urutan index saat ini
  const [stack, setStack] = useState([0, 1, 2, 3]);

  // NEXT → geser kiri ke belakang
  const next = () => {
    setStack((prev) => {
      const newStack = [...prev];
      const first = newStack.shift(); // ambil depan
      newStack.push(first); // pindah ke belakang
      return newStack;
    });
  };

  // PREV → geser kanan ke depan
  const prev = () => {
    setStack((prev) => {
      const newStack = [...prev];
      const last = newStack.pop(); // ambil belakang
      newStack.unshift(last); // pindah ke depan
      return newStack;
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0B0F2F] p-10 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          <p className="text-2xl lg:text-3xl font-semibold leading-snug">
            “{testimonials[stack[0]].quote}”
          </p>

          <div className="mt-6">
            <span className="inline-block rounded-full bg-indigo-500 px-4 py-1 text-sm font-medium">
              {testimonials[stack[0]].name}
            </span>
            <p className="mt-2 text-sm text-white/60">
              {testimonials[stack[0]].meta}
            </p>

            {/* Controls */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                ←
              </button>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — STACK CARDS */}
        <div className="relative h-[360px] w-full">
          {stack.map((idx, order) => {
            const data = testimonials[idx];
            const isActive = order === 0; // kartu depan

            return (
              <motion.img
                key={data.id}
                src={data.image}
                alt={data.name}
                onClick={() => {
                  if (!isActive) {
                    // klik kartu belakang → pindah ke depan
                    const newStack = [...stack];
                    const clickedIndex = newStack.indexOf(idx);
                    newStack.splice(clickedIndex, 1);
                    newStack.unshift(idx);
                    setStack(newStack);
                  }
                }}
                className={`absolute bottom-6 h-[300px] w-[220px] rounded-2xl object-cover shadow-xl ${
                  !isActive ? "cursor-pointer" : ""
                }`}
                style={{
                  zIndex: 20 - order,
                  right: `${order * 18}px`,
                  transformOrigin: "bottom right",
                }}
                animate={{
                  opacity: isActive ? 1 : 0.8,
                  rotate: -order * 6,
                  x: -order * 18,
                  y: -order * 4,
                  scale: isActive ? 1 : 0.92,
                  filter: isActive ? "none" : "blur(1px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                }}
              />
            );
          })}

          {/* Decorative glow */}
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-indigo-500/40 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function CardCarousel() {
//   const [activeIndex, setActiveIndex] = useState(2); // kartu tengah aktif

//   const prev = () => {
//     setActiveIndex((prev) => Math.max(prev - 1, 0));
//   };

//   const next = () => {
//     setActiveIndex((prev) => Math.min(prev + 1, testimonials.length - 1));
//   };

//   // ambil 5 kartu untuk ditampilkan (2 kiri + tengah + 2 kanan)
//   const getVisible = () => {
//     const visible = [];
//     for (let offset = -2; offset <= 2; offset++) {
//       const idx = activeIndex + offset;
//       if (idx >= 0 && idx < testimonials.length)
//         visible.push({ ...testimonials[idx], offset });
//     }
//     return visible;
//   };

//   const visibleCards = getVisible();

//   return (
//     <div className="relative bg-[#0B0F2F] p-10 rounded-3xl text-white w-full flex flex-col items-center">
//       {/* Carousel */}
//       <div className="relative w-full max-w-[600px] h-[360px] flex items-center justify-center">
//         {visibleCards.map((card) => {
//           const { offset } = card;
//           const isActive = offset === 0;

//           return (
//             <motion.img
//               key={card.id}
//               src={card.image}
//               alt={card.name}
//               className="absolute w-[220px] h-[300px] rounded-2xl object-cover shadow-xl cursor-pointer"
//               animate={{
//                 x: offset * 60, // jarak horizontal
//                 y: Math.abs(offset) * -10, // sedikit naik untuk tumpukan
//                 scale: isActive ? 1 : 0.85, // aktif lebih besar
//                 rotate: offset * 5, // miring kiri/kanan
//                 filter: isActive ? "none" : "blur(1px)",
//                 zIndex: isActive ? 10 : 5 - Math.abs(offset),
//               }}
//               transition={{ type: "spring", stiffness: 200, damping: 25 }}
//               onClick={() => {
//                 if (!isActive) {
//                   setActiveIndex(activeIndex + offset);
//                 }
//               }}
//             />
//           );
//         })}
//       </div>

//       {/* Controls */}
//       <div className="mt-8 flex gap-4">
//         <button
//           onClick={prev}
//           className="px-4 py-2 bg-white/20 rounded hover:bg-white/40"
//         >
//           ← Prev
//         </button>
//         <button
//           onClick={next}
//           className="px-4 py-2 bg-white/20 rounded hover:bg-white/40"
//         >
//           Next →
//         </button>
//       </div>

//       {/* Nama kartu tengah */}
//       <div className="mt-4 text-center">
//         <p className="px-4 py-1 bg-indigo-500 rounded-full inline-block text-white font-medium">
//           {testimonials[activeIndex].name}
//         </p>
//       </div>
//     </div>
//   );
// }
