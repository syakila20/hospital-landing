import { createSeoFactory } from "@/app/library/seo/seo";
import PagePublic from "./PagePublic";

export const generateMetadata = createSeoFactory({
  namespace: "brand",
  path: "/",
  titleKey: "hospitalName",
  descriptionKey: "tagline",
});

export default function HomeWrapper() {
  return <PagePublic />;
}
