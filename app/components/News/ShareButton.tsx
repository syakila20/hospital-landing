"use client";

import { usePathname } from "next/navigation";

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname();
  const url =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  return (
    <div className="flex gap-2 text-xs">
      <span className="text-slate-500">Bagikan:</span>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
        className="px-3 py-1 rounded-full bg-green-100 text-green-700"
      >
        WhatsApp
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title,
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        className="px-3 py-1 rounded-full bg-sky-100 text-sky-700"
      >
        X
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url,
        )}`}
        target="_blank"
        className="px-3 py-1 rounded-full bg-blue-100 text-blue-700"
      >
        Facebook
      </a>
    </div>
  );
}
