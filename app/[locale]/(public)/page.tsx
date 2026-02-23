"use client";

import Doctor from "../../components/Section/Doctor/Doctor";
import HeroSection from "../../components/Section/Hero/Hero";
import News from "../../components/Section/News/News";
import OurClients from "../../components/Section/OurClient/OurClient";
import OurClientsStop from "../../components/Section/OurClient/OurClientStop";
import Service from "../../components/Section/Service/Service";

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

        <Service />
        <Doctor />

        <News />

        {/* <div
          aria-hidden="true"
          className="absolute bottom-10 left-37.5 w-125 h-125 bg-pink-300 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000 "
        ></div> */}
        <OurClientsStop />
      </div>
      {/* <FeaturedDestinations />
      <HorizontalGallery />
      <CTASection />
      */}
    </div>
  );
}
