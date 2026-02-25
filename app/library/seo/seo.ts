/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTranslations } from "next-intl/server";
import { createMetadata } from "./createMetadata";

type BaseSeoConfig = {
  namespace: string;
  path: string | ((params: any) => string);
  titleKey?: string;
  descriptionKey?: string;
  noIndex?: boolean;
};

export function createSeoFactory({
  namespace,
  path,
  titleKey = "metaTitle",
  descriptionKey = "metaDescription",
  noIndex = false,
}: BaseSeoConfig) {
  return async ({ params }: { params: Promise<Record<string, any>> }) => {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;

    const t = await getTranslations({
      locale,
      namespace,
    });

    const finalPath = typeof path === "function" ? path(resolvedParams) : path;

    return createMetadata({
      title: t(titleKey),
      description: t(descriptionKey),
      path: finalPath,
      locale,
      noIndex,
    });
  };
}
