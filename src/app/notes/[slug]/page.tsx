import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate, noteBySlug, notes } from "@/data/notes";
import { profile } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const note = noteBySlug((await params).slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: { type: "article", title: note.title, description: note.summary, publishedTime: note.date, authors: [profile.name] },
    twitter: { title: note.title, description: note.summary },
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const note = noteBySlug((await params).slug);
  if (!note) notFound();
  const others = notes.filter((n) => n.slug !== note.slug);

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8">
      <Link href="/#notes" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> All notes
      </Link>

      <header className="mt-10 border-t border-fg pt-4">
        <p className="label flex flex-wrap gap-x-3 text-subtle">
          <span className="text-accent">Note</span>
          <time dateTime={note.date}>{formatDate(note.date)}</time>
          <span>{note.readMinutes} min read</span>
        </p>
        <h1 className="display mt-6 text-5xl sm:text-6xl">{note.title}</h1>
        <p className="mt-5 text-lg">{note.summary}</p>
      </header>

      <div className="prose-note mt-6">
        {note.sections.map((s, i) => (
          <section key={i}>
            {s.heading && <h2>{s.heading}</h2>}
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>
        ))}
      </div>

      <footer className="mt-16 border-t border-line pt-6">
        <p className="text-sm text-muted">
          Written by {profile.name}, from building and running{" "}
          <Link href="/projects/vantage-gold" className="underline decoration-accent underline-offset-4">
            Vantage Gold
          </Link>
          .
        </p>
        <p className="label mt-10 text-subtle">More notes</p>
        <ul className="mt-3">
          {others.map((n) => (
            <li key={n.slug} className="border-t border-line">
              <Link href={`/notes/${n.slug}`} className="group flex items-center justify-between gap-4 py-4">
                <span className="display text-2xl transition-colors group-hover:text-accent">{n.title}</span>
                <ArrowRight className="size-4 shrink-0 text-subtle" />
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
