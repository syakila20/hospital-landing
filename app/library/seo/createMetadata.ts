import { Metadata } from "next";
import { SITE_NAME, SITE_URL, DEFAULT_OG, SUPPORTED_LOCALES } from "./types";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path,
  locale,
  image,
  noIndex,
}: MetaInput): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}/${locale}${cleanPath}`;

  const languageAlternates = SUPPORTED_LOCALES.reduce(
    (acc, lang) => {
      acc[lang] = `${SITE_URL}/${lang}${cleanPath}`;
      return acc;
    },
    {} as Record<string, string>,
  );

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },

    description,

    alternates: {
      canonical: url,
      languages: languageAlternates,
    },

    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },

    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale,
      type: "website",
      images: [
        {
          url: image || `${SITE_URL}${DEFAULT_OG}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || `${SITE_URL}${DEFAULT_OG}`],
    },
  };
}
