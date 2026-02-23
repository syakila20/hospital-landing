"use client";
import { blogsDummy } from "@/app/dummyData";
import Image from "next/image";
import Link from "next/link";
import FilterBlogPill from "./lib/FilterBlog";
import BlogCard from "@/app/components/CardBlog/BlogCard";
import Pagination from "@/app/components/Pagination/Pagination";
import { formatDate } from "@/app/library/helperDate";
import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";

export default function DetailBeritaPage() {
  const mostRead = blogsDummy[0];

  return (
    <section className="bg-linear-to-br from-fuchsia-50 to-teal-50 relative overflow-hidden py-4">
      <div className=" w-[90%] md:w-[85%] xl:w-[85%] mx-auto mt-40 ">
        <section className="grid lg:grid-cols-2 gap-10 items-center mb-2 mt-10">
          {/* Left Text */}
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-gray-900">
              Our Blogs Healthy,
              <span className="text-emerald-600">Happier Life</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Discover expert health insight, wellness advice, and medical
              update to help you make informed decisions and live a healthier
              life every day
            </p>
          </div>

          {/* Right Featured */}
          <div className="relative">
            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-2 py-2 rounded-full shadow-md">
              🔥 Most Read
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-2 rounded-2xl">
                <Image
                  src={mostRead.image}
                  alt={mostRead.title}
                  width={800}
                  height={500}
                  className="w-full h-72 rounded-2xl object-cover"
                />
              </div>
              <div className="px-4 flex items-center gap-1 text-xs text-gray-400 w-full pt-4">
                <div className="rounded-2xl text-xs flex items-center text-blue-600/90">
                  Kesling RS
                </div>
                <span>•</span>
                <span>{formatDate(mostRead?.date)}</span>
              </div>
              <div className="px-4 py-2">
                <h3 className="font-semibold text-xl mb-2 text-zinc-700">
                  {mostRead.title}
                </h3>
                <p className="text-zinc-500 text-sm line-clamp-2">
                  {mostRead.excerpt}
                </p>
                <Link
                  href={`/blog/${mostRead.slug}`}
                  className="text-emerald-600 text-sm font-medium mt-4 inline-block"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="list-blog">
          <div className="flex items-center justify-between my-8">
            <h2 className="text-2xl font-bold text-gray-900">List Article</h2>
            <div className="h-[1px] flex-1 bg-linear-to-r from-blue-500 to-transparent ml-6"></div>
          </div>

          <FilterBlogPill />
          <div className="my-2 flex justify-end">
            <Pagination
              next={() => {}}
              prev={() => {}}
              hasNextPage={true}
              hasPreviousPage={false}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute top-50 -right-37.5 w-125 h-125 bg-pink-300 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000"
          />
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
                  date={x?.date}
                />
              );
            })}
          </div>
          <div className="my-2 flex justify-end">
            <Pagination
              next={() => {}}
              prev={() => {}}
              hasNextPage={true}
              hasPreviousPage={false}
            />
          </div>
        </section>
      </div>
    </section>
  );
}
