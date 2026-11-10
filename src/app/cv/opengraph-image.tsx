import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "CV of Samson Eniolorunda";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "Curriculum vitae",
    title: "Samson Eniolorunda",
    subtitle: "Experience, projects, skills and education.",
  });
}
