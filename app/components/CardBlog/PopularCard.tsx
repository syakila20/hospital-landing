import Image from "next/image";
import Link from "next/link";

interface PopularCardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
}

export default function PopularCard({
  image,
  title,
  description,
  href,
}: PopularCardProps) {
  return (
    <div className="flex items-start gap-2 border-gray-200 hover:shadow-sm transition w-full">
      <div className="shrink-0 w-20 h-20 overflow-hidden rounded-lg border relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <Link
          href={href as string}
          className="text-sm font-semibold text-neutral-900 line-clamp-2 cursor-pointer"
        >
          {title}
        </Link>
        <p className="text-xs text-neutral-600 mt-1 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
