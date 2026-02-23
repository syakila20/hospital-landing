"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative bg-white/100 px-12 py-32 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 text-sm uppercase tracking-widest opacity-60">
          Start Your Journey
        </p>

        <h2 className="mb-6 text-5xl font-bold leading-tight">
          Ready to Explore the World With Us?
        </h2>

        <p className="mb-10 text-gray-300">
          Discover unforgettable places, stories, and experiences curated for
          explorers who seek more than destinations.
        </p>

        <button className="group inline-flex items-center gap-3 border border-white px-8 py-4 text-sm uppercase tracking-wide transition hover:bg-white hover:text-black">
          Get Started
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </motion.div>
    </section>
  );
}
