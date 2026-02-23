import PopularCard from "../CardBlog/PopularCard";

export default function PopularPosts() {
  const popularPosts = [
    {
      image:
        "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746755/samples/people/bicycle.jpg",
      title: "Optimasi SEO di Next.js: Tips Terbaik 2026",
      description:
        "Pelajari cara meningkatkan ranking blog Next.js dengan teknik SEO modern.",
    },
    {
      image:
        "https://res.cloudinary.com/dzabbmtwf/image/upload/v1769746755/samples/people/bicycle.jpg",
      title: "Tailwind Typography untuk Artikel Lebih Elegan",
      description:
        "Gunakan plugin prose Tailwind untuk membuat konten blog lebih nyaman dibaca.",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase text-neutral-900 mb-2">
        🔥 Terpopuler
      </h3>

      {popularPosts.map((post, idx) => (
        <PopularCard
          key={idx}
          image={post.image}
          title={post.title}
          description={post.description}
        />
      ))}
    </div>
  );
}
