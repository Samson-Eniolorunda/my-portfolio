// Short technical notes from building and running Vantage Gold.

export interface Note {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO date
  readMinutes: number;
  sections: { heading?: string; paragraphs: string[] }[];
}

export const notes: Note[] = [
  {
    slug: "grading-bets-nobody-types-in",
    title: "Grading bets nobody types in",
    summary:
      "How Vantage Gold settles markets that a final score cannot answer, and why a pick stays open rather than being guessed.",
    date: "2026-11-10",
    readMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Vantage Gold publishes every prediction on a public Trust Ledger, won or lost. That promise only works if results are graded automatically, every day, without anyone typing scores into an admin form. For a simple market such as a home win, the final score is enough. For many of the markets people actually play, it is not.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "Take \"2Up\": the bet wins if a team goes two goals ahead at any point, even if the match ends level. A 2–2 final score tells you nothing; you need the order of the goals. Early goals, half-time results, corners and cards each need a different piece of evidence, and free sports data feeds rarely provide all of it for every league.",
        ],
      },
      {
        heading: "Evidence first, grading second",
        paragraphs: [
          "I split settlement into two steps. The first step collects evidence from several sources in order of trust: stored results from the main sports data provider, a live-score feed, match data that includes goal minutes, and finally a limited number of searched match reports when something is still missing.",
          "The second step is plain code. Each market has a small grading function that takes the evidence and returns won, lost, void or unknown, and every one of those functions is covered by a scripted test. The AI never decides whether a pick won; at most it helps find a fact, such as the minute of a goal.",
        ],
      },
      {
        heading: "Unknown is a valid answer",
        paragraphs: [
          "The most important rule is that the system never guesses. If the evidence for a market is incomplete, the pick stays open and the job tries again later, up to eight times. A slow result is a small inconvenience; a wrong result on a public ledger damages the one thing the product is built on.",
          "The same rule now applies to the celebration posts for big-odds slips: a slip is only announced as a winner when every single game has been graded as won from real evidence.",
        ],
      },
      {
        heading: "What I took from it",
        paragraphs: [
          "Separating \"what happened\" from \"what that means for this bet\" made the system far easier to test and to trust. When a result looks wrong, I can see which source said what, and fix either the evidence or the rule, not both at once.",
        ],
      },
    ],
  },
  {
    slug: "running-a-live-product-on-a-small-budget",
    title: "Running a live product on a small budget",
    summary:
      "Daily API quotas, a database transfer allowance and an AI bill that taught me to put costly features behind a switch.",
    date: "2026-11-10",
    readMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Vantage Gold runs on free and low-cost service plans. That is a real engineering constraint, not a footnote: every page view, scheduled job and AI call has to fit inside limits that I do not control.",
        ],
      },
      {
        heading: "Quotas with a reserve",
        paragraphs: [
          "The free sports data plans allow roughly a hundred calls a day. Predictions, live scores and settlement all compete for that allowance, so each provider has a daily quota tracked in the database, with a reserve kept back for settlement. If the morning jobs use their share, results can still be graded in the evening.",
          "Responses are cached, and each run reads a data set once and shares it, instead of letting every feature fetch the same fixtures again.",
        ],
      },
      {
        heading: "Watching the database transfer",
        paragraphs: [
          "The hosted database has a monthly data-transfer allowance. When usage climbed faster than expected early in a month, I traced it to pages and jobs reading the same rows repeatedly, and added short-lived memoisation so a busy page reads them once.",
        ],
      },
      {
        heading: "An AI bill that changed a default",
        paragraphs: [
          "Grounding AI answers with live web search is billed per query. One month's bill showed that search, not the model itself, was most of the cost. I made search for predictions a switch in the admin panel, off by default, kept a monthly limit for settlement searches, and added a page that shows AI cost by feature, so the next surprise is visible before the invoice.",
        ],
      },
      {
        heading: "Knowing which limits are hard",
        paragraphs: [
          "Some limits are soft and some take the site offline. When the hosting free plan's limits stopped the site, I moved hosting to a paid plan rather than remove features, and kept everything else on free tiers. The scheduler on that plan still runs each job at most once a day, so the few jobs that must run more often are triggered by an external free scheduler.",
          "The lesson I keep is simple: know every limit you depend on, measure it inside your own product, and decide in advance what gives way when one is reached.",
        ],
      },
    ],
  },
  {
    slug: "how-i-build-with-ai-coding-assistants",
    title: "How I build with AI coding assistants",
    summary:
      "An assistant writes much of my code. This is the process that keeps me responsible for all of it.",
    date: "2026-11-10",
    readMinutes: 3,
    sections: [
      {
        paragraphs: [
          "I came to software through a bootcamp and my own products, and I use AI coding assistants such as Claude and GitHub Copilot every day. I say that openly because the interesting question is not whether a developer uses AI, but how the work is controlled so the result can be trusted.",
        ],
      },
      {
        heading: "A written plan and written rules",
        paragraphs: [
          "Each project has a roadmap file with the agreed plan and its progress, and a rules file the assistant reads before it starts. The rules are specific: only curated betting markets, never guess a league identifier, back up before deleting data, and production database changes are run by me, not by the assistant.",
        ],
      },
      {
        heading: "Every change is checked",
        paragraphs: [
          "Before any change is finished it passes the type checker, the linter, scripted tests for market probabilities and team-name matching, and a full production build. For anything visible, I check screenshots at desktop and phone sizes, in light and dark themes.",
          "Nothing is pushed without my approval, and commit messages describe what changed for the people using the product.",
        ],
      },
      {
        heading: "What stays with me",
        paragraphs: [
          "The assistant is fast at writing code. The decisions remain mine: what to build, what a page should say, when a number looks wrong, and when a clever idea is not worth its cost. Running a small business taught me that the details customers notice are rarely the technical ones, and I review the work with that in mind.",
        ],
      },
    ],
  },
];

export const noteBySlug = (slug: string) => notes.find((n) => n.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
