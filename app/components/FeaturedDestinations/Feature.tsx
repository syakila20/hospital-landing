"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const destinations = [
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746757/samples/landscapes/nature-mountains.jpg",
    title: "Azadi Tower",
    location: "Tehran, Iran",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746754/samples/landscapes/architecture-signs.jpg",
    title: "Broadway",
    location: "New York, USA",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746758/samples/landscapes/landscape-panorama.jpg",
    title: "Panorama",
    location: "Norway",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="relative bg-black px-12 py-28 text-white">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 max-w-xl"
      >
        <p className="mb-3 text-sm uppercase tracking-widest opacity-60">
          Featured
        </p>
        <h2 className="text-4xl font-bold leading-tight">
          Discover Iconic Destinations
        </h2>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {destinations.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative h-[420px] overflow-hidden"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-sm opacity-70">{item.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
