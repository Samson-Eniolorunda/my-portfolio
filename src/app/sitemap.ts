import type { MetadataRoute } from "next";
import { notes } from "@/data/notes";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects/vantage-gold`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projects/krystal-klean`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/cv`, changeFrequency: "monthly", priority: 0.8 },
    ...notes.map((n) => ({ url: `${SITE_URL}/notes/${n.slug}`, lastModified: n.date, priority: 0.7 })),
  ];
}
