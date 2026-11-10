import type { Metadata } from "next";
import { Download } from "lucide-react";
import { cvSkills, earlier, education, experience, featured, profile, projects, SITE_URL } from "@/data/site";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "CV",
  description: `CV of ${profile.name}, ${profile.role.toLowerCase()} in ${profile.location}.`,
  alternates: { canonical: "/cv" },
};

const SUMMARY =
  "Full-stack developer who designs, builds and runs live web products. I founded and operate Vantage Gold, an AI sports-prediction platform built with Next.js, TypeScript, PostgreSQL and Google Gemini that grades every pick automatically on a public ledger. I work with AI coding assistants under a written plan, with review and automated checks, and bring practical sense from running my own small business. Recently completed NYSC; open to junior developer roles, internships and freelance builds.";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Heading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="label mt-7 scroll-mt-20 border-b border-fg pb-1 text-fg print:mt-5">
      {children}
    </h2>
  );
}

export default function CvPage() {
  // Only set locally when the PDF is made (see the README); never on the live site.
  const phone = process.env.CV_PHONE;
  const contact = [profile.location, phone, profile.email, host(profile.social.github), host(SITE_URL), host(profile.social.linkedin)].filter(Boolean);
  const selected = [...projects.filter((p) => p.slug !== "krystal-klean"), { ...earlier[0], slug: "player", summary: earlier[0].description, stack: ["HTML", "CSS", "JavaScript", "Bootstrap"] }];

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-8 sm:px-8 print:max-w-none print:p-0">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3 border border-line bg-surface p-3">
        <p className="text-sm text-muted">The same CV as a one-page PDF.</p>
        <div className="flex gap-2">
          <PrintButton />
          <a
            href={profile.cvPdf}
            download
            className="inline-flex items-center gap-2 bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-fg"
          >
            <Download className="size-4" /> Download PDF
          </a>
        </div>
      </div>

      <header>
        <h1 className="display text-5xl print:text-[2.6rem]">{profile.name}</h1>
        <p className="mt-1 text-lg print:text-base">{profile.role}</p>
        <p className="mt-2 flex flex-wrap gap-x-2 text-sm text-muted">
          {contact.map((c, i) => (
            <span key={c}>
              {i > 0 && <span className="mr-2 text-subtle">·</span>}
              {c}
            </span>
          ))}
        </p>
      </header>

      <Heading>Summary</Heading>
      <p className="mt-2 text-sm leading-relaxed text-muted">{SUMMARY}</p>

      <Heading>Experience</Heading>
      {experience.map((r) => (
        <section key={r.org} className="mt-3 break-inside-avoid">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-sm font-semibold">
              {r.title}, {r.org}
            </h3>
            <p className="font-mono text-xs text-subtle">{[r.place, r.dates].filter(Boolean).join(" · ")}</p>
          </div>
          {r.org === featured.name && <p className="text-xs text-subtle">{host(featured.live)} · {featured.stack.join(", ")}</p>}
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-muted marker:text-subtle">
            {r.points.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      ))}

      <Heading>Selected projects</Heading>
      <ul className="mt-2 space-y-1.5 text-sm">
        {selected.map((p) => (
          <li key={p.slug} className="break-inside-avoid">
            <span className="font-semibold">{p.name}</span>
            {p.live && <span className="text-subtle"> · {host(p.live)}</span>}
            <span className="text-muted"> · {p.summary}</span>
            <span className="text-subtle"> ({p.stack.join(", ")})</span>
          </li>
        ))}
      </ul>

      <Heading id="skills">Skills</Heading>
      <dl className="mt-2 space-y-1 text-sm">
        {cvSkills.map((s) => (
          <div key={s.group} className="grid gap-x-4 sm:grid-cols-[12rem_1fr] print:grid-cols-[12rem_1fr]">
            <dt className="font-semibold">{s.group}</dt>
            <dd className="text-muted">{s.items}</dd>
          </div>
        ))}
      </dl>

      <Heading>Education</Heading>
      {education.map((r) => (
        <section key={r.org} className="mt-3 break-inside-avoid">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-sm font-semibold">
              {r.title}, {r.org}
            </h3>
            <p className="font-mono text-xs text-subtle">{r.dates}</p>
          </div>
          {r.points.length > 0 && <p className="text-sm text-muted">{r.points[0]}</p>}
        </section>
      ))}
    </div>
  );
}
