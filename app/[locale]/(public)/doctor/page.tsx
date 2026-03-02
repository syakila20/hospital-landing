import { createSeoFactory } from "@/app/library/seo/seo";
import DoctorPage from "./Doctor";

export const generateMetadata = createSeoFactory({
  namespace: "doctor",
  path: (params) => `/doctor/${params.slug}`,
  titleKey: "title",
  descriptionKey: "description",
});
export default function HomeWrapper() {
  return <DoctorPage />;
}
