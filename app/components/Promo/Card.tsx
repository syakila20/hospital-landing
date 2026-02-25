"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type HealthPackage = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
};

export default function HealthPackageCard({ data }: { data: HealthPackage }) {
  const hasDiscount = !!data.originalPrice;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 180 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold text-red-600 shadow">
            {data.discountLabel}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-gray-800">{data.title}</h3>

        <p className="text-sm text-gray-500 line-clamp-2">{data.description}</p>

        <div className="mt-3">
          <p className="text-sm text-gray-400">Mulai dari</p>

          {hasDiscount && (
            <p className="text-sm line-through text-gray-400">
              {formatPrice(data.originalPrice!)}
            </p>
          )}

          <p className="text-2xl font-bold text-teal-600">
            {formatPrice(data.price)}
          </p>
        </div>

        <button className="mt-4 bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 rounded-xl transition">
          Pesan Sekarang
        </button>
      </div>
    </motion.div>
  );
}
