import Breadcrumb from "@/app/components/Breadcrumb/Breadcrumb";
import BlogDetail from "@/app/components/News/BlogDetail";
import PopularPosts from "@/app/components/News/PopularPost";
import TableOfContents from "@/app/components/News/TableOfContent";
import { blogsDummy } from "@/app/dummyData";
import { extractToc, injectHeadingIds } from "@/app/library/extractToc";
import { getReadingTimeFromHtml } from "@/app/library/getReadingTime";
import { formatDate } from "@/app/library/helperDate";
import { sanitizeHtml, wrapImages } from "@/app/library/sanitizeHtml";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

async function getBlog(slug: string) {
  const blog = blogsDummy.find((b) => b.slug === slug);
  return blog || null;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  const blog = await getBlog(slug);
  if (!blog) return notFound();
  const withIds = injectHeadingIds(blog?.rawContent);
  const safeHtml = sanitizeHtml(withIds);
  const finalHtml = wrapImages(safeHtml);
  const toc = extractToc(withIds);
  const readingTime = getReadingTimeFromHtml(blog?.rawContent);

  return (
    <main className="bg-linear-to-br from-fuchsia-50 to-teal-50 min-h-screen pt-20 overflow-hidden lg:overflow-visible md:overflow-visible">
      <div className="mx-auto max-w-7xl px-4 py-20">
        {/* Flex wrapper agar sticky sidebar tidak “hilang” */}
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="lg:flex-1">
            <BlogDetail
              title={blog?.title}
              image={blog?.image}
              date={formatDate(blog?.date, "text")}
              readingTime={readingTime}
              content={finalHtml}
              category={blog?.category}
            />
          </article>

          <aside className="lg:w-110 lg:pl-6 pt-1 lg:pt-32 md:pt-32">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <PopularPosts />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
export default Page;
