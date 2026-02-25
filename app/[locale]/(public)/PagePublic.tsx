"use client";

import FeaturedDestinations from "@/app/components/FeaturedDestinations/Feature";
import Doctor from "../../components/Section/Doctor/Doctor";
import HeroSection from "../../components/Section/Hero/Hero";
import News from "../../components/Section/News/News";
import OurClients from "../../components/Section/OurClient/OurClient";
import OurClientsStop from "../../components/Section/OurClient/OurClientStop";
import Service from "../../components/Section/Service/Service";
import CinematicGalleryFixed from "@/app/components/HorizontalGallery/Gallery";
import TrustIndicator from "@/app/components/TrustIndicator/Trustindicator";
import FacilitiesPremium from "@/app/components/FeaturedDestinations/Feature";
import Promotion from "@/app/components/Section/Promo/Promo";

export default function PagePublic() {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="
      absolute -top-10 -right-10
      w-72 h-72
      bg-pink-300
      rounded-full
      filter blur-3xl
      opacity-20
      mix-blend-multiply
      animate-blob
      blob
    "
      />

      <div
        aria-hidden="true"
        className="
      absolute -bottom-10 -left-10
      w-72 h-72
      bg-teal-300
      rounded-full
      filter blur-3xl
      opacity-20
      mix-blend-multiply
      animate-blob
      animation-delay-2000
      blob
    "
      />
      <HeroSection />
      <div className="bg-linear-to-br from-fuchsia-50 to-teal-50 overflow-hidden h-auto relative">
        {/* <div
          aria-hidden="true"
          className="absolute top-50 -right-100.5 w-125 h-125 bg-pink-300 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000 "
        ></div> */}
        <TrustIndicator />
        <Service />
        <Doctor />
        <News />
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
        {/* <Promotion />
        <FacilitiesPremium /> */}
        {/*  */}
        {/* <div
          aria-hidden="true"
          className="absolute bottom-10 left-37.5 w-125 h-125 bg-pink-300 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000 "
          ></div> */}
        <OurClientsStop />
      </div>
      {/* <CinematicGalleryFixed /> */}
      {/* 
      
      <CTASection />
      />
      */}
    </div>
  );
}
