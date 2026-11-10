import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Vantage Gold case study";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "Case study",
    title: "Vantage Gold",
    subtitle: "AI sports predictions with every result graded in public.",
    image: "images/projects/vantage-home.png",
  });
}
