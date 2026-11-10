import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { featured } from "@/data/site";
import { notes } from "@/data/notes";
import { Button, Stack } from "@/components/ui";

export const metadata: Metadata = {
  title: "Vantage Gold case study",
  description:
    "How I designed, built and run Vantage Gold: AI sports predictions across six sports, with every result graded automatically and published on a public ledger. Decisions, trade-offs and numbers.",
  alternates: { canonical: "/projects/vantage-gold" },
};

const FACTS = [
  ["Role", "Founder, sole designer and developer"],
  ["Timeline", "March 2026 – now, live daily"],
  ["Scope", "Product, data, AI, payments, operations"],
  ["Way of working", "AI-assisted, with review and checks"],
];

const NUMBERS = [
  ["6", "sports predicted every day"],
  ["900+", "picks graded in public in 30 days"],
  ["20+", "scheduled jobs a day"],
  ["13", "external services monitored"],
  ["9,555", "past results imported for team form"],
  ["5", "social platforms posted to automatically"],
];

const FLOW = [
  { step: "Collect", text: "Scheduled jobs gather fixtures, bookmaker prices, team form and weather for six sports, within each provider's daily quota." },
  { step: "Predict", text: "Statistical models price every market; Gemini adds the written reasoning; strict rules keep only picks the bookmaker also rates highly." },
  { step: "Publish", text: "Picks go live at 09:00 with booking codes and are posted to Telegram, Facebook, Instagram, X and TikTok, with approvals where needed." },
  { step: "Settle", text: "When games finish, results are graded from official scores, goal times and match reports, and written to the public Trust Ledger." },
];

const DECISIONS = [
  {
    title: "Only publish what can be graded",
    choice: "Markets come from a curated list, and each one has a tested grading rule before it can be predicted.",
    tradeoff: "Fewer markets than competitors offer, but every published pick can be checked on the ledger.",
  },
  {
    title: "Leave a result open rather than guess",
    choice: "Settlement collects evidence first and grades second. Missing evidence means the pick stays open and is retried, up to eight times.",
    tradeoff: "Some results arrive hours later; none are published wrong.",
    note: "grading-bets-nobody-types-in",
  },
  {
    title: "Agreement with the market",
    choice: "A pick is kept only when the model and the bookmaker's own prices both rate it highly, including on big-odds Long Shots slips.",
    tradeoff: "Fewer, less exciting picks, in exchange for a record that does not depend on luck.",
  },
  {
    title: "Costly AI features behind a switch",
    choice: "When one month's bill showed web search was most of the AI cost, search for predictions became an admin switch, off by default, with a monthly limit for settlement.",
    tradeoff: "Slightly less context in the written reasoning; a predictable monthly cost.",
    note: "running-a-live-product-on-a-small-budget",
  },
  {
    title: "Freeze what has been posted",
    choice: "Long Shots slips are frozen when the daily post goes out, so the page, the booking codes and the social posts match all day.",
    tradeoff: "No late improvements after posting; no confusion for people who followed the post.",
  },
];

const FEATURES = [
  ["Daily predictions", "Six sports, each pick with a confidence score, recent form and the reasoning behind it."],
  ["Trust Ledger", "Every pick graded automatically and shown in public, with win rate and return by sport and period."],
  ["Ask the Oracle", "An AI slip builder: members choose size and risk, paid for with credits."],
  ["Long Shots", "Big-odds slips with the honest chance of winning shown on each one, celebrated only when every game wins."],
  ["Booking codes", "One code loads a whole slip on SportyBet or Football.com, on request."],
  ["Community", "Posts, follows, daily trivia, a leaderboard, weekly rewards and a season-long fantasy team."],
  ["Payments", "Card payments through Flutterwave and bank transfers with an approval flow and emailed receipts."],
  ["Admin panel", "Approvals, scheduled jobs, run logs, AI cost by feature, external service health and a social composer."],
];

const DIFFERENTLY = [
  "Write the grading rule for each market before its prediction model, so no market can go live before it can be settled.",
  "Measure database transfer and AI cost inside the product from the first week, instead of learning about them from the provider's dashboard.",
  "Keep the number of scheduled jobs smaller by grouping work by data source rather than by feature.",
];

function Shot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`border border-line bg-raised p-2 ${className}`}>
      <Image src={src} alt={alt} width={1440} height={900} className="w-full object-cover object-top" />
      <figcaption className="label px-1 pt-2 text-subtle">{alt}</figcaption>
    </figure>
  );
}

