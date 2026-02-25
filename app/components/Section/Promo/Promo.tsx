import { useTranslations } from "next-intl";
import HealthPackageCard from "../../Promo/Card";
import SectionTitle from "../../Title/Title";

const Promotion = () => {
  const t = useTranslations("");
  const packages = [
    {
      id: "ramadan-fit",
      titleKey: "promo.packages.ramadanFit.title",
      descriptionKey: "promo.packages.ramadanFit.desc",
      image:
        "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746757/samples/landscapes/nature-mountains.jpg",
      price: 425000,
      originalPrice: 550000,
      discountLabel: "Ramadan Special",
    },
  ];
  return (
    <div className="relative w-full overflow-visible">
      {/* <div
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((item) => (
              <HealthPackageCard
                key={item.id}
                data={{
                  id: item.id,
                  title: t(item.titleKey),
                  description: t(item.descriptionKey),
                  image: item.image,
                  price: item.price,
                  originalPrice: item.originalPrice,
                  discountLabel: item.discountLabel,
                }}
              />
            ))}
          </div>
        </section>
      </section>
      <div
        aria-hidden="true"
        className="absolute top-50 -right-37.5 w-125 h-125 bg-pink-300 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000"
      /> */}
    </div>
  );
};

export default Promotion;
