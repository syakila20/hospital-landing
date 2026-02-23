import ListDoctors from "@/app/[locale]/(public)/doctor/components/ListDoctor";
import SectionTitle from "../../Title/Title";
import { useMediaQuery } from "@/app/library/useMediaQuery";
import { useTranslations } from "next-intl";
const Doctor = () => {
  const t = useTranslations("");

  const { isDesktop, isTablet } = useMediaQuery();

  return (
    <div className="relative w-full overflow-visible">
      <div
        aria-hidden="true"
        className="absolute -top-8 -right-8 w-80 h-80 bg-pink-300 rounded-full mix-blend-screen blob"
      />
      <section className="relative z-10">
        <section className="w-[95%] md:w-[85%] xl:w-[85%] mx-auto relative z-10">
          <div className="flex justify-between md:flex-row lg:flex-row flex-col ">
            <SectionTitle title={t("doctor.title")} linkTo="/doctor" />
            <span className=" w-112.5 text-gray-400 content-center mt-10 lg:mt-0 md:mt-0">
              {t("doctor.description")}
            </span>
          </div>
          <ListDoctors />
        </section>
      </section>
      <div
        aria-hidden="true"
        className="absolute top-50 -right-37.5 w-125 h-125 bg-pink-300 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000"
      />
    </div>
  );
};

export default Doctor;
