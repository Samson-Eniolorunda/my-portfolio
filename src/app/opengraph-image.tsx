import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Samson Eniolorunda, full-stack developer";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "Portfolio",
    title: "I build software, then I keep it running.",
    subtitle: "Live products with Next.js, TypeScript, PostgreSQL and AI.",
  });
}
