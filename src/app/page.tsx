import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { earlier, education, experience, featured, principles, profile, projects, type Project } from "@/data/site";
import { formatDate, notes } from "@/data/notes";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { Button, SectionHead, Stack } from "@/components/ui";
import { SheetSketch } from "@/components/SheetSketch";

const FACTS = [
  ["Now", "Running Vantage Gold"],
  ["Based in", "Lagos, Nigeria (WAT)"],
  ["Open to", profile.openTo],
  ["Main tools", "TypeScript · Next.js · PostgreSQL · Gemini"],
];

function ProjectRow({ p, n }: { p: Project; n: number }) {
  return (
    <article className="reveal grid gap-6 border-t border-line py-10 md:grid-cols-[3rem_1fr_minmax(0,22rem)] md:gap-8">
      <p className="label text-subtle">{String(n).padStart(2, "0")}</p>
      <div className="min-w-0">
        <p className="label text-subtle">
          {p.kind}
          {p.year && ` · ${p.year}`}
        </p>
        <h3 className="display mt-2 text-3xl">{p.name}</h3>
        <p className="mt-3 max-w-xl text-muted">{p.summary}</p>
        <ul className="mt-4 max-w-xl space-y-1.5 text-sm text-muted">
          {p.points.map((x) => (
            <li key={x} className="flex gap-3">
              <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden />
              {x}
            </li>
          ))}
        </ul>
        <Stack items={p.stack} className="mt-5" />
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          {p.caseStudy && (
            <Link href={p.caseStudy} className="inline-flex items-center gap-1 underline decoration-accent underline-offset-4">
              Read the case study <ArrowRight className="size-4" />
            </Link>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline decoration-line underline-offset-4 hover:decoration-accent">
              Live site <ArrowUpRight className="size-4" />
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline decoration-line underline-offset-4 hover:decoration-accent">
              Code <ArrowUpRight className="size-4" />
            </a>
          )}
          {p.note && <span className="font-normal text-subtle">{p.note}</span>}
        </div>
      </div>
      <div className="overflow-hidden border border-line md:self-start">
        {p.image ? (
          <Image src={p.image} alt={p.imageAlt ?? ""} width={1440} height={900} className="aspect-[16/10] w-full object-cover object-top" />
        ) : (
          <SheetSketch />
        )}
      </div>
    </article>
  );
}

