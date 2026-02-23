"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const gallery = [
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746757/samples/landscapes/nature-mountains.jpg",
    title: "Mountain Escape",
    location: "Iran",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746755/samples/landscapes/beach-boat.jpg",
    title: "Ocean Dreams",
    location: "Maldives",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746752/samples/landscapes/girl-urban-view.jpg",
    title: "Urban Silence",
    location: "Tokyo",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746754/samples/landscapes/architecture-signs.jpg",
    title: "City Lights",
    location: "New York",
  },
  {
    src: "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746758/samples/landscapes/landscape-panorama.jpg",
    title: "Endless Horizon",
    location: "Norway",
  },
];

export default function CinematicGalleryFixed() {
  const ref = useRef(null);
  const total = gallery.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(total - 1) * 100}vw`],
  );
  const xSpring = useSpring(xTransform, { stiffness: 60, damping: 35 });

  // Fix slide pertama opacity langsung muncul
  const opacities = gallery.map((_, i) =>
    useTransform(
      scrollYProgress,
      i === 0 ? [0, 0.3] : [i * 0.15, i * 0.15 + 0.3],
      [i === 0 ? 1 : 0, 1],
    ),
  );

  return (
    <section ref={ref} className="relative h-[500vh] bg-black text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x: xSpring }} className="flex h-full">
          {gallery.map((item, i) => (
            <div
              key={i}
              className="relative h-full w-screen shrink-0 snap-center"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80" />
              <motion.div
                style={{ opacity: opacities[i] }}
                className="absolute bottom-16 left-16"
              >
                <p className="mb-2 text-xs uppercase tracking-widest opacity-70">
                  {item.location}
                </p>
                <h3 className="text-4xl font-bold">{item.title}</h3>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm opacity-50 animate-bounce">
        Scroll for more →
      </motion.div>
    </section>
  );
}
