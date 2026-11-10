# Samson Eniolorunda · Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**.

- Home: hero, selected work (each project shows its own stack), how I work, notes, experience and education, contact
- Case study: `/projects/vantage-gold`
- Notes: `/notes/[slug]` (content in `src/data/notes.ts`)
- CV: `/cv`, printable to one A4 page; the PDF download is `public/Samson-Eniolorunda-CV.pdf`
- Link-preview images for every page (`opengraph-image.tsx`, shared design in `src/lib/og.tsx`)
- Light and dark themes (device setting by default, the visitor's choice remembered)
- Contact form: `POST /api/contact`, forwarded to Formspree

All text and project details live in `src/data/site.ts` and `src/data/notes.ts`.

## Run locally

```bash
npm install
npm run dev
```

## Updating the CV PDF

The phone number is never stored in the code or shown on the live site; it appears only in the PDF.

1. Add `CV_PHONE=+234 ...` to `.env.local` (git-ignored).
2. Run `npm run dev` and open `http://localhost:3000/cv`.
3. Print, choose "Save as PDF" (A4, no headers and footers, background graphics on), and save it as
   `public/Samson-Eniolorunda-CV.pdf`.

## Settings (Vercel)

| Name | Purpose |
| --- | --- |
| `PORTFOLIO_FORMSPREE_ENDPOINT` | Formspree form address or id for the contact form |
| `NEXT_PUBLIC_SITE_URL` | The site's public address (default `https://samsoneniolorunda.vercel.app`) |

Do not set `CV_PHONE` on Vercel.
