"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  labelMap?: Record<string, string>;
  className?: string;
}

export default function Breadcrumb({
  labelMap = {},
  className = "",
}: BreadcrumbProps) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    const label =
      labelMap[segment] ||
      segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    return { href, label };
  });

  return (
    <nav className={`flex items-center gap-2 text-base ${className}`}>
      <Link href="/" className="text-slate-500 hover:text-emerald-700">
        Home
      </Link>

      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2 text-base">
          <span className="text-gray-400">/</span>

          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-slate-700">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="text-slate-700 hover:text-emerald-500"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
