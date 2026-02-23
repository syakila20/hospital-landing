"use client";

import SectionTitle from "../../Title/Title";
import BlogCard from "../../CardBlog/BlogCard";
import { blogsDummy } from "@/app/dummyData";
import { useTranslations } from "next-intl";

const News = () => {
  const t = useTranslations("blog");

  return (
    <section className="relative overflow-hidden w-[95%] md:w-[85%] xl:w-[85%] mx-auto py-4">
      <div className="flex justify-between md:flex-row lg:flex-row flex-col">
        <div className="h-25">
          <SectionTitle title={t("title")} linkTo={"/blog"} />
        </div>
        <span className="w-112.5 text-gray-400 content-center mt-10 lg:mt-0 md:mt-0">
          {t("description")}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        {blogsDummy?.map((x, idx) => {
          return (
            <BlogCard
              key={idx}
              slug={x?.slug}
              title={x?.title}
              excerpt={x?.excerpt}
              image={x?.image}
              category={x?.category}
              date={new Date(x?.date)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default News;
