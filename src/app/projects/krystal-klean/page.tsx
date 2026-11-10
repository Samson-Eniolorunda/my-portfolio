import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/site";
import { Button, Stack } from "@/components/ui";
import { SheetSketch } from "@/components/SheetSketch";

const project = projects.find((p) => p.slug === "krystal-klean")!;

export const metadata: Metadata = {
  title: "Krystal Klean case study",
  description:
    "A three-month contract building the back office of a UK cleaning company in Google Apps Script: bookings, invoices, Outlook email and calendar, payroll, staff onboarding and Zoom interviews.",
  alternates: { canonical: "/projects/krystal-klean" },
};

const FACTS = [
  ["Client", "Krystal Klean Solution, UK cleaning company"],
  ["Engagement", "Contract, October – December 2025"],
  ["Role", "Sole technical consultant and developer"],
  ["Delivered", "About 7,600 lines across three script files"],
];

const NUMBERS = [
  ["6", "custom menus inside the spreadsheet"],
  ["8", "kinds of email sent from a selected row"],
  ["3", "platforms joined: Google, Microsoft 365, Zoom"],
  ["14", "day payroll periods built automatically"],
];

const FLOW = [
  { step: "Book", text: "A new row gets a booking ID, dropdowns for service and sub-service, and a price from the catalogue, hourly or flat, with any discount." },
  { step: "Invoice", text: "One click copies the invoice template, fills it, saves a PDF in the client's Drive folder and writes the link back to the row." },
  { step: "Notify", text: "The invoice, the cleaner's assignment, payment reminders and the thank-you email go out from the company's Outlook account." },
  { step: "Pay", text: "Completed jobs feed fortnightly payroll per staff member, with paid or unpaid status and payday entries on the Outlook calendar." },
];

const MODULES = [
  ["Bookings and pricing", "Service catalogue with hourly and flat prices, sub-services that depend on the service chosen, discounts, totals, due dates and colour-coded booking and payment status."],
  ["Invoices", "Branded PDF invoices from a Google Docs template, for one booking or several combined, filed per client in Drive."],
  ["Email through Outlook", "Microsoft Graph with OAuth 2.0: invoices with the PDF attached, staff assignments, payment received and reminder emails, post-service thank-you with a feedback survey, and onboarding links, all with the company signature."],
  ["Calendar", "An Outlook event for each booking, created or updated from the row and removed automatically two days after the job."],
  ["Payroll", "Hours from logged jobs, staff rates, fortnightly summaries in readable hours (\"1hr 30mins\"), pounds or naira per staff member, refreshed daily or as soon as a job changes."],
  ["Staff onboarding", "A Google Form for new staff whose responses sync into the staff list every five minutes, keep the sheet's formatting, and can be opened or closed from a menu."],
  ["Zoom meetings and interviews", "Zoom Server-to-Server OAuth creates the meeting; each person receives a personalised email with a calendar invite in UK time."],
  ["Revenue dashboard", "Total, paid and unpaid revenue, bookings by status, jobs by type of clean and monthly revenue, rebuilt from the bookings on request."],
];

const DECISIONS = [
  {
    title: "Build where the team already works",
    choice: "Everything runs inside the Google Sheet the company already used, through custom menus, instead of a new web app.",
    tradeoff: "Fewer design freedoms than a custom app; no new tool to learn, no subscription, and the data stays visible to the owners.",
  },
  {
    title: "Find columns by name, not position",
    choice: "Every script reads the header row and matches columns by name and known aliases, such as \"Service Type\" or \"Type of Clean\".",
    tradeoff: "More code up front; the owners can add, move or rename columns without breaking invoices or payroll.",
  },
  {
    title: "Send from the company's own mailbox",
    choice: "Emails and calendar entries go through Microsoft Graph from the company's Outlook account, not a third-party mailer.",
    tradeoff: "An OAuth setup to maintain; replies come straight back to the company, and sent items stay in its own records.",
  },
  {
    title: "Make UK time explicit",
    choice: "Meeting times are sent with the Europe/London time zone and calendar files carry the zone too.",
    tradeoff: "A little more date handling; no invite shifts by an hour when the clocks change.",
  },
  {
    title: "Run each edit once",
    choice: "The spreadsheet's built-in and installed edit triggers can both fire for one change, so each edit is given a signature and handled only once.",
    tradeoff: "A small amount of stored state; no duplicate prompts, prices or payroll rows.",
  },
];