function Timeline({ items }: { items: typeof experience }) {
  return (
    <ol>
      {items.map((r) => (
        <li key={r.org} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
          <p className="font-mono text-xs text-subtle sm:pt-1">{r.dates || "Client project"}</p>
          <div>
            <h3 className="font-medium">
              {r.title}, <span className="text-muted">{r.org}</span>
            </h3>
            {r.points.length > 0 && (
              <ul className="mt-2 space-y-1.5 text-sm text-muted">
                {r.points.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-12 sm:px-8 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[1fr_15rem] md:items-end lg:grid-cols-[1fr_17rem]">
          <div>
            <p className="label flex items-center gap-2 text-muted">
              <span className="size-2 rounded-full bg-ok" aria-hidden /> {profile.role} · {profile.location}
            </p>
            <h1 className="display mt-6 text-[3.4rem] sm:text-7xl lg:text-[5.75rem]">
              I build software, <em className="text-accent">then I keep it running.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#work" solid>
                See the work <ArrowRight className="size-4" />
              </Button>
              <Button href={profile.cvPdf} download>
                Download CV <Download className="size-4" />
              </Button>
            </div>
          </div>
          <figure className="hidden md:block">
            <Image
              src="/images/profile.jpg"
              alt={profile.name}
              width={480}
              height={600}
              priority
              className="aspect-[4/5] w-full border border-line object-cover grayscale-[35%]"
            />
          </figure>
        </div>
        <dl className="mt-14 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(([k, v]) => (
            <div key={k} className="bg-bg py-4 sm:px-4">
              <dt className="label text-subtle">{k}</dt>
              <dd className="mt-1 text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── 01 Work ── */}
      <section id="work" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHead n="01" kicker="Selected work" title="Products that real people use." />

        <article className="reveal grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Link href={featured.caseStudy} className="group block overflow-hidden border border-line bg-raised p-2 lg:self-start">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              width={1440}
              height={900}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </Link>
          <div className="flex flex-col">
            <p className="label text-subtle">
              Featured · {featured.year}
            </p>
            <h3 className="display mt-2 text-5xl">{featured.name}</h3>
            <p className="mt-2 text-lg">{featured.tagline}</p>
            <p className="mt-4 text-muted">{featured.summary}</p>
            <dl className="mt-6 border-t border-line">
              {featured.stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="font-mono text-lg tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
            <Stack items={featured.stack} className="mt-5" />
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={featured.caseStudy} solid>
                Read the case study <ArrowRight className="size-4" />
              </Button>
              <Button href={featured.live}>
                Visit the site <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </div>
        </article>

        <div className="mt-16">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} p={p} n={i + 2} />
          ))}
        </div>

        <div className="border-t border-line pt-8">
          <p className="label text-subtle">Earlier, smaller builds</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {earlier.map((e) => (
              <li key={e.name} className="min-w-0">
                <a href={e.live} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 border border-line p-2.5 transition-colors hover:border-fg">
                  <Image src={e.image} alt="" width={160} height={100} className="h-12 w-16 shrink-0 border border-line object-cover object-top" />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 text-sm font-medium">
                      {e.name} <ArrowUpRight className="size-3.5 text-subtle group-hover:text-accent" />
                    </span>
                    <span className="block truncate text-xs text-subtle">{e.description}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 02 How I work ── */}
      <section id="approach" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHead n="02" kicker="How I work" title="Three rules I build by." />
        <div className="grid md:grid-cols-3">
          {principles.map((p, i) => (
            <div key={p.title} className={`reveal border-t border-line py-6 md:border-t-0 md:py-0 ${i ? "md:border-l md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}>
              <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display mt-2 text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 Notes ── */}
      <section id="notes" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHead n="03" kicker="Notes" title="What running a live product taught me." intro="Short technical write-ups from building and operating Vantage Gold." />
        <ul>
          {notes.map((n) => (
            <li key={n.slug} className="border-t border-line last:border-b">
              <Link href={`/notes/${n.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[9.5rem_1fr_auto] sm:gap-6">
                <span className="font-mono text-xs text-subtle sm:pt-2">{formatDate(n.date)}</span>
                <span>
                  <span className="display block text-2xl transition-colors group-hover:text-accent sm:text-3xl">{n.title}</span>
                  <span className="mt-1 block text-sm text-muted">{n.summary}</span>
                </span>
                <span className="flex items-center gap-1 font-mono text-xs text-subtle sm:pt-2">
                  {n.readMinutes} min read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 04 Experience ── */}
      <section id="experience" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHead n="04" kicker="Experience and education" title="From history graduate to product builder." />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4 text-muted">
            <p>
              I studied History and International Studies, and that background still shapes how I work: I write and
              design for the people who will use what I build.
            </p>
            <p>
              A front-end bootcamp at Product Hub Africa started the coding. Since then I have moved from static pages
              to complete products with databases, payments, scheduled jobs and AI, while running my own small
              business and completing national service.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href={profile.cv}>
                View the CV <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
          <div>
            <p className="label text-subtle">Experience</p>
            <div className="mt-3">
              <Timeline items={experience} />
            </div>
            <p className="label mt-10 text-subtle">Education</p>
            <div className="mt-3 border-b border-line">
              <Timeline items={education} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 Contact ── */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8">
        <SectionHead n="05" kicker="Contact" title="Have a role or a project in mind?" />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-muted">I am open to {profile.openTo.toLowerCase()}. Send a message and I will reply within a day.</p>
            <a href={`mailto:${profile.email}`} className="display mt-6 inline-block break-all text-2xl underline decoration-accent decoration-1 underline-offset-[6px] sm:text-3xl">
              {profile.email}
            </a>
            <SocialLinks className="mt-8" />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
