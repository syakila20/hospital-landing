"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../../Title/Title";
import { useTranslations } from "next-intl";

const clients = [
  {
    name: "Client 1",
    logo: "/logo2.png",
  },
  {
    name: "Client 2",
    logo: "/bumn.png",
  },
  { name: "Client 5", logo: "/logo-liq.png" },
  {
    name: "Client 3",
    logo: "/bumn.png",
  },
  { name: "Client 4", logo: "/kasrs.webp" },
];

export default function OurClientsStop() {
  const t = useTranslations("trustedPartners");

  return (
    <section className="relative overflow-hidden w-[90%] md:w-[85%] xl:w-[85%] mx-auto py-4">
      <div className="flex justify-between md:flex-row lg:flex-row flex-col">
        <div className="h-25">
          <SectionTitle title={t("title")} />
        </div>
        <span className="w-115.5 text-gray-400 content-end">
          {t("description")}
        </span>
      </div>

      {/* Top Row */}
      {/* <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-8 w-[70%] m-auto"> */}
      <div className="flex justify-center flex-wrap gap-10 py-10">
        {clients.map((client, index) => (
          <div
            key={index}
            className="group px-4 h-30 border border-gray-400/40 w-30 backdrop-blur-md rounded-2xl transition-transform duration-300 hover:scale-105"
          >
            <Image
              key={index}
              src={client.logo}
              alt={client.name}
              fill
              className="group object-contain grayscale opacity-70 hover:grayscale-0 group-hover:opacity-100 transition duration-300 "
            />
          </div>
        ))}
      </div>

      {/* Bottom Row */}
    </section>
  );
}
