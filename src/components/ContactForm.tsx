"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

type State = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-accent";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(out.error || "The message could not be sent.");
      setState("sent");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "The message could not be sent.");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col items-start justify-center rounded-2xl border border-line bg-raised p-8">
        <p className="text-lg font-semibold">Thank you, your message is on its way.</p>
        <p className="mt-2 text-sm text-muted">I will reply to the email address you gave.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-6 text-sm font-medium text-accent">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Name</span>
          <input name="name" required autoComplete="name" placeholder="Your full name" className={FIELD} />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={FIELD} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">Message</span>
        <textarea name="message" required rows={5} placeholder="Tell me about your project or role" className={`${FIELD} resize-y`} />
      </label>
      {/* Bots fill every field; people never see this one. */}
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error} You can also email me directly.
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {state === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
