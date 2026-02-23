"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const clients = [
  { name: "Client 1", logo: "/monitor.png" },
  { name: "Client 2", logo: "/monitor.png" },
  { name: "Client 3", logo: "/monitor.png" },
  { name: "Client 4", logo: "/monitor.png" },
  { name: "Client 5", logo: "/monitor.png" },
  { name: "Client 6", logo: "/monitor.png" },
];
const duplicatedClients = [...clients, ...clients];

export default function OurClients() {
  const [isHoveredTop, setIsHoveredTop] = useState(false);
  const [isHoveredBottom, setIsHoveredBottom] = useState(false);

  const mid = Math.ceil(clients.length / 2);
  const topRow = clients.slice(0, mid);
  const bottomRow = clients.slice(mid);

  const duplicatedTop = [...topRow, ...topRow];
  const duplicatedBottom = [...bottomRow, ...bottomRow];

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Our Trusted Partners
        </h2>
        <p className="mt-3 text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
          We collaborate with leading insurance providers, corporate partners,
          and healthcare institutions to ensure accessible, high-quality, and
          reliable medical services for every patient we serve.
        </p>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Top Row */}
      <div
        className="mt-12 relative w-full overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHoveredTop(true)}
        onMouseLeave={() => setIsHoveredTop(false)}
      >
        <motion.div
          className="flex gap-4 sm:gap-8"
          animate={isHoveredTop ? { x: ["0%", "-50%"] } : { x: 0 }}
          transition={
            isHoveredTop
              ? { repeat: Infinity, duration: 30, ease: "linear" }
              : { duration: 0 }
          }
        >
          {duplicatedTop.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[80px] sm:min-w-[150px]"
            >
              <div className="group px-4 sm:px-6 py-3 sm:py-4 bg-white/70 backdrop-blur-md rounded-2xl transition-transform duration-300 hover:scale-105">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-10 sm:h-16 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div
        className="mt-6 relative w-full overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHoveredBottom(true)}
        onMouseLeave={() => setIsHoveredBottom(false)}
      >
        <motion.div
          className="flex gap-4 sm:gap-8"
          animate={isHoveredBottom ? { x: ["-50%", "0%"] } : { x: 0 }}
          transition={
            isHoveredBottom
              ? { repeat: Infinity, duration: 30, ease: "linear" }
              : { duration: 0 }
          }
        >
          {duplicatedBottom.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[80px] sm:min-w-[150px]"
            >
              <div className="group px-4 sm:px-6 py-3 sm:py-4 bg-white/70 backdrop-blur-md rounded-2xl transition-transform duration-300 hover:scale-105">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-10 sm:h-16 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
