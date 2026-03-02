import { Doctor, doctorsDummy, dummySpecialties } from "@/app/dummyData";
import { notFound } from "next/navigation";
import { toSlug } from "@/app/library/toSlug";
import DoctorDetail from "./Detail";
import DoctorCard from "@/app/components/CardDoctor/CardDoctor";
import SectionTitle from "@/app/components/Title/Title";
import { useTranslations } from "next-intl";
import ListDokterRelated from "./ListDokterRelated";

interface Props {
  params: { slug: string[] };
}

async function getDoctor(slug: string) {
  const doctor = doctorsDummy.find((b) => toSlug(b.name) === slug);
  return doctor || null;
}

export function getRelatedDoctors(categorySlug: string, doctorSlug: string) {
  return doctorsDummy.filter((d) => {
    const spec = dummySpecialties.find((s) => s.id === Number(d.specialtyId));
    return spec?.slug === categorySlug && toSlug(d.name) !== doctorSlug;
  });
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  let category: string | null = null;
  let doctorSlug: string;

  if (slug.length >= 1) {
    category = slug[0];
    doctorSlug = slug[1];
  } else {
    return notFound();
  }

  const doctor = await getDoctor(doctorSlug);
  if (!doctor) return notFound();
  const relatedDoctors = category
    ? getRelatedDoctors(category, doctorSlug)
    : [];
  console.log("??doctor", relatedDoctors);
  return (
    <section className="w-[94%] md:w-[85%] xl:w-[85%] mx-auto pt-40 bg-linear-to-br from-fuchsia-50 to-teal-50 relative py-4 h-auto">
      <DoctorDetail doctor={doctor as Doctor} />
      <ListDokterRelated category={category} doctor={relatedDoctors as []} />
    </section>
  );
};
export default Page;
