// "use client";

// import { useLocale } from "next-intl";
// import { usePathname } from "next/navigation";
// import { useTransition } from "react";
// import { useRouter } from "@/i18n/navigation";

// const locales = [
//   { code: "id", label: "Indonesia 🇮🇩" },
//   { code: "en", label: "English 🇺🇸" },
// ];

// export default function LanguageSwitcher() {
//   const locale = useLocale();
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   console.log("??local", locale);
//   function onSelectChange(e: string) {
//     const nextLocale = e;

//     startTransition(() => {
//       router.replace("/", { locale: nextLocale });
//     });
//   }

//   return (
//     <div className="relative inline-flex items-center">
//       <button onClick={() => onSelectChange("id")}>ID</button>
//       <button onClick={() => onSelectChange("en")}>En</button>
//     </div>
//   );
// }
import { Link, usePathname } from "@/i18n/navigation";
import SortDropdown from "../Sort/Sort";
import SvgWorld from "../Icon/World";

export default function LanguageSwitcherLinks() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2">
      <SortDropdown icon={<SvgWorld />}>
        <div className="flex flex-col gap-2 px-2 w-15 text-center justify-center py-2 text-slate-700 text-sm">
          <Link href={pathname} locale="en" className="hover:text-slate-700">
            🇺🇸 Eng
          </Link>
          <Link href={pathname} locale="id" className="hover:text-slate-700">
            🇮🇩 Ind
          </Link>
        </div>
      </SortDropdown>
    </div>
  );
}