function H2({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-fg pt-4">
      <p className="label text-accent">{n}</p>
      <h2 className="display mt-3 text-4xl">{children}</h2>
    </div>
  );
}

export default function KrystalKleanCaseStudy() {
  return (
    <article className="mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8">
      <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Back to work
      </Link>

      <header className="mt-10">
        <p className="label text-accent">Case study · client work</p>
        <h1 className="display mt-4 text-5xl sm:text-7xl">Krystal Klean Solution</h1>
        <p className="mt-4 max-w-2xl text-xl">A cleaning company&apos;s whole back office, inside the spreadsheet it already used.</p>
        <p className="mt-3 max-w-2xl text-muted">{project.summary}</p>
        <dl className="mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(([k, v]) => (
            <div key={k} className="bg-bg py-4 sm:px-4">
              <dt className="label text-subtle">{k}</dt>
              <dd className="mt-1 text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mt-12 border border-line">
        <SheetSketch className="px-6 pb-12 pt-8 sm:px-16" />
      </div>

      <section className="mt-20 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <H2 n="01 · Problem">Admin was eating the working day.</H2>
        <div className="space-y-4 text-muted md:pt-16">
          <p>
            Bookings lived in a spreadsheet, but everything around them was manual: writing each invoice, emailing
            clients and cleaners, adding jobs to the calendar, working out staff pay every fortnight and chasing
            payments.
          </p>
          <p>
            The company did not need a new product to learn. It needed the sheet it already trusted to do that work
            itself.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <H2 n="02 · How it works">From booking to payday.</H2>
        <ol className="mt-8 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map((f, i) => (
            <li key={f.step} className="bg-bg py-5 sm:px-5">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="display mt-1 text-2xl">{f.step}</h3>
              <p className="mt-2 text-sm text-muted">{f.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <H2 n="03 · Numbers">The size of it.</H2>
        <dl className="mt-8 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {NUMBERS.map(([v, k]) => (
            <div key={k} className="flex flex-col-reverse bg-bg py-5 sm:px-5">
              <dt className="mt-1 text-sm text-muted">{k}</dt>
              <dd className="display text-5xl">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20">
        <H2 n="04 · Scope">What I built.</H2>
        <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
          {MODULES.map(([k, v]) => (
            <div key={k} className="border-b border-line py-4">
              <dt className="font-medium">{k}</dt>
              <dd className="mt-1 text-sm text-muted">{v}</dd>
            </div>
          ))}
        </dl>
        <Stack items={project.stack} className="mt-6" />
      </section>

      <section className="mt-20">
        <H2 n="05 · Decisions">The calls that shaped it.</H2>
        <div className="mt-8">
          {DECISIONS.map((d, i) => (
            <div key={d.title} className="grid gap-3 border-b border-line py-6 md:grid-cols-[3rem_1fr_1fr] md:gap-8">
              <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="display text-2xl">{d.title}</h3>
                <p className="mt-2 text-sm text-muted">{d.choice}</p>
              </div>
              <div className="border-l-2 border-accent pl-4 text-sm">
                <p className="label text-subtle">Trade-off</p>
                <p className="mt-1">{d.tradeoff}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-fg pt-6">
        <p className="text-muted">
          The code and the spreadsheet belong to the client and hold customer and staff records, so they are not
          public. I am happy to walk through the system and its design in an interview.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/#contact" solid>
            Work with me <ArrowRight className="size-4" />
          </Button>
          <Button href="/projects/vantage-gold">Read the Vantage Gold case study</Button>
        </div>
      </section>
    </article>
  );
}
