import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, MapPin } from "lucide-react";
import { earlier, featured, profile, projects, skills } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";

function SectionHead({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{kicker}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-muted">{intro}</p>}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line bg-raised px-3 py-1 font-mono text-xs text-muted">{children}</span>;
}

function LinkButton({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={
        primary
          ? "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          : "inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent"
      }
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:grid-cols-[1.4fr_1fr] md:pb-28 md:pt-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden /> Available for freelance and full-time work
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Hi, I&apos;m Samson.
              <br />
              <span className="text-accent">I build products</span> people use.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="#work" primary>
                See my work <ArrowRight className="size-4" />
              </LinkButton>
              <LinkButton href="#contact">Get in touch</LinkButton>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-subtle">
              <MapPin className="size-4" aria-hidden /> {profile.location}
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-xs md:max-w-none">
            <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-accent-soft blur-2xl" />
            <Image
              src="/images/profile.jpg"
              alt={profile.name}
              width={480}
              height={480}
              priority
              className="relative aspect-square w-full rounded-[2rem] border border-line object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Featured: Vantage Gold ── */}
      <section id="work" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHead kicker="Featured project" title={featured.name} intro={featured.tagline} />
        <article className="reveal overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_1fr]">
            <div className="flex items-center border-b border-line bg-raised p-3 lg:border-b-0 lg:border-r">
              {/* The whole screenshot at its own shape (cropping cut the headline). */}
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                width={1440}
                height={900}
                className="h-auto w-full rounded-2xl border border-line"
              />
            </div>
            <div className="flex flex-col p-6 sm:p-8">
              <p className="text-muted">{featured.description}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {featured.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <Link
                  href={featured.caseStudy}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
                >
                  Read the case study <ArrowRight className="size-4" />
                </Link>
                {featured.live && (
                  <LinkButton href={featured.live}>
                    Visit the site <ArrowUpRight className="size-4" />
                  </LinkButton>
                )}
              </div>
            </div>
          </div>
          <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {featured.stats.map((s, i) => (
              <div key={s.label} className={`p-5 sm:p-6 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}>
                <dt className="text-xs text-subtle">{s.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </section>

      {/* ── Projects ── */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <SectionHead kicker="More work" title="Selected projects" intro="Real products for real users, from AI tools to e-commerce." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.slug} className="reveal group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface">
              <div className="overflow-hidden border-b border-line">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  width={1440}
                  height={900}
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">{p.tagline}</p>
                <h3 className="mt-2 text-xl font-semibold">{p.name}</h3>
                <p className="mt-3 text-sm text-muted">{p.description}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-subtle" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
                <div className="mt-auto flex gap-4 pt-6 text-sm font-medium">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg hover:text-accent">
                      Live site <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  {p.code ? (
                    <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-fg">
                      <Github className="size-4" /> Code
                    </a>
                  ) : (
                    <span className="text-subtle">Private code</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Earlier work */}
        <div className="mt-16">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-subtle">Earlier work</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {earlier.map((e) => (
              <a
                key={e.name}
                href={e.live}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex items-center gap-4 rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-accent"
              >
                <Image src={e.image} alt="" width={160} height={100} className="h-14 w-20 shrink-0 rounded-lg border border-line object-cover object-top" />
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    {e.name} <ArrowUpRight className="size-3.5 text-subtle group-hover:text-accent" />
                  </span>
                  <span className="block truncate text-xs text-subtle">{e.description}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHead kicker="Skills" title="What I work with" intro="The tools behind the projects above, used every day in production." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((g) => (
            <div key={g.group} className="reveal rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-sm font-semibold">{g.group}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHead kicker="About" title="From history to building software" />
          <div className="reveal space-y-5 text-muted">
            <p>
              I studied History and International Studies, and that background still shapes how I work: I care about
              the people who will use what I build, and I write and design for them, not for other developers.
            </p>
            <p>
              My curiosity about how the internet works led me into code through the Product Hub Africa front-end
              bootcamp. Since then I have moved from static pages to full products: Next.js applications with
              databases, payments, scheduled jobs, AI models and automated social media.
            </p>
            <p>
              Vantage Gold is the best example. I built and run it end to end: the prediction engine, the public
              results ledger, the admin panel, the payment flow and the daily automation behind it.
            </p>
            <p>Away from the keyboard, I follow football closely, read widely and play the occasional video game.</p>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <div className="reveal grid gap-10 rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="text-3xl font-semibold tracking-tight">Let&apos;s build something.</h2>
            <p className="mt-4 text-muted">
              Have a product in mind or a role to fill? Send a message and I will reply within a day.
            </p>
            <a href={`mailto:${profile.email}`} className="mt-6 inline-block font-medium text-fg underline decoration-accent underline-offset-4">
              {profile.email}
            </a>
            <SocialLinks className="mt-6" />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
