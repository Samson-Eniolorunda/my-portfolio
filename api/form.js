/**
 * /api/form (Vercel Serverless Function - Node runtime)
 * ---------------------------------------------------------
 * Purpose:
 * - Receives contact submissions from the frontend (JSON)
 * - Forwards them to Formspree securely using a server-side ENV var
 *
 * ENV:
 * - PORTFOLIO_FORMSPREE_ENDPOINT
 *   (either full URL like https://formspree.io/f/xxxxxxx
 *    OR just the id like xxxxxxx)
 */

function resolveFormspreeEndpoint(raw) {
  const v = String(raw || "").trim();
  if (!v) return "";

  // If they stored only the id (e.g. mwpgzz1l), build full endpoint
  if (!v.startsWith("http")) {
    return `https://formspree.io/f/${v}`;
  }

  return v;
}

async function readJson(req) {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

module.exports = async (req, res) => {
  // Basic CORS (safe on same-origin; useful if you ever test from elsewhere)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST, OPTIONS");
    return res.end("Method Not Allowed");
  }

  const endpoint = resolveFormspreeEndpoint(process.env.PORTFOLIO_FORMSPREE_ENDPOINT);
  if (!endpoint) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    return res.end("Missing PORTFOLIO_FORMSPREE_ENDPOINT");
  }

  try {
    const data = await readJson(req);

    // Minimal validation (server-side)
    const name = String(data?.name || "").trim();
    const email = String(data?.email || "").trim();
    const message = String(data?.message || "").trim();

    if (!name || !email || !message) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ ok: false, error: "Missing required fields" }));
    }

    // Forward to Formspree
    const r = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Portfolio-Form-Proxy/1.0",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        source: data?.source || "Portfolio Contact Page",
        timestamp: data?.timestamp || new Date().toISOString(),
      }),
    });

    const text = await r.text();

    res.statusCode = r.status;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");
    return res.end(text || JSON.stringify({ ok: r.ok }));
  } catch (err) {
    console.error("Form proxy error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ ok: false, error: "Server error" }));
  }
};
