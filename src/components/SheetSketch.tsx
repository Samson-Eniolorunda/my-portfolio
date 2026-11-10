/** A drawn spreadsheet for the client project that has no public screen. */
export function SheetSketch({ className = "aspect-[16/10]" }: { className?: string }) {
  const rows = [
    ["Booking", "Client", "Service", "Invoice"],
    ["0001", "Client A", "Deep clean", "Sent"],
    ["0002", "Client B", "End of tenancy", "Sent"],
    ["0003", "Client C", "Carpet", "Due"],
    ["0004", "Client D", "Oven", "Draft"],
  ];  return (
    <div className={`relative flex w-full items-center justify-center bg-raised p-5 ${className}`}>
      <div aria-hidden className="w-full border border-line bg-surface font-mono text-[11px]">
        {rows.map((r, i) => (
          <div key={r[0]} className={`grid grid-cols-[0.8fr_1.6fr_0.8fr_0.8fr] ${i ? "border-t border-line text-muted" : "bg-raised text-fg"}`}>
            {r.map((c, j) => (
              <span key={j} className={`truncate px-2 py-1.5 ${j ? "border-l border-line" : ""} ${c === "Due" ? "text-accent" : ""}`}>
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="label absolute bottom-2 right-3 text-[0.6rem] text-subtle">Illustration · system is private</p>
    </div>
  );
}
