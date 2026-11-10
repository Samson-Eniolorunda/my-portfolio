// POST /api/contact: forwards the contact form to Formspree. Uses the same
// Vercel setting as the old site, PORTFOLIO_FORMSPREE_ENDPOINT (a full
// https://formspree.io/f/… address or just the form id).

import { NextResponse } from "next/server";

function endpoint(): string {
  const v = (process.env.PORTFOLIO_FORMSPREE_ENDPOINT ?? "").trim();
  if (!v) return "";
  return v.startsWith("http") ? v : `https://formspree.io/f/${v}`;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const url = endpoint();
  if (!url) return NextResponse.json({ error: "The contact form is not set up yet." }, { status: 500 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);
  // Honeypot: a bot filled the hidden field. Answer as if sent.
  if (String(body.company ?? "").trim()) return NextResponse.json({ ok: true });
  if (!name || !EMAIL.test(email) || message.length < 5) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, message, source: "Portfolio contact form", _replyto: email }),
  }).catch(() => null);
  if (!res?.ok) return NextResponse.json({ error: "The message could not be sent." }, { status: 502 });
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
