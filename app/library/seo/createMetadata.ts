import { Metadata } from "next";

const SITE_URL = "https://rssehat.id";
const SITE_NAME = "RS Sehat";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: MetaInput): Metadata {
  const url = SITE_URL + path;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },

    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image || `${SITE_URL}/og-default.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || `${SITE_URL}/og-default.jpg`],
    },
  };
}