function H2({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-fg pt-4">
      <p className="label text-accent">{n}</p>
      <h2 className="display mt-3 text-4xl">{children}</h2>
    </div>
  );
}

export default function VantageGoldCaseStudy() {
  const related = notes.filter((n) => DECISIONS.some((d) => d.note === n.slug));
  return (
    <article className="mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8">
      <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Back to work
      </Link>

      <header className="mt-10">
        <p className="label text-accent">Case study</p>
        <h1 className="display mt-4 text-6xl sm:text-7xl">Vantage Gold</h1>
        <p className="mt-4 max-w-2xl text-xl">{featured.tagline}</p>
        <p className="mt-3 max-w-2xl text-muted">{featured.summary}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={featured.live} solid>
            Visit vantagegold.live <ArrowUpRight className="size-4" />
          </Button>
        </div>
        <dl className="mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(([k, v]) => (
            <div key={k} className="bg-bg py-4 sm:px-4">
              <dt className="label text-subtle">{k}</dt>
              <dd className="mt-1 text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Shot src="/images/projects/vantage-home.png" alt="Home page with today's free picks" className="mt-12" />

      <section className="mt-20 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <H2 n="01 · Problem">Tipsters forget their losses.</H2>
        <div className="space-y-4 text-muted md:pt-16">
          <p>
            Most sports tipping accounts show their wins and quietly forget their losses, so there is no way to know
            whether they are any good. I wanted a product that makes every prediction from real data and then proves
            its record in public, automatically, every day.
          </p>
          <p>
            That one promise drives most of the engineering: if every result is public, then every result has to be
            graded correctly without anyone typing it in.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <H2 n="02 · How it works">One loop, every day.</H2>
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
        <H2 n="03 · Numbers">What it runs on a normal day.</H2>
        <dl className="mt-8 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {NUMBERS.map(([v, k]) => (
            <div key={k} className="flex flex-col-reverse bg-bg py-5 sm:px-5">
              <dt className="mt-1 text-sm text-muted">{k}</dt>
              <dd className="display text-5xl">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <Shot src="/images/projects/vantage-predictions.png" alt="Today's predictions" />
        <Shot src="/images/projects/vantage-ledger.png" alt="The public Trust Ledger" />
      </div>

      <section className="mt-20">
        <H2 n="04 · Decisions">The calls that shaped it.</H2>
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
                {d.note && (
                  <Link href={`/notes/${d.note}`} className="mt-2 inline-flex items-center gap-1 text-muted underline decoration-line underline-offset-4 hover:text-fg">
                    Read the note <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <H2 n="05 · Scope">What I built.</H2>
        <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
          {FEATURES.map(([k, v]) => (
            <div key={k} className="border-b border-line py-4">
              <dt className="font-medium">{k}</dt>
              <dd className="mt-1 text-sm text-muted">{v}</dd>
            </div>
          ))}
        </dl>
        <Stack items={[...featured.stack, "Upstash Redis", "Flutterwave", "Resend", "Sentry", "Playwright"]} className="mt-6" />
      </section>

      <div className="mt-16 grid items-start gap-6 md:grid-cols-[2fr_1fr]">
        <Shot src="/images/projects/vantage-longshots.png" alt="Long Shots" />
        <Shot src="/images/projects/vantage-mobile.png" alt="Predictions on a phone" className="mx-auto w-full max-w-[260px]" />
      </div>

      <section className="mt-20 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <H2 n="06 · Reflection">What I would do differently.</H2>
        <ol className="space-y-4 md:pt-16">
          {DIFFERENTLY.map((x, i) => (
            <li key={x} className="flex gap-4 text-muted">
              <span className="font-mono text-xs text-accent">{i + 1}.</span>
              <span>{x}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-t border-fg pt-6">
        <p className="text-muted">
          Vantage Gold runs every day without manual steps: predictions, posts, settlement, booking codes and the public
          ledger are all automated. It is the project where I learned to own a product end to end, from the data model
          to the last line of copy.
        </p>
        {related.length > 0 && (
          <ul className="mt-8">
            {related.map((n) => (
              <li key={n.slug} className="border-t border-line last:border-b">
                <Link href={`/notes/${n.slug}`} className="group flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="label text-subtle">Note</span>
                    <span className="display block text-2xl transition-colors group-hover:text-accent">{n.title}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-subtle" />
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={featured.live} solid>
            Visit the site <ArrowUpRight className="size-4" />
          </Button>
          <Button href="/#contact">Work with me</Button>
        </div>
      </section>
    </article>
  );
}
