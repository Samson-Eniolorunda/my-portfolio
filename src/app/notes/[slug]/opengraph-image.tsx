import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { noteBySlug, notes } from "@/data/notes";

export const alt = "A note by Samson Eniolorunda";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const note = noteBySlug((await params).slug);
  return ogImage({ kicker: "Note", title: note?.title ?? "Notes", subtitle: note?.summary });
}
