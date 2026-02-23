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

export default function LanguageSwitcherLinks() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2">
      <Link href={pathname} locale="en">
        🇺🇸 English
      </Link>
      <Link href={pathname} locale="id">
        🇮🇩 Indonesia
      </Link>
    </div>
  );
}
