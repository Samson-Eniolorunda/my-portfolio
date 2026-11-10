import Link from "next/link";

/** Numbered section heading: "01 — Work" above a serif title, with a rule. */
export function SectionHead({ n, kicker, title, intro, id }: { n: string; kicker: string; title: React.ReactNode; intro?: string; id?: string }) {
  return (
    <header className="mb-10 border-t border-fg pt-4">
      <p className="label flex gap-3 text-subtle">
        <span className="text-accent">{n}</span>
        <span>{kicker}</span>
      </p>
      <h2 id={id} className="display mt-5 max-w-3xl text-4xl sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}
    </header>
  );
}

/** Square-cornered button; solid ink or outlined. Uses Link for site pages. */
export function Button({ href, children, solid = false, download = false }: { href: string; children: React.ReactNode; solid?: boolean; download?: boolean }) {
  const cls = solid
    ? "inline-flex items-center gap-2 bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-fg"
    : "inline-flex items-center gap-2 border border-fg px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-fg hover:text-bg";
  if (href.startsWith("http") || download) {
    return (
      <a href={href} className={cls} {...(download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Inline "Built with" list: the skills, shown where they were used. */
export function Stack({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={`font-mono text-xs leading-relaxed text-subtle ${className}`}>
      <span className="text-muted">Built with </span>
      {items.join(" · ")}
    </p>
  );
}
