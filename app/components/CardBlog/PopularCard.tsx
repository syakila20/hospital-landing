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
  href = "#",
}: PopularCardProps) {
  return (
    <Link
      href={href}
      className="flex items-start gap-2 border-gray-200 hover:shadow-sm transition w-100"
    >
      <div className="shrink-0 w-20 h-20 overflow-hidden rounded-lg border relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-neutral-900 line-clamp-2">
          {title}
        </h4>
        <p className="text-xs text-neutral-600 mt-1 line-clamp-3">
          {description}
        </p>
      </div>
    </Link>
  );
}
