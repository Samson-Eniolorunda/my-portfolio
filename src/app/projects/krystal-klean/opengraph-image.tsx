import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";

export const alt = "Krystal Klean Solution case study";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "Case study · client work",
    title: "Krystal Klean Solution",
    subtitle: "A cleaning company's whole back office, inside the spreadsheet it already used.",
  });
}
