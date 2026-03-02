import DoctorCard from "@/app/components/CardDoctor/CardDoctor";
import SectionTitle from "@/app/components/Title/Title";
import { Doctor } from "@/app/dummyData";
import { useTranslations } from "next-intl";
import React from "react";

interface IListDokterRelated {
  doctor: Doctor[];
  category: string;
}

const ListDokterRelated: React.FC<IListDokterRelated> = (props) => {
  const t = useTranslations("");

  return (
    <div className="flex-col">
      <SectionTitle
        title={t("doctor.detail.otherDoctors", { specialist: props?.category })}
      />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 mt-6">
        {props?.doctor?.map((doctor, idx) => (
          <DoctorCard
            key={idx}
            name={doctor.name}
            specialty={doctor.specialty}
            experience={doctor.experience}
            location={doctor.location}
            isOnline={doctor.isOnline}
            reviews={doctor.reviews}
            rating={doctor.rating}
            image="/doctor.webp"
            slug={doctor.name}
            spesialitySlug={doctor?.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default ListDokterRelated;
