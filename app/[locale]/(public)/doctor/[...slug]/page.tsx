import { Doctor, doctorsDummy } from "@/app/dummyData";
import { notFound } from "next/navigation";
import { toSlug } from "@/app/library/toSlug";
import DoctorDetail from "./Detail";
import DoctorCard from "@/app/components/CardDoctor/CardDoctor";
import SectionTitle from "@/app/components/Title/Title";

interface Props {
  params: { slug: string[] };
}

async function getDoctor(slug: string) {
  const doctor = doctorsDummy.find((b) => toSlug(b.name) === slug);
  return doctor || null;
}

function getRelatedDoctors(category: string, doctorSlug: string) {
  return doctorsDummy.filter(
    (d) => d.specialty === category && toSlug(d.name) !== doctorSlug,
  );
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  let category: string | null = null;
  let doctorSlug: string;

  if (slug.length >= 1) {
    category = slug[0];
    doctorSlug = slug[1];
  } else {
    return notFound(); // lebih dari 2 segmen → invalid
  }

  const doctor = await getDoctor(doctorSlug);
  if (!doctor) return notFound();
  const relatedDoctors = category
    ? getRelatedDoctors(category, doctorSlug)
    : [];
  return (
    <section className="w-[94%] md:w-[85%] xl:w-[85%] mx-auto pt-40 bg-linear-to-br from-fuchsia-50 to-teal-50 relative py-4 h-auto">
      <DoctorDetail doctor={doctor as Doctor} />
      <div className="flex-col">
        <SectionTitle title={`Other ${category} Doctors`} />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 mt-6">
          {relatedDoctors?.map((doctor, idx) => (
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Page;
