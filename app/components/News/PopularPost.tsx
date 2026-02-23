import { blogsDummy } from "@/app/dummyData";
import PopularCard from "../CardBlog/PopularCard";

export default function PopularPosts() {
  const popular = blogsDummy?.slice(0, 2);
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase text-neutral-900 mb-2">
        🔥 Terpopuler
      </h3>

      {popular.map((post, idx) => (
        <PopularCard
          key={idx}
          image={post.image}
          href={`/blog/${post?.slug}`}
          title={post.title}
          description={post.excerpt}
        />
      ))}
    </div>
  );
}
