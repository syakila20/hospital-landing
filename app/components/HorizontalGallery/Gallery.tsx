"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    title: "Cardiology Center",
    subtitle: "Comprehensive Heart Care",
  },
  {
    src: "https://images.unsplash.com/photo-1580281657527-47b15c46c1f9",
    title: "Emergency Services",
    subtitle: "24/7 Critical Care",
  },
  {
    src: "https://images.unsplash.com/photo-1584516150909-c43483ee7935",
    title: "Maternity & Women’s Health",
    subtitle: "Safe & Compassionate Care",
  },
  {
    src: "https://images.unsplash.com/photo-1576765607924-b1d3f98b49d3",
    title: "Advanced Diagnostics",
    subtitle: "Modern Medical Technology",
  },
  {
    src: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b",
    title: "Pediatric Care",
    subtitle: "Specialized Child Healthcare",
  },
];

export default function HospitalServicesSection() {
  const ref = useRef(null);
  const total = services.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(total - 1) * 100}vw`],
  );

  const xSpring = useSpring(xTransform, {
    stiffness: 60,
    damping: 35,
  });

  return (
    <section ref={ref} className="relative h-[500vh] bg-white text-gray-900">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x: xSpring }} className="flex h-full">
          {services.map((item, i) => (
            <div key={i} className="relative h-full w-screen shrink-0">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/60" />

              <div className="absolute bottom-20 left-20 text-white">
                <p className="mb-3 text-sm uppercase tracking-widest opacity-80">
                  Our Services
                </p>
                <h3 className="text-5xl font-bold">{item.title}</h3>
                <p className="mt-3 text-lg opacity-90">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm opacity-60 animate-bounce">
        Scroll to explore →
      </div>
    </section>
  );
}
