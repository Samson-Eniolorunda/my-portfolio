// Everything the site says lives here, so it can be updated without touching
// the layout. Facts come from each project's repository, its live site and
// the CV. The phone number is deliberately not stored in the code: it appears
// only in the downloadable CV (see the README).

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samsoneniolorunda.vercel.app";

export const profile = {
  name: "Samson Eniolorunda",
  role: "Full-stack developer",
  location: "Lagos, Nigeria",
  email: "eniolorundasamson@gmail.com",
  headline: "I build software, then I keep it running.",
  intro:
    "I design, build and operate complete web products. My main project, Vantage Gold, is a live AI sports-prediction platform I run end to end, from the database and scheduled jobs to the pages people use every day.",
  openTo: "Junior roles, internships and freelance builds",
  cv: "/cv",
  cvPdf: "/Samson-Eniolorunda-CV.pdf",
  social: {
    github: "https://github.com/Samson-Eniolorunda",
    linkedin: "https://linkedin.com/in/samson-eniolorunda",
    x: "https://x.com/s_eniolorunda_",
  },
};

export interface Project {
  slug: string;
  name: string;
  kind: string;
  year?: string;
  summary: string;
  /** What I did, in plain terms. */
  points: string[];
  stack: string[];
  image?: string;
  imageAlt?: string;
  live?: string;
  code?: string;
  /** Shown instead of a code link when the code is not public. */
  note?: string;
}

export const featured = {
  slug: "vantage-gold",
  name: "Vantage Gold",
  kind: "Founder and developer · live product",
  year: "2026 – now",
  tagline: "AI sports predictions with every result graded in public.",
  summary:
    "A live product I designed, built and run on my own: daily predictions across six sports, built from bookmaker odds, team form and weather, with every win and loss graded automatically and published on a public Trust Ledger.",
  image: "/images/projects/vantage-home.png",
  imageAlt: "Vantage Gold home page showing today's free picks",
  live: "https://www.vantagegold.live",
  caseStudy: "/projects/vantage-gold",
  stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Gemini", "Tailwind CSS", "Vercel"],
  stats: [
    { value: "6", label: "sports covered daily" },
    { value: "900+", label: "picks graded in 30 days" },
    { value: "20+", label: "scheduled jobs" },
    { value: "5", label: "social platforms automated" },
  ],
};

export const projects: Project[] = [
  {
    slug: "puredraft-hr",
    name: "PureDraft HR",
    kind: "AI document platform",
    year: "2026",
    summary:
      "An HR workspace that drafts offer letters, formats policies and summarises reports with AI, with more than 31 templates, bulk CSV generation and voice input.",
    points: [
      "Assistant, Builder, Formatter and Summariser in one installable app",
      "Exports to PDF, Word and Excel, with e-signature requests",
      "Document library with tags, version history and an audit log",
    ],
    stack: ["Next.js 15", "TypeScript", "Gemini", "PWA"],
    image: "/images/projects/puredrafthr.png",
    imageAlt: "PureDraft HR assistant screen",
    live: "https://pure-draft-hr.vercel.app",
    note: "Private code",
  },
  {
    slug: "krystal-klean",
    name: "Krystal Klean Solution (UK)",
    kind: "Business automation · client work",
    summary:
      "A booking and revenue tracking system for a UK facilities management company, built on Google Sheets and Google Apps Script so the team could keep working in tools they already knew.",
    points: [
      "Bookings, revenue and outstanding payments tracked in one place",
      "Invoices generated automatically instead of written up one by one",
      "Volunteered after seeing how much administrative time it would save",
    ],
    stack: ["Google Apps Script", "Google Sheets", "JavaScript"],
    note: "Private client system",
  },
  {
    slug: "lingerie-by-sisioyin",
    name: "Lingeries by Sisioyin",
    kind: "E-commerce store",
    year: "2026",
    summary:
      "A complete online shop for a lingerie brand: product catalogue, cart and checkout, customer accounts and an admin panel with roles, on a Supabase backend.",
    points: [
      "Checkout with Moniepoint (Monnify) payments",
      "Email and Google sign-in, order history and tracking",
      "Admin panel with Owner, Super Admin and Editor roles",
    ],
    stack: ["JavaScript", "Supabase", "Monnify", "Resend", "PWA"],
    image: "/images/projects/lingerie.png",
    imageAlt: "Lingeries by Sisioyin home page",
    live: "https://lingeriebysisioyin.store",
    code: "https://github.com/Samson-Eniolorunda/lingerie-by-sisioyin",
  },
  {
    slug: "documorph",
    name: "DocuMorph",
    kind: "File tools",
    year: "2025",
    summary: "Convert, compress, resize and merge files in the browser with a simple upload, process and download flow.",
    points: [
      "Word, Excel, PDF and image conversion",
      "PDF and image compression to a target size",
      "Drag and drop with strict file-type checks",
    ],
    stack: ["JavaScript", "Vercel Functions", "Vercel Blob", "ConvertAPI"],
    image: "/images/documorph_screenshot.png",
    imageAlt: "DocuMorph file tools",
    live: "https://documorph-blue.vercel.app",
    code: "https://github.com/Samson-Eniolorunda/DocuMorph",
  },
];

