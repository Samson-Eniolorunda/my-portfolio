# Samson Eniolorunda · Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**.

- One-page home: hero, featured project, projects, skills, about and contact
- Case study: `/projects/vantage-gold`
- Dark and light themes, remembered per visitor
- Contact form: `POST /api/contact`, forwarded to Formspree

All text and project details live in `src/data/site.ts`.

## Run locally

```bash
npm install
npm run dev
```

## Settings (Vercel)

| Name | Purpose |
| --- | --- |
| `PORTFOLIO_FORMSPREE_ENDPOINT` | Formspree form address or id for the contact form |
| `NEXT_PUBLIC_SITE_URL` | The site's public address, for link previews (optional) |
