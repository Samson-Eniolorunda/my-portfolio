import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { featured } from "@/data/site";

export const metadata: Metadata = {
  title: "Vantage Gold case study",
  description:
    "How I designed, built and run Vantage Gold: AI sports predictions across six sports, with every result graded automatically and published on a public ledger.",
};

const FLOW = [
  { step: "Collect", text: "Each morning, scheduled jobs gather fixtures, bookmaker prices, team form and weather for six sports." },
  { step: "Predict", text: "Statistical models price every market; Google Gemini adds reasoning; strict rules keep only picks the bookmaker also rates highly." },
  { step: "Publish", text: "Picks go live at 9:00, with booking codes, and are posted automatically to Telegram, Facebook, Instagram, X and TikTok." },
  { step: "Settle", text: "When games finish, results are graded from official scores, goal times and match reports, and written to the public Trust Ledger." },
];

const FEATURES = [
  { title: "Daily predictions", text: "Picks for football, basketball, tennis, hockey, baseball and MMA, each with a confidence score, recent form and the reasoning behind it." },
  { title: "Trust Ledger", text: "Every pick, won or lost, graded automatically and shown in public, with win rate and return on investment by sport and period." },
  { title: "Ask the Oracle", text: "An AI slip builder: members choose a size and risk level, and the Oracle builds a slip from the day's games, paid for with credits." },
  { title: "Long Shots", text: "Big-odds slips built only from games where the model agrees with the bookmaker, with honest odds of winning shown on every slip." },
  { title: "Booking codes", text: "One code loads a whole slip on SportyBet or Football.com, built from the bookmakers' public odds and booking service." },
  { title: "Community and rewards", text: "Posts, follows, daily trivia, a leaderboard, weekly rewards and a season-long fantasy football team." },
  { title: "Payments and Pro", text: "Card payments through Flutterwave and bank transfers with an approval flow, receipts by email and a Pro plan." },
  { title: "Admin panel", text: "Approvals, scheduled jobs, run logs, AI cost tracking, user management, analytics and a social media composer with AI images." },
];

const CHALLENGES = [
  {
    title: "Grading results nobody types in",
    text: "Markets such as \"2Up\" or \"early goals\" cannot be graded from a final score. I built a settlement pipeline that combines stored results, live-score feeds and match reports with goal times, and leaves a pick open rather than guessing when the evidence is incomplete.",
  },
  {
    title: "Running on free tiers",
    text: "Sports data APIs allow about 100 calls a day and the database has a monthly transfer limit. Caching, daily quotas with a reserve kept for settlement, and reading each data set once per run keep the whole product inside free plans.",
  },
  {
    title: "Honest by design",
    text: "A predictions site is only credible if losses are as visible as wins. The Trust Ledger publishes every result automatically, the AI never sees whether a pick won, and odds are always shown with the real chance of winning.",
  },
];

const STACK = [
  ["Framework", "Next.js 16 (App Router), React 19, TypeScript"],
  ["Data", "PostgreSQL on Supabase with Prisma, Upstash Redis"],
  ["AI", "Google Gemini for reasoning, slips, trivia and images"],
  ["Platform", "Vercel with scheduled jobs, web push, PWA"],
  ["Services", "Flutterwave, Resend email, Sentry, Telegram and Meta APIs"],
  ["Quality", "Playwright page checks and scripted tests for every market"],
];

function Shot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-raised p-2 ${className}`}>
      <Image src={src} alt={alt} width={1440} height={900} className="w-full rounded-xl object-cover object-top" />
    </div>
  );
}

export default function VantageGoldCaseStudy() {
  return (
    <article className="mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8">
      <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Back to work
      </Link>

      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Case study</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Vantage Gold</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{featured.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={featured.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg hover:opacity-90"
          >
            Visit vantagegold.live <ArrowUpRight className="size-4" />
          </a>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {[
            ["Role", "Sole designer and developer"],
            ["Timeline", "2026, live and growing"],
            ...featured.stats.slice(0, 2).map((s) => [s.label, s.value]),
          ].map(([k, v]) => (
            <div key={k} className="bg-surface p-4">
              <dt className="text-xs text-subtle">{k}</dt>
              <dd className="mt-1 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Shot src="/images/projects/vantage-home.png" alt="Vantage Gold home page" className="mt-12" />

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">The problem</h2>
        <div className="mt-4 space-y-4 text-muted">
          <p>
            Most sports tipping accounts show their wins and quietly forget their losses, so there is no way to know
            whether they are any good. I wanted a product that makes every prediction from real data and then proves
            its record in public, automatically, every day.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map((f, i) => (
            <li key={f.step} className="rounded-2xl border border-line bg-surface p-5">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-2 font-semibold">{f.step}</h3>
              <p className="mt-2 text-sm text-muted">{f.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <Shot src="/images/projects/vantage-predictions.png" alt="Today's predictions page" />
        <Shot src="/images/projects/vantage-ledger.png" alt="The public Trust Ledger" />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">What I built</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 grid items-start gap-6 md:grid-cols-[2fr_1fr]">
        <Shot src="/images/projects/vantage-longshots.png" alt="Long Shots page" />
        <Shot src="/images/projects/vantage-mobile.png" alt="Predictions on a phone" className="mx-auto max-w-[260px]" />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Engineering challenges</h2>
        <div className="mt-6 space-y-4">
          {CHALLENGES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Stack</h2>
        <dl className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {STACK.map(([k, v]) => (
            <div key={k} className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-sm text-subtle">{k}</dt>
              <dd className="text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Outcome</h2>
        <p className="mt-4 text-muted">
          Vantage Gold runs every day without manual work: predictions, posts, settlement, booking codes and the
          public ledger are all automated, and more than 900 picks were graded in public in its latest 30 days. It
          is the project where I learned to own a product end to end, from the data model to the last line of copy.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={featured.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg hover:opacity-90"
          >
            Visit the site <ArrowUpRight className="size-4" />
          </a>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-accent">
            Work with me
          </Link>
        </div>
      </section>
    </article>
  );
}