export const earlier: { name: string; description: string; image: string; live: string; code: string }[] = [
  {
    name: "Player profile site",
    description: "A responsive, search-friendly site for a professional footballer.",
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

/** How I work: shown on the home page and reflected in the CV. */
export const principles = [
  {
    title: "Ship it, then run it",
    text: "A feature is finished when it works in production on a normal day: scheduled jobs succeed, errors are logged and the numbers people see are correct.",
  },
  {
    title: "Honest numbers",
    text: "Vantage Gold publishes every loss alongside every win. I apply the same rule to my own work: what is written here can be checked on the live sites.",
  },
  {
    title: "AI as a tool, with my judgement",
    text: "I build with AI coding assistants such as Claude and GitHub Copilot. I set the plan, review every change, and check it with type checks, tests, builds and screenshots before it ships.",
  },
];

export interface Role {
  org: string;
  title: string;
  place: string;
  dates: string;
  points: string[];
}

export const experience: Role[] = [
  {
    org: "Vantage Gold",
    title: "Founder and developer",
    place: "Lagos · remote",
    dates: "2026 – present",
    points: [
      "Designed, built and operate a live AI sports-prediction platform covering six sports, with 900+ picks graded automatically in its latest 30 days and published on a public ledger.",
      "Run 20+ scheduled jobs for data collection, predictions, settlement, booking codes and posts to five social platforms.",
      "Handle payments, user accounts, an admin panel, monitoring and cost control inside free and low-cost service plans.",
    ],
  },
  {
    org: "Krystal Klean Solution (UK)",
    title: "Volunteer technical consultant",
    place: "Remote",
    dates: "",
    points: [
      "Built a booking and revenue tracking system on Google Sheets and Google Apps Script that generates invoices automatically.",
    ],
  },
  {
    org: "BTB Cooking Gas Solutions",
    title: "Owner and operations manager",
    place: "Lagos",
    dates: "2022 – present",
    points: [
      "Run daily operations: customer orders, inventory, delivery routing and digital records of sales and expenses.",
      "Resolve customer enquiries and operational problems directly, which shapes how I build software for real users.",
    ],
  },
  {
    org: "National Youth Service Corps (NYSC)",
    title: "Corps member",
    place: "Lagos",
    dates: "Jun 2025 – May 2026",
    points: [
      "Completed the one-year national service, handling administrative duties and monthly clearance documentation, while building software in my own time.",
    ],
  },
];

export const education: Role[] = [
  {
    org: "Product Hub Africa",
    title: "Web development bootcamp (ProductLed), certificate",
    place: "Lagos",
    dates: "2025",
    points: ["Front-end fundamentals (HTML, CSS, JavaScript), Git and GitHub, and deployment workflows."],
  },
  {
    org: "Adekunle Ajasin University, Akungba-Akoko",
    title: "B.A. History and International Studies",
    place: "Ondo State",
    dates: "2019 – 2024",
    points: [],
  },
];

/** The CV's skills block (the home page shows each project's own stack instead). */
export const cvSkills: { group: string; items: string }[] = [
  { group: "Languages and frameworks", items: "TypeScript, JavaScript, React, Next.js (App Router), HTML, CSS, Tailwind CSS, Bootstrap" },
  { group: "Data and back end", items: "PostgreSQL, Prisma, Supabase, Redis, REST APIs, scheduled jobs, web push" },
  { group: "AI", items: "Google Gemini (reasoning, structured output, image generation), prompt design, AI cost control" },
  { group: "Tools and platforms", items: "Git and GitHub, Vercel, Sentry, Playwright, Google Apps Script, Chrome DevTools" },
  { group: "AI-assisted development", items: "Daily use of Claude and GitHub Copilot under a written plan, with review and automated checks" },
  { group: "Business", items: "Customer service, order processing, logistics and inventory, from running my own business" },
];
