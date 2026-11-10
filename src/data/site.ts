// Everything the site says lives here, so it can be updated without touching
// the layout. Facts come from each project's repository and live site.

export const profile = {
  name: "Samson Eniolorunda",
  role: "Full-stack developer",
  location: "Lagos, Nigeria",
  email: "samsoneniolorunda@gmail.com",
  intro:
    "I build complete web products with Next.js, TypeScript and AI: from the database and background jobs to the interface people use every day.",
  social: {
    github: "https://github.com/Samson-Eniolorunda",
    linkedin: "https://linkedin.com/in/samson-eniolorunda",
    x: "https://x.com/s_eniolorunda_",
  },
};

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  live?: string;
  code?: string;
  stack: string[];
  highlights: string[];
}

export const featured: Project & { stats: { value: string; label: string }[]; caseStudy: string } = {
  slug: "vantage-gold",
  name: "Vantage Gold",
  tagline: "AI sports predictions with every result in public",
  description:
    "A live product I designed, built and run on my own: daily AI predictions across six sports, built from bookmaker odds, team form and weather, with every win and loss recorded on a public Trust Ledger.",
  image: "/images/projects/vantage-home.png",
  imageAlt: "Vantage Gold home page showing today's free picks",
  live: "https://www.vantagegold.live",
  stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Gemini AI", "Tailwind CSS", "Vercel"],
  highlights: [
    "Daily predictions for football, basketball, tennis, hockey, baseball and MMA",
    "Public Trust Ledger: every pick graded automatically from official results",
    "Ask the Oracle: an AI slip builder with credits and booking codes",
    "Automatic posts to Telegram, Facebook, Instagram, X and TikTok",
  ],
  stats: [
    { value: "6", label: "sports covered" },
    { value: "900+", label: "picks graded in 30 days" },
    { value: "20+", label: "scheduled jobs" },
    { value: "5", label: "social platforms automated" },
  ],
  caseStudy: "/projects/vantage-gold",
};

export const projects: Project[] = [
  {
    slug: "puredraft-hr",
    name: "PureDraft HR",
    tagline: "AI-powered HR document platform",
    description:
      "An HR workspace that drafts offer letters, formats policies and summarises reports with AI, with 31+ templates, bulk CSV generation and voice input.",
    image: "/images/projects/puredrafthr.png",
    imageAlt: "PureDraft HR assistant screen",
    live: "https://pure-draft-hr.vercel.app",
    stack: ["Next.js 15", "TypeScript", "Gemini AI", "PWA"],
    highlights: [
      "Assistant, Builder, Formatter and Summariser in one app",
      "Exports to PDF, Word and Excel, with e-signature requests",
      "Document library with tags, version history and audit log",
    ],
  },
  {
    slug: "lingerie-by-sisioyin",
    name: "Lingeries by Sisioyin",
    tagline: "E-commerce store for a lingerie brand",
    description:
      "A complete online shop with product catalogue, cart and checkout, customer accounts and an admin panel with roles, on a Supabase backend.",
    image: "/images/projects/lingerie.png",
    imageAlt: "Lingeries by Sisioyin home page",
    live: "https://lingeriebysisioyin.store",
    code: "https://github.com/Samson-Eniolorunda/lingerie-by-sisioyin",
    stack: ["JavaScript", "Supabase", "Monnify", "Resend", "PWA"],
    highlights: [
      "Checkout with Moniepoint (Monnify) payments",
      "Email and Google sign-in, order history and tracking",
      "Admin panel with Owner, Super Admin and Editor roles",
    ],
  },
  {
    slug: "documorph",
    name: "DocuMorph",
    tagline: "Privacy-first file tools",
    description:
      "Convert, compress, resize and merge files in the browser with a simple upload, process and download flow.",
    image: "/images/documorph_screenshot.png",
    imageAlt: "DocuMorph file tools",
    live: "https://documorph-blue.vercel.app",
    code: "https://github.com/Samson-Eniolorunda/DocuMorph",
    stack: ["JavaScript", "Vercel Functions", "Vercel Blob", "ConvertAPI"],
    highlights: [
      "Word, Excel, PDF and image conversion",
      "PDF and image compression to a target size",
      "Drag and drop with strict file-type checks",
    ],
  },
];

export const earlier: { name: string; description: string; image: string; live: string; code: string }[] = [
  {
    name: "Footballer portfolio",
    description: "A responsive personal site for a footballer.",
    image: "/images/Lateef_Kazeem_site_screenshot.png",
    live: "https://lateefkazeempro.vercel.app/",
    code: "https://github.com/Samson-Eniolorunda/lateef-kazeem-portfolio",
  },
  {
    name: "Real-time digital clock",
    description: "A clean, lightweight live clock.",
    image: "/images/real_time_digital_clock_screenshot.png",
    live: "https://realtimedigitalclock.vercel.app/",
    code: "https://github.com/Samson-Eniolorunda/DigitalClock",
  },
  {
    name: "Social links profile",
    description: "A fast link-in-bio page.",
    image: "/images/social_links_screenshot.png",
    live: "https://samson-dev-links.vercel.app/",
    code: "https://github.com/Samson-Eniolorunda/social-links-profile",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML and CSS", "Accessibility"] },
  { group: "Backend", items: ["Node.js", "Prisma", "PostgreSQL", "Supabase", "Redis", "REST APIs"] },
  { group: "AI", items: ["Google Gemini", "Prompt design", "AI image generation", "Cost tracking"] },
  { group: "Platform", items: ["Vercel", "Scheduled jobs", "Web push and PWAs", "Payments", "Email (Resend)", "Sentry"] },
  { group: "Workflow", items: ["Git and GitHub", "Playwright testing", "Code review", "Working with AI agents"] },
];
