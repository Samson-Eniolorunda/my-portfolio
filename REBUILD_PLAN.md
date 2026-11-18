# Rebuild Plan: Samson Eniolorunda Portfolio

| | |
| --- | --- |
| Repository | `Samson-Eniolorunda/my-portfolio` |
| Base of the rebuild | **`v2`** (commit `e37b7cb`, 14 November 2026), by the owner's decision |
| Working branch | `rebuild/production`, reset to `origin/v2`; the working tree is `v2` |
| Live site | `main` (commit `111567b`, 21 January 2026) remains the code of the live site |
| Audit date | 18 November 2026 (revised the same day to re-base the plan on `v2`) |
| Status | Audit and plan only. Nothing has been rebuilt. |
| Build order | Fourth of four: after DocuMorph, PureDraft HR and Lingerie by Sisioyin |

**Read this first.**

1. **`v2` is the base.** The owner has decided that the rebuild starts from the `v2` branch, an earlier Next.js rebuild that was published only as a preview and was never merged. This plan was first written against `main`; it has been revised throughout so that `v2` is the starting code, content and design.
2. **`main` remains the live site.** Everything that works on `main` today is still part of the parity checklist (section 2), so nothing the live site does is lost by accident.
3. **Neither `main` nor `v2` is modified.** All work happens on `rebuild/production`. The only file this audit created is `REBUILD_PLAN.md`.
4. **Two figures in `v2` are unconfirmed by the owner** and are treated as unconfirmed everywhere in this plan: the count of external services monitored and the count of past results imported, both on the Vantage Gold case study (`src/app/projects/vantage-gold/page.tsx:27-28`). They, and every other number the code cannot substantiate, are listed in section 9.2 for the owner to confirm or remove. None is presented as a fact in this plan.
5. **Mobile is the priority.** Section 13 is the mobile design and build plan; section 14 lists the gates that must all pass before a pull request is opened.

**Contents.** 1 Product summary · 2 Feature inventory (parity checklist) · 3 Stack · 4 Baseline results · 5 Problems found · 6 Folder structure · 7 Design direction · 8 Rebuild plan · 9 Needed from the owner · 10 Schema changes · 11 Code and design standards · 12 The v2 base: keep or redo · 13 Mobile first (the priority) · 14 Quality gates (must all pass before the PR) · 15 What will make it stand out

---

## 1. Product summary

A personal portfolio for Samson Eniolorunda. Its audience is people deciding whether to hire or commission him: recruiters, engineering leads and prospective clients, who typically arrive from a link shared on LinkedIn, WhatsApp or X, or from his GitHub profile, and who for the most part open that link on a phone.

**The live site (`main`)** is four hand-written static HTML pages (Home, About, Portfolio, Contact) sharing one stylesheet and one script, plus one serverless function that forwards the contact form to Formspree. It describes the owner as "a Lagos-based frontend developer" (`index.html:31` on `main`), shows four small projects and a placeholder card, and has no link-preview metadata.

**The base (`v2`)** is a Next.js 16 application (`package.json:13`) with these routes, all confirmed by a production build during this audit (section 4):

- **Home** (`src/app/page.tsx`): a one-page layout with a hero, "Selected work" (a featured product, four further projects and three earlier builds), "How I work", "Notes", "Experience and education" and "Contact".
- **Two case studies**: Vantage Gold (`src/app/projects/vantage-gold/page.tsx`) and Krystal Klean Solution (`src/app/projects/krystal-klean/page.tsx`).
- **Three notes** (`src/app/notes/[slug]/page.tsx`, content in `src/data/notes.ts`).
- **A CV page** (`src/app/cv/page.tsx`) that prints to one A4 page, with a downloadable PDF (`public/Samson-Eniolorunda-CV.pdf`).
- **A contact endpoint**, `POST /api/contact` (`src/app/api/contact/route.ts`), forwarding to Formspree through the setting `PORTFOLIO_FORMSPREE_ENDPOINT`.
- **Sharing and search assets**: a link-preview image for every page, `sitemap.xml`, `robots.txt`, an SVG icon and an Apple touch icon.
- Light and dark themes (`src/app/globals.css:5-32`), verified in both on every route (section 13.1).

`v2` describes the owner as a "Full-stack developer" (`src/data/site.ts:10`).

**Why a rebuild is still needed.** `v2` is a sound start but is not production-ready by the standard in section 11: it has no tests, no rate limiting on the form, no security headers, link previews that carry the wrong title on four page types, images that are served to phones at desktop sizes, text and tap targets below the mobile minimums, legacy URLs that would break, and figures the owner has not confirmed. Section 12 gives the verdict area by area.

---

## 2. Feature inventory (parity checklist)

**Total: 169 checklist items: 34 marked `main`, 50 marked `both`, 85 marked `v2`.**

- `main`: live on `main` today and absent from `v2`. The rebuild restores it, or the owner confirms that it was dropped on purpose (section 2.12 and questions G1 to G12 in section 9.4).
- `both`: live on `main` and also delivered by `v2`, sometimes in a different form (noted on the item).
- `v2`: real in `v2` and absent from `main`.

Every item must work after the rebuild unless the owner approves its removal in section 9. Evidence for `main` items is given as `path:line` on `main` (read with `git show origin/main:<path>`); evidence for `v2` items is a path in the working tree. Items that carry a number the owner has not confirmed are marked "(figures: section 9.2)"; the feature is kept, the number is not asserted.

### 2.1 Pages and routes (14: 2 `main`, 3 `both`, 9 `v2`)

- [ ] **P1** `both` Home page, served at `/` (`index.html` on `main`; `src/app/page.tsx`).
- [ ] **P2** `main` An "About" destination in the primary navigation (`about.html`). `v2` has no About item; the nearest is "Experience" (`src/components/Nav.tsx:10`).
- [ ] **P3** `both` Project content reachable from the primary navigation (`portfolio.html`; "Work", `Nav.tsx:8`).
- [ ] **P4** `both` Contact content reachable from the primary navigation (`contact.html`; `Nav.tsx:12`).
- [ ] **P5** `main` The four live URLs (`/index.html`, `/about.html`, `/portfolio.html`, `/contact.html`) continue to resolve. On the `v2` build `/index.html` and `/about.html` answer 404 (measured, section 4).
- [ ] **R1** `v2` Vantage Gold case study at `/projects/vantage-gold`.
- [ ] **R2** `v2` Krystal Klean case study at `/projects/krystal-klean`.
- [ ] **R3** `v2` Three notes at `/notes/<slug>`, generated from `src/data/notes.ts:12-129` (`src/app/notes/[slug]/page.tsx:10-12`).
- [ ] **R4** `v2` CV page at `/cv`.
- [ ] **R5** `v2` `POST /api/contact` (`src/app/api/contact/route.ts:15`).
- [ ] **R6** `v2` `/sitemap.xml` (`src/app/sitemap.ts`).
- [ ] **R7** `v2` `/robots.txt` (`src/app/robots.ts`).
- [ ] **R8** `v2` A 1200 × 630 link-preview image for the home page, the CV, each case study and each note: seven images (`src/app/opengraph-image.tsx`, `src/app/cv/opengraph-image.tsx`, `src/app/projects/*/opengraph-image.tsx`, `src/app/notes/[slug]/opengraph-image.tsx`).
- [ ] **R9** `v2` An unknown note address answers 404 rather than rendering an empty page (`src/app/notes/[slug]/page.tsx:8`, `28`).

### 2.2 Global shell (34: 9 `main`, 15 `both`, 10 `v2`)

- [ ] **G1** `both` Header brand text "Samson Eniolorunda" linking to the home page (`index.html:79-81`; `Nav.tsx:59-61`).
- [ ] **G2** `both` Primary navigation. `main`: Home, About, Portfolio, Contact (`index.html:84-89`). `v2`: Work, Notes, Experience, CV, Contact (`Nav.tsx:7-13`).
- [ ] **G3** `main` The current destination is visibly marked as active (`index.html:85`, `styles.css:230-238`). `v2` marks nothing (`Nav.tsx:63-67`).
- [ ] **G4** `both` Theme toggle switching light and dark, the icon changing between moon and sun (`script.js:119-127`; `Nav.tsx:23-45`).
- [ ] **G5** `both` With no stored choice, the theme follows the device setting (`script.js:130-133`; `src/app/layout.tsx:32`).
- [ ] **G6** `both` A manual theme choice persists. `main` keeps it for the browser session (`script.js:148`); `v2` keeps it permanently (`Nav.tsx:30`). The rebuild keeps the `v2` behaviour.
- [ ] **G7** `main` A change of device theme while the site is open is applied immediately (`script.js:136-140`). `v2` reads the device setting only at load.
- [ ] **G8** `both` Below 768 px, navigation collapses behind a menu button whose icon changes between bars and a cross (`script.js:162-168`; `Nav.tsx:71-80`).
- [ ] **G9** `both` The menu button exposes `aria-expanded` and an "Open menu" / "Close menu" label (`script.js:171-172`; `Nav.tsx:74-76`).
- [ ] **G10** `both` The menu closes when a navigation link is chosen (`script.js:190-192`; `Nav.tsx:86`).
- [ ] **G11** `both` The menu closes on Escape (`script.js:195-199`; `Nav.tsx:49-54`).
- [ ] **G12** `main` The menu closes on a tap outside it (`script.js:202-217`).
- [ ] **G13** `main` The menu closes and scrolling is restored when the viewport grows beyond 768 px (`script.js:220-228`).
- [ ] **G14** `main` Page scrolling is locked while the mobile menu is open (`script.js:175-177`).
- [ ] **G15** `both` The header stays at the top of the viewport while scrolling (`styles.css:182-191`; `Nav.tsx:57`).
- [ ] **G16** `both` Footer copyright line with the year kept current. `main`: "© {year} Samson Eniolorunda. All rights reserved." (`index.html:207-209`). `v2`: "© {year} Samson Eniolorunda · Lagos, Nigeria" (`src/components/Footer.tsx:9`).
- [ ] **G17** `both` Footer links to LinkedIn, GitHub and X, opening in a new tab (`index.html:211-229`; `src/components/SocialLinks.tsx:19-38`).
- [ ] **G18** `main` Floating "scroll to top" button, shown while scrolling up once more than 50 px down the page (`script.js:79-88`, `93-97`).
- [ ] **G19** `main` Floating "scroll to bottom" button, shown while scrolling down unless within 50 px of the end (`script.js:70-78`, `99-103`).
- [ ] **G20** `main` Both scroll buttons scroll smoothly (`script.js:95`, `101`).
- [ ] **G21** `main` Accent-coloured scrollbar thumb that appears only while scrolling, WebKit only (`styles.css:842-864`, `script.js:63-68`).
- [ ] **G22** `both` A favicon (`index.html:44`; `src/app/icon.svg`).
- [ ] **G23** `both` A distinct title, description and author for each page (`index.html:29-41` and equivalents; `layout.tsx:14-21` and each page's `metadata`). `main` also states `robots: index, follow` explicitly; `v2` relies on the default.
- [ ] **G24** `both` No horizontal scrolling down to 360 px (confirmed on `main` in the first audit; confirmed on `v2` at 360, 390, 430 and 1280 px in both themes on six routes, section 13.1).
- [ ] **X1** `v2` "Skip to content" link as the first focusable element (`layout.tsx:41-46`).
- [ ] **X2** `v2` Navigation inside a labelled `<nav>` landmark (`Nav.tsx:58`).
- [ ] **X3** `v2` The theme is applied before first paint, so there is no flash of the wrong theme (`layout.tsx:30-32`, `38`).
- [ ] **X4** `v2` Browser theme colour for both colour schemes (`layout.tsx:23-28`).
- [ ] **X5** `v2` Document language `en-GB` (`layout.tsx:36`).
- [ ] **X6** `v2` Apple touch icon, 180 × 180 (`src/app/apple-icon.png`).
- [ ] **X7** `v2` In-page links land below the sticky header, not under it (`globals.css:53`; `cv/page.tsx:19`).
- [ ] **X8** `v2` Sections move up slightly as they enter the viewport, only for visitors who have not asked for reduced motion, and content is never hidden (`globals.css:99-118`). (change proposed: section 7.6)
- [ ] **X9** `v2` Print styles: white paper, black ink, header, footer and toolbars removed (`globals.css:120-143`; `Nav.tsx:57`; `Footer.tsx:6`).
- [ ] **X10** `v2` Location shown in the footer (`Footer.tsx:9`).

### 2.3 Home (24: 5 `main`, 2 `both`, 17 `v2`)

- [ ] **H1** `both` Profile photograph (`index.html:116-120`; `page.tsx:115-124`). In `v2` it is hidden below 768 px (`page.tsx:115`), so phone visitors never see it.
- [ ] **H2** `main` Level-one heading containing the owner's full name (`index.html:123`). In `v2` the h1 is the headline and the name appears only in the header (`page.tsx:102-104`).
- [ ] **H3** `main` Role line cycling through three labels with a typewriter effect (`index.html:126`, `script.js:25-29`, `232-250`).
- [ ] **H4** `both` Call to action to the work (`index.html:130`; `page.tsx:107-109`).
- [ ] **H5** `main` Call to action to contact in the opening screen (`index.html:131`). `v2`'s second hero action is "Download CV" (`page.tsx:110-112`).
- [ ] **H6** `main` Tech stack group "Languages": HTML 5, CSS 3, JavaScript (ES6+), Bootstrap (`index.html:148-161`).
- [ ] **H7** `main` Tech stack group "Tools": VS Code, Git, GitHub, Vercel (`index.html:164-183`). `v2` lists skills only on the CV (`site.ts:247-255`); VS Code appears nowhere.
- [ ] **HV1** `v2` Label above the headline: role and location with a status dot (`page.tsx:99-101`).
- [ ] **HV2** `v2` Headline "I build software, then I keep it running." (`page.tsx:102-104`).
- [ ] **HV3** `v2` Introductory paragraph (`page.tsx:105`, text at `site.ts:14-15`).
- [ ] **HV4** `v2` "Download CV" action in the hero (`page.tsx:110-112`).
- [ ] **HV5** `v2` Facts strip: Now, Based in, Open to, Core stack, with an "All skills" link to `/cv#skills` (`page.tsx:11-16`, `126-140`).
- [ ] **HV6** `v2` Featured product block for Vantage Gold: screenshot linking to the case study, tagline, summary, four statistics, stack, "Read the case study" and "Visit the site" (`page.tsx:147-182`). (figures: section 9.2)
- [ ] **HV7** `v2` Project row: PureDraft HR, with summary, three points, stack, live link and "Private code" note (`site.ts:66-83`, `page.tsx:18-66`).
- [ ] **HV8** `v2` Project row: Krystal Klean Solution (UK), with a drawn illustration in place of a screenshot and a link to its case study (`site.ts:84-98`, `page.tsx:57-63`).
- [ ] **HV9** `v2` Project row: Lingeries by Sisioyin, with live and code links (`site.ts:100-117`).
- [ ] **HV10** `v2` Each project row is numbered and shows kind, year, summary, three points and its own stack (`page.tsx:20-37`).
- [ ] **HV11** `v2` "How I work": three principles (`page.tsx:211-222`, `site.ts:163-176`).
- [ ] **HV12** `v2` Notes list: date, title, summary and reading time for each note, linking to the note (`page.tsx:225-243`).
- [ ] **HV13** `v2` Experience timeline: four roles with dates and points (`page.tsx:266-269`, `site.ts:186-227`). (figures: section 9.2)
- [ ] **HV14** `v2` Two biography paragraphs and a "View the CV" action (`page.tsx:249-263`).
- [ ] **HV15** `v2` Contact introduction stating what the owner is open to and a reply time (`page.tsx:283`). (figures: section 9.2)
- [ ] **HV16** `v2` The email address as a large link (`page.tsx:284-286`).
- [ ] **HV17** `v2` Section headings numbered 01 to 05 with a short label and a serif title (`src/components/ui.tsx:4-17`).

### 2.4 About (6: 5 `main`, 1 `both`)

- [ ] **A1** `main` "About Me" heading (`about.html:100`).
- [ ] **A2** `main` Profile photograph beside the biography (`about.html:108-112`).
- [ ] **A3** `main` Biography paragraph 1 as written on `main` (`about.html:115-123`). `v2` replaces it with new text (`page.tsx:250-253`).
- [ ] **A4** `main` Biography paragraph 2 as written on `main` (`about.html:125-129`). `v2` replaces it (`page.tsx:254-258`).
- [ ] **A5** `both` Education, two entries (`about.html:136-144`; `site.ts:229-244`, `page.tsx:270-273`). `v2` adds the university and dates.
- [ ] **A6** `main` Interests list, four entries (`about.html:147-155`).

### 2.5 Projects (11: 4 `main`, 7 `both`)

- [ ] **W1** `both` A heading for the work (`portfolio.html:106-110`; `page.tsx:145`).
- [ ] **W2** `main` Filter control with All, Web and Apps (`portfolio.html:116-120`, `script.js:263-265`).
- [ ] **W3** `main` Choosing a filter shows matching projects and hides the rest (`script.js:267-285`).
- [ ] **W4** `main` An empty-state message when a filter matches nothing (`portfolio.html:344`, `script.js:288`).
- [ ] **W5** `both` Footballer's site: screenshot, description, live link (`portfolio.html:127-169`; `site.ts:139-145`). `main` also shows a GitHub link.
- [ ] **W6** `both` Real-time digital clock: screenshot, description, live link (`portfolio.html:172-214`; `site.ts:146-152`). `main` also shows a GitHub link.
- [ ] **W7** `both` Social links profile: screenshot, description, live link (`portfolio.html:217-255`; `site.ts:153-159`). `main` also shows a GitHub link. In `v2` the three code addresses exist in the data (`site.ts:144`, `151`, `158`) but are never rendered (`page.tsx:193-205`).
- [ ] **W8** `both` DocuMorph: screenshot, description, live link, GitHub link (`portfolio.html:258-300`; `site.ts:118-135`).
- [ ] **W9** `main` "New App Launching Soon" placeholder card (`portfolio.html:303-337`).
- [ ] **W10** `both` Technologies named on each project (`portfolio.html:141-151`; `ui.tsx:39-46`). In `v2` the three earlier builds carry no technologies.
- [ ] **W11** `both` Live and code links open in a new tab (`portfolio.html:155-166`; `page.tsx:45`, `50`, with `rel="noopener noreferrer"`).

### 2.6 Case study: Vantage Gold (12 `v2`)

- [ ] **VG1** `v2` Back link, title, tagline, summary and a link to the live product (`vantage-gold/page.tsx:108-121`).
- [ ] **VG2** `v2` Facts strip: Role, Timeline, Scope, Way of working (`page.tsx:16-21`, `122-129`).
- [ ] **VG3** `v2` Opening screenshot with a caption (`page.tsx:132`, `86-93`).
- [ ] **VG4** `v2` "Problem" section (`page.tsx:134-147`).
- [ ] **VG5** `v2` "How it works": four steps (`page.tsx:32-37`, `149-160`). (figures: section 9.2)
- [ ] **VG6** `v2` "Numbers": a grid of six figures (`page.tsx:23-30`, `162-172`). (figures: section 9.2; two of the six are the figures the owner has said are unconfirmed)
- [ ] **VG7** `v2` Two screenshots: predictions and the public ledger (`page.tsx:174-177`).
- [ ] **VG8** `v2` "Decisions": five decisions, each with its trade-off and, for two, a link to a note (`page.tsx:39-67`, `179-201`). (figures: section 9.2)
- [ ] **VG9** `v2` "Scope": eight features and the stack (`page.tsx:69-78`, `203-214`).
- [ ] **VG10** `v2` Two screenshots: Long Shots and the product on a phone (`page.tsx:216-219`).
- [ ] **VG11** `v2` "Reflection": three things the owner would do differently (`page.tsx:80-84`, `221-231`).
- [ ] **VG12** `v2` Closing paragraph, related notes and two actions (`page.tsx:233-260`).

### 2.7 Case study: Krystal Klean (8 `v2`)

- [ ] **KK1** `v2` Back link, title, standfirst, summary and facts strip: Client, Engagement, Role, Delivered (`krystal-klean/page.tsx:89-106`). (figures: section 9.2)
- [ ] **KK2** `v2` A drawn spreadsheet labelled "Illustration · system is private" (`page.tsx:108-110`; `src/components/SheetSketch.tsx`).
- [ ] **KK3** `v2` "Problem" section (`page.tsx:112-125`).
- [ ] **KK4** `v2` "How it works": four steps (`page.tsx:31-36`, `127-138`).
- [ ] **KK5** `v2` "Numbers": four figures (`page.tsx:24-29`, `140-150`). (figures: section 9.2)
- [ ] **KK6** `v2` "Scope": eight modules and the stack (`page.tsx:38-47`, `152-163`). (figures: section 9.2)
- [ ] **KK7** `v2` "Decisions": five decisions with trade-offs (`page.tsx:49-75`, `165-182`).
- [ ] **KK8** `v2` Closing statement that the system is private, and two actions (`page.tsx:184-195`).

### 2.8 Notes (5 `v2`)

- [ ] **NT1** `v2` Back link, label with date and reading time, title and summary (`notes/[slug]/page.tsx:33-45`).
- [ ] **NT2** `v2` Body in headed sections of paragraphs (`page.tsx:47-56`; `globals.css:84-96`).
- [ ] **NT3** `v2` Author line linking to the Vantage Gold case study (`page.tsx:58-65`).
- [ ] **NT4** `v2` "More notes" list of the other notes (`page.tsx:66-76`).
- [ ] **NT5** `v2` Each note has its own title, description, canonical address and article metadata (`page.tsx:14-24`).

### 2.9 CV (10 `v2`)

- [ ] **CVP1** `v2` Toolbar with "Print" and "Download PDF", not printed (`cv/page.tsx:33-45`; `src/components/PrintButton.tsx`).
- [ ] **CVP2** `v2` Header: name, role and a contact line of location, email, GitHub, site address and LinkedIn (`cv/page.tsx:28`, `47-58`).
- [ ] **CVP3** `v2` Summary (`cv/page.tsx:12-13`, `60-61`).
- [ ] **CVP4** `v2` Experience: four roles (`cv/page.tsx:63-79`). (figures: section 9.2)
- [ ] **CVP5** `v2` Selected projects: four entries (`cv/page.tsx:29`, `81-91`). (figures: section 9.2)
- [ ] **CVP6** `v2` Skills in seven groups, addressable as `/cv#skills` (`cv/page.tsx:93-101`; `site.ts:247-255`).
- [ ] **CVP7** `v2` Education: two entries (`cv/page.tsx:103-114`).
- [ ] **CVP8** `v2` The page prints to one A4 sheet (`globals.css:133-139`; the tracked PDF is one A4 page, checked with `pdfinfo`).
- [ ] **CVP9** `v2` A downloadable PDF of the CV (`public/Samson-Eniolorunda-CV.pdf`, linked at `page.tsx:110` and `cv/page.tsx:37-43`).
- [ ] **CVP10** `v2` The telephone number is not in the code and not on any web page; it is read only from the local setting `CV_PHONE` when the PDF is made (`site.ts:3-4`, `cv/page.tsx:26-27`, `README.md:24`). See problem VP1 in section 5.3.

### 2.10 Contact (25: 6 `main`, 12 `both`, 7 `v2`)

- [ ] **C1** `both` A heading for the contact section (`contact.html:114-118`; `page.tsx:280`).
- [ ] **C2** `both` Email link (`contact.html:124-131`; `page.tsx:284-286`). The two branches show different addresses (question Q3).
- [ ] **C3** `both` LinkedIn link (`contact.html:133-141`; `SocialLinks.tsx`).
- [ ] **C4** `both` GitHub link (`contact.html:143-151`; `SocialLinks.tsx`).
- [ ] **C5** `both` X link (`contact.html:153-161`; `SocialLinks.tsx`).
- [ ] **C6** `both` Form with labelled, required Name, Email and Message fields and placeholders (`contact.html:183-215`; `src/components/ContactForm.tsx:50-64`).
- [ ] **C7** `both` Hidden honeypot field `company`; when filled, the visitor sees success and nothing is sent (`contact.html:172-180`, `script.js:371-387`; `ContactForm.tsx:66`, `route.ts:24`).
- [ ] **C8** `main` A written "Missing Fields" message when a field is blank (`script.js:390-402`). `v2` relies on the browser's own required-field prompt.
- [ ] **C9** `both` Submit button disabled and relabelled while sending (`script.js:405-408`; `ContactForm.tsx:72-79`).
- [ ] **C10** `both` Status announced to assistive technology (`contact.html:218`, `script.js:311-315`; `ContactForm.tsx:68`). In `v2` only the error is announced; success is not.
- [ ] **C11** `both` Submission is a JSON `POST` to the site's own API (`script.js:412-428`; `ContactForm.tsx:22-26`). The path differs: `/api/form` on `main`, `/api/contact` on `v2`.
- [ ] **C12** `both` On success the form is cleared and a confirmation is shown (`script.js:446-453`; `ContactForm.tsx:29-30`, `37-47`).
- [ ] **C13** `both` On a failed response an error is shown and the entered text is kept (`script.js:432-443`; `ContactForm.tsx:28`, `31-34`).
- [ ] **C14** `main` A distinct "Network Error" message when the request cannot be made (`script.js:454-463`). `v2` shows the browser's own error text (problem VB1).
- [ ] **C15** `main` The confirmation dialog closes from its Close button (`script.js:353-355`).
- [ ] **C16** `main` The dialog closes on a backdrop click (`contact.html:267`).
- [ ] **C17** `main` The dialog closes on Escape (`script.js:358-362`).
- [ ] **C18** `main` Opening the dialog moves focus to Close and locks background scrolling (`script.js:333-337`, `347`).
- [ ] **CF1** `v2` The honeypot is checked on the server (`route.ts:23-24`).
- [ ] **CF2** `v2` The server checks the email format, requires a message of at least five characters and caps field lengths (`route.ts:13`, `20-27`).
- [ ] **CF3** `v2` The visitor's address is passed to Formspree as the reply-to address (`route.ts:32`).
- [ ] **CF4** `v2` Name and email fields carry `autocomplete` values (`ContactForm.tsx:54`, `58`).
- [ ] **CF5** `v2` "Send another message" returns from the confirmation to the form (`ContactForm.tsx:42-44`).
- [ ] **CF6** `v2` Every error message ends by offering email as an alternative (`ContactForm.tsx:67-71`).
- [ ] **CF7** `v2` An upstream failure is reported as 502 with a plain message, not relayed (`route.ts:33-34`).

### 2.11 API, SEO and integrations (20: 3 `main`, 10 `both`, 7 `v2`)

- [ ] **S1** `main` `POST /api/form` accepts a JSON body (`api/form.js:27`, `59`). On the `v2` build `/api/form` answers 404 (measured).
- [ ] **S2** `main` `OPTIONS` answers 200 with permissive CORS headers (`api/form.js:29-36`). (change proposed: question G11)
- [ ] **S3** `both` Any other method answers 405 (`api/form.js:38-42`; `GET /api/contact` answered 405 on the `v2` build, measured).
- [ ] **S4** `both` A missing endpoint setting answers 500 with a JSON error (`api/form.js:47-56`; `route.ts:16-17`, measured).
- [ ] **S5** `both` `name`, `email` and `message` are trimmed and required; otherwise 400 with a JSON error (`api/form.js:62-72`; `route.ts:20-27`).
- [ ] **S6** `both` The message is forwarded to Formspree as JSON (`api/form.js:74-88`; `route.ts:29-33`). `main` also forwards a timestamp; `v2` does not.
- [ ] **S7** `both` The endpoint setting may be a full Formspree address or a bare form id (`api/form.js:14-19`; `route.ts:7-11`).
- [ ] **S8** `both` The response is JSON and is not cached (`api/form.js:90-103`; `route.ts:35`). In `v2` only the success response carries `Cache-Control: no-store`.
- [ ] **S9** `main` Unexpected failures are logged on the server (`api/form.js:104-109`). `v2` logs nothing.
- [ ] **I1** `both` Formspree receives contact messages (`api/form.js:6`, `17`; `route.ts:10`).
- [ ] **I2** `both` Vercel hosting with one server function (`api/form.js:2`; `README.md:31`).
- [ ] **I3** `both` Web fonts (`index.html:51-54`; `layout.tsx:8-10`).
- [ ] **I4** `both` Iconography for controls and social links (`index.html:57-66`; `lucide-react` in `Nav.tsx:5` and others, inline brand marks in `SocialLinks.tsx:4-17`).
- [ ] **M1** `v2` A site address used to build absolute URLs, and a title template (`layout.tsx:15-16`).
- [ ] **M2** `v2` Open Graph and X card tags with a large image on every page (`layout.tsx:19-20`; confirmed in the built HTML).
- [ ] **M3** `v2` Canonical address on the CV, the case studies and the notes (`cv/page.tsx:9`, `vantage-gold/page.tsx:13`, `krystal-klean/page.tsx:14`, `notes/[slug]/page.tsx:20`). The home page has none.
- [ ] **M4** `v2` The sitemap lists the home page, both case studies, the CV and every note (`sitemap.ts:6-12`).
- [ ] **M5** `v2` `robots.txt` allows everything except `/api/` and names the sitemap (`robots.ts:5`).
- [ ] **I5** `v2` Fonts are self-hosted at build time through `next/font` (`layout.tsx:2`, `8-10`).
- [ ] **I6** `v2` Images are served through `next/image` (`page.tsx:59`, `116-123`, `149-155`, `196`; `vantage-gold/page.tsx:89`).

### 2.12 Live on `main` but missing in `v2` (34 items, plus partial losses)

Each line needs one of two outcomes: the rebuild restores it, or the owner confirms it was dropped on purpose. The recommendation and the matching question in section 9.4 are given.

| Items | What is missing | Recommendation | Question |
| --- | --- | --- | --- |
| P5 | The four `.html` addresses answer 404 | **Restore** as permanent redirects (not optional: live links and search results point at them) | none |
| P2, A1 to A4, A6 | An About destination; the biography as written on `main`; the photograph beside it; the Interests list | Restore an "About" section and navigation item holding the `v2` biography, the portrait and, if wanted, the interests | G1 |
| G3 | Active navigation state | **Restore** (`aria-current` and a visible mark) | none |
| G7 | Following a live change of device theme | **Restore** when no manual choice is stored | none |
| G12, G13, G14 | Menu closes on an outside tap and on resize; scroll lock while open | **Restore** as part of the new mobile menu (section 13.3) | none |
| G18, G19, G20 | Scroll-to-top and scroll-to-bottom buttons | Restore "back to top" on long pages; retire "scroll to bottom" | G2 |
| G21 | Scrollbar thumb visible only while scrolling | Retire; use the standard scrollbar tinted to the theme | G3 |
| H2 | The owner's name inside the h1 | Keep the `v2` headline as the h1 and place the name directly above it as visible text; the name remains in the title and structured data | G4 |
| H3 | Typewriter role line | Retire (`v2` already replaced it with a static label) | G5 |
| H5 | A contact action in the opening screen | **Restore**: on a phone, contact must be reachable without scrolling the whole page (section 13.3) | none |
| H6, H7 | The Tech Stack block on the home page | Keep `v2`'s approach (stack per project, full list on the CV); confirm VS Code and Bootstrap are not wanted on the home page | G6 |
| W2, W3, W4 | Project filter and its empty state | Retire: with a featured product, four rows and three earlier builds, a filter adds a control without helping anyone find anything | G7 |
| W9 | "New App Launching Soon" placeholder card | Retire | G8 |
| C8, C14 | Written "missing fields" and "network error" messages | **Restore** as inline validation and a distinct offline message (section 13.6) | none |
| C15 to C18 | Confirmation dialog | Keep `v2`'s inline confirmation, made accessible (announced, focus moved); no dialog | G9 |
| S1 | The `/api/form` path | Retire in favour of `/api/contact`; the only caller is the site's own form | G10 |
| S2 | Permissive CORS on the endpoint | Retire; same-origin only | G11 |
| S9 | Server-side logging of failures | **Restore** as structured logging without message content | none |

Partial losses inside items marked `both`: the portrait is hidden on phones (H1); the footer no longer says "All rights reserved." (G16, question G12); the three earlier builds have lost their GitHub links and technology labels (W5 to W7, W10: restore, the data already exists at `site.ts:144`, `151`, `158`); success is no longer announced to assistive technology (C10: restore); non-success API responses are cacheable and no timestamp is forwarded (S8, S6: restore the header, add a server timestamp); `robots: index, follow` is implicit (G23: state it).

### 2.13 How the contact form works in `v2` (reference)

1. `ContactForm.tsx:50` renders the form; `onSubmit` (`ContactForm.tsx:15-35`) collects every named field, including the hidden `company`, and sends `POST /api/contact` with a JSON body.
2. `route.ts:7-11` reads **one environment variable, `PORTFOLIO_FORMSPREE_ENDPOINT`**, accepting a full address or a bare form id. If it is empty the handler answers 500 "The contact form is not set up yet." (`route.ts:17`). This was observed during the audit, where no setting exists.
3. The body is parsed; a parse failure becomes an empty object (`route.ts:19`). Name, email and message are coerced to strings, trimmed and cut to 120, 200 and 5,000 characters (`route.ts:20-22`).
4. If `company` has a value the handler answers `{ ok: true }` without forwarding (`route.ts:24`).
5. If the name is empty, the email fails a simple pattern, or the message is shorter than five characters, it answers 400 (`route.ts:25-27`).
6. Otherwise it posts `name`, `email`, `message`, `source` and `_replyto` to Formspree (`route.ts:29-33`). A network failure or a non-2xx answer becomes 502 "The message could not be sent." (`route.ts:34`).
7. On success the browser replaces the form with a confirmation panel (`ContactForm.tsx:37-47`).

No form was submitted and no live service was called during this audit. On `main` the equivalent endpoint is `api/form.js`, a CommonJS Vercel function at `/api/form` that reads the same environment variable (`api/form.js:45` on `main`), sends `Access-Control-Allow-Origin: *` (`api/form.js:29`), requires only that the three fields are non-empty (`api/form.js:62-72`) and relays Formspree's status and body to the browser (`api/form.js:90-103`); its honeypot is checked only in the browser (`script.js:371-387`).

---

## 3. Current stack and recommendation

### 3.1 The stack of the base (`v2`)

| Layer | In `v2` | Evidence |
| --- | --- | --- |
| Framework | Next.js 16.4.6, App Router, Turbopack build | `package.json:13`; build output, section 4 |
| UI | React 19.3.0 | `package.json:14-15` |
| Language | TypeScript `^5` (5.9.3 installed), `strict: true` | `package.json:25`, `tsconfig.json:7` |
| Styling | Tailwind CSS 4.3.3 through the `@tailwindcss/turbopack` loader; tokens as CSS custom properties mapped with `@theme inline` | `package.json:18`, `24`; `next.config.ts:5-12`; `globals.css:5-49` |
| Fonts | Geist, Geist Mono and Instrument Serif through `next/font/google`; a second copy of Instrument Serif as a `.ttf` for the share images | `layout.tsx:2`, `8-10`; `src/lib/og.tsx:15-18` |
| Icons | `lucide-react ^0.468.0`, plus three brand marks written inline as SVG paths | `package.json:12`; `SocialLinks.tsx:4-17` |
| Content | Two typed modules, with further copy inside page files | `src/data/site.ts`, `src/data/notes.ts`; section 5.1, VS2 |
| Server | One route handler | `src/app/api/contact/route.ts` |
| Lint | ESLint `^9` (9.39.5 installed) with `eslint-config-next` 16.4.6 | `package.json:22-23`, `eslint.config.mjs` |
| Tests, formatter, CI | None | `package.json:5-10` has `dev`, `build`, `start`, `lint` only |
| Hosting | Vercel | `README.md:31` |

For reference, `main` is four HTML files, one 1,306-line stylesheet, one 472-line script and one CommonJS function, with no manifest or tooling (`git ls-tree -r origin/main`: 18 files).

### 3.2 Framework decision

**Keep Next.js (App Router) with TypeScript in strict mode, statically generated.** The first version of this plan recommended exactly this move away from hand-written HTML; `v2` has already made it and the owner has chosen `v2` as the base, so the question is settled. The reasons still hold: typed content in one place, shared layout, per-page metadata and share images, responsive images, and one framework across the owner's projects. Every page is static; only `/api/contact` runs on demand (build output, section 4).

Astro and "static HTML with a typed build step" were considered in the first version of this plan and rejected; with `v2` as the base neither is reopened.

### 3.3 Target versions

Checked against the npm registry on 18 November 2026 (`npm view <package> version` in the first audit; `npm outdated` on `v2` in this one agrees on every package it lists).

| Tool | In `v2` | Target | Note |
| --- | --- | --- | --- |
| Node.js | not declared | 24 LTS on Vercel, `engines` and `.nvmrc` added | Audit machine: 22.23.5 |
| next | 16.4.6 | 16.4.6 | Already current |
| react, react-dom | 19.3.0 | 19.3.1 | |
| typescript | `^5` (5.9.3) | **6.0.3** | Registry latest is 7.0.2, but `typescript-eslint` 8.73.0 declares `typescript >=4.8.4 <6.1.0`. Move to 7.x when the lint toolchain supports it; do not override the peer range. |
| tailwindcss | 4.3.3 | 4.3.5 | |
| Tailwind integration | `@tailwindcss/turbopack` 4.3.3 | **Decide in phase 0** | The documentation bundled with this Next version describes `@tailwindcss/postcss` as the Tailwind set-up (`node_modules/next/dist/docs/01-app/01-getting-started/11-css.md:31-51`) and does not mention the Turbopack loader. The loader works (the build passes). Default: move to the documented `@tailwindcss/postcss` unless a measured build-time or output difference favours the loader; either way there is one integration, pinned. |
| eslint | `^9` (9.39.5) | **9.39.5** | Registry latest is 10.15.0, but plugins pulled in by `eslint-config-next` support only up to ESLint 9. npm prints a deprecation warning for 9.39.5 on install; accepted until the plugins move. |
| eslint-config-next | 16.4.6 | 16.4.6 | |
| typescript-eslint | transitive | 8.73.0, `strictTypeChecked` | |
| prettier | absent | 3.10.1 | |
| zod | absent | 4.6.7 | Form and environment validation |
| lucide-react | `^0.468.0` | 1.75.0 | Major version change; icon names re-checked in phase 1 |
| vitest | absent | 5.1.1 | |
| @playwright/test | absent | 1.65.1 | Also drives the CV PDF |
| @types/node | `^20` | 24.19.2 | Matches Node 24 |
| @types/react, @types/react-dom | `^19` | 19.3.0 | |

Dependencies are pinned to exact versions with the lockfile committed. `v2` uses caret ranges for six packages (`package.json:12`, `19-22`, `25`).

### 3.4 Keep, upgrade, replace (summary; the evidence is in section 12)

| Item | Decision |
| --- | --- |
| Next.js App Router, React, Tailwind 4, `next/font`, `next/image`, Lucide | Keep, upgrade to the targets above |
| Vercel, Formspree, `PORTFOLIO_FORMSPREE_ENDPOINT` | Keep |
| `/api/contact` | Keep the path; rewrite the handler with zod, an origin check, rate limiting and logging |
| `src/data/*.ts` content modules | Keep and extend until they hold every string on the site |
| The two hand-written case-study pages | Replace with one template driven by typed content |
| Paper-and-ink identity, vermilion accent, Instrument Serif with Geist | Keep, with corrected contrast, sizes and tap targets |
| Manual "print to PDF" for the CV | Replace with a scripted, local-only generator |
| Share-image generator | Keep, remove the hard-coded address and the lint suppression |
| Inline brand SVG paths | Replace with words (section 7.7) |

---

## 4. Baseline results

### 4.1 `v2` (the baseline for this rebuild)

Run on 18 November 2026 in `/home/user/my-portfolio` on `rebuild/production` at `e37b7cb`. Node 22.23.5, npm 10.9.9. No `.env` file exists or was created, so `PORTFOLIO_FORMSPREE_ENDPOINT`, `NEXT_PUBLIC_SITE_URL` and `CV_PHONE` were all unset. Nothing that failed or warned was fixed.

| Check | Command | Result |
| --- | --- | --- |
| Install | `npm ci` | **Pass.** 361 packages added in 50 s. One deprecation warning: `eslint@9.39.5: This version is no longer supported.` |
| Production build | `npm run build` (`next build`, Turbopack) | **Pass.** 0 errors, 0 warnings. Compiled in 6.9 s; TypeScript step 4.2 s; 21 static pages generated; total 14.3 s. |
| Lint | `npm run lint` (`eslint`) | **Pass.** 0 errors, 0 warnings. One rule is suppressed in source (`src/lib/og.tsx:40`). |
| Type check | No script exists. `npx tsc --noEmit` | **Pass.** 0 errors. |
| Tests | No test script, no test files, no test runner installed | **None exist.** |
| `npm audit` | `npm audit` | 15 vulnerabilities (6 moderate, 9 high), all in the lint toolchain beneath `eslint-config-next` (`minimatch`, `picomatch` and their dependants). `npm audit --omit=dev`: **0 vulnerabilities**. |
| `npm outdated` | `npm outdated` | 8 packages behind: `@tailwindcss/turbopack` and `tailwindcss` 4.3.3 → 4.3.5, `react` and `react-dom` 19.3.0 → 19.3.1, `lucide-react` 0.468.0 → 1.75.0, `eslint` 9.39.5 → 10.15.0, `typescript` 5.9.3 → 7.0.2, `@types/node` 20.19.43 → 26.6.6. |
| Tracked files after the build | `git status --porcelain` | Clean. The build did not rewrite `AGENTS.md` or the CV PDF; nothing needed restoring. `node_modules`, `.next` and `next-env.d.ts` are git-ignored (`.gitignore:4`, `17`, `41`). |
| Secrets in tracked source | read of all 49 files | No secret value in source. See VP2 in section 5.3 for the telephone number inside the tracked PDF. |

Build output (routes): `/`, `/_not-found`, `/cv`, `/projects/krystal-klean`, `/projects/vantage-gold`, three `/notes/<slug>` pages, seven `opengraph-image` routes, `/icon.svg`, `/apple-icon.png`, `/robots.txt`, `/sitemap.xml` (all static), and `/api/contact` (dynamic).

**Checks against the built site** (`next start` on a local port, then stopped):

| Check | Result |
| --- | --- |
| Page routes | `/`, `/cv`, both case studies and a note answered 200 |
| Legacy and unknown addresses | `/index.html`, `/about.html`, `/api/form` and an unknown path answered 404 |
| API, no endpoint configured | `GET /api/contact` 405; `POST /api/contact` with `{}` 500 `{"error":"The contact form is not set up yet."}`. No message was sent anywhere. |
| Response headers on `/` | `X-Powered-By: Next.js` present; no `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy` or `Permissions-Policy` |
| Share images | Seven PNGs, 55,589 to 88,797 bytes each (all under the 300 KB budget in section 8.3) |
| Share tags | Present on every page. On the CV and both case studies `og:title`, `og:description` and `og:type` are the home page's (problem VB2). No page emits `og:url`; the home page has no canonical link. |
| Structured data | None (no `application/ld+json` in the home page) |
| Horizontal overflow | None at 360, 390, 430 or 1280 px, light or dark, on six routes (Playwright 1.63.0 with the installed Chrome; `scrollWidth - clientWidth` was 0 in all 48 cases) |
| Themes | Light (`rgb(243, 239, 230)`) and dark (`rgb(20, 19, 17)`) both applied from the device setting on every real page. The default 404 page ignores them (white or black). |
| Tap targets and text sizes | Recorded in section 13.1 |
| Static assets | One CSS file of 30,683 bytes; 15 `.woff2` files totalling 193,460 bytes; the three largest script chunks are 229,052, 169,437 and 112,594 bytes uncompressed |

**Not run on `v2`:** Lighthouse. The run was not permitted in the audit environment, so there are no Lighthouse scores, LCP, CLS or INP figures for `v2` in this plan. They are measured in phase 0 on a Vercel preview and recorded before any change (section 8.2). The contact form was not submitted and the CV PDF was not regenerated.

### 4.2 `main` (the live site, for reference)

From the first audit, on `main` at `111567b`, 18 November 2026. Not re-run.

| Check | Result |
| --- | --- |
| Install, build, lint, type check | Not applicable: no `package.json`, no build step, no linter, no TypeScript |
| Tests | None exist |
| Horizontal overflow | None at 360 px or 1280 px, light or dark, on all four pages |
| Lighthouse 13.6.0, mobile, local static server (Performance / Accessibility / Best practices / SEO; LCP; weight) | `index.html` 99 / 100 / 92 / 100; 2.1 s; 199 KiB · `about.html` 99 / 98 / 96 / 100; 1.6 s; 198 KiB · `portfolio.html` **75** / **92** / 96 / 100; **8.9 s**; **1,504 KiB** · `contact.html` 99 / 100 / 92 / 100; 1.6 s; 119 KiB |

Caveat carried over: those scores were measured locally with the icon CDNs blocked by the sandbox, so they flatter `main`; they are indicative only and are not a target for the rebuild. The targets are in section 13.7.

---

## 5. Problems found

Severity: Critical, High, Medium, Low. No Critical problem was found. Sections 5.1 to 5.7 are problems in `v2`, the base. Section 5.8 lists the problems of `main` and says which `v2` already solves.

### 5.1 Structure and code quality (`v2`)

| ID | Where | Problem | Severity |
| --- | --- | --- | --- |
| VS1 | `vantage-gold/page.tsx:95-102`, `krystal-klean/page.tsx:77-84` | The two case studies are separate hand-written pages. The `H2` component is defined twice, identically, and the facts strip, steps, numbers and decisions grids are repeated (`vantage-gold/page.tsx:122-129`, `151-159`, `164-171`, `182-200`; `krystal-klean/page.tsx:98-105`, `129-137`, `142-149`, `167-181`). A third case study would be a third copy. | Medium |
| VS2 | `site.ts:1-2` against `vantage-gold/page.tsx:16-84`, `krystal-klean/page.tsx:17-75`, `cv/page.tsx:12-13`, `page.tsx:11-16`, `250-257`, `og.tsx:46-47` | The data file says "Everything the site says lives here", but the case-study copy, the CV summary, the home facts, the biography and the share-image strapline live in component files. Figures are therefore repeated in several places (section 9.2) and cannot be checked in one. | Medium |
| VS3 | `package.json:5-10` | No tests of any kind, no type-check script, no formatter, no CI. `lint` runs `eslint` without a warning limit. | Medium |
| VS4 | `package.json:12`, `19-22`, `25` | Six dependencies use caret ranges; no `engines` field and no `.nvmrc`. | Low |
| VS5 | `route.ts:19`; `ContactForm.tsx:18`, `27` | Type assertions on untrusted input (`as Record<string, unknown>`, `as Record<string, string>`, `as { error?: string }`) in place of validation. | Medium |
| VS6 | `route.ts:19`, `33`; `ContactForm.tsx:27` | Errors are swallowed: `.catch(() => ({}))` turns malformed JSON into an empty body and `.catch(() => null)` discards the reason a forward failed. Nothing is logged on the server. | Medium |
| VS7 | `krystal-klean/page.tsx:8` | Non-null assertion (`find(...)!`) to silence the type checker. | Low |
| VS8 | `og.tsx:40` | `eslint-disable-next-line` comment. | Low |
| VS9 | `site.ts:13`; `page.tsx:103`; `opengraph-image.tsx:10` | `profile.headline` is defined and never read; the headline is typed again in the page and in the share image. | Low |
| VS10 | `site.ts:138-159`; `page.tsx:193-205` | `earlier[].code` is defined for three projects and never rendered. | Low |
| VS11 | `cv/page.tsx:29` | The CV page builds a project entry inside the view (`{ ...earlier[0], slug: "player", stack: [...] }`), adding a stack that exists nowhere in the data. | Low |
| VS12 | `page.tsx:73` | `Timeline` falls back to the label "Client project" when a role has no dates; every role has dates, and the component is also used for education, where the label would be wrong. | Low |
| VS13 | `tsconfig.json:5`, `7` | `allowJs` is on with no JavaScript in the project; `noUncheckedIndexedAccess` is off while the code indexes arrays directly (`cv/page.tsx:29`). | Low |
| VS14 | `notes/[slug]/page.tsx:49`, `52`; `cv/page.tsx:52` | React keys taken from an index or from a slice of the text. | Low |
| VS15 | `SheetSketch.tsx:9` | Two statements run together on one line (`];  return (`). No formatter is configured. | Low |
| VS16 | `README.md:6` | The README lists one case study; there are two. | Low |
| VS17 | `src/components/ui.tsx` | `SectionHead`, `Button` and `Stack` share one file; `Button` (`ui.tsx:20-36`), the CV toolbar link (`cv/page.tsx:37-43`), `PrintButton.tsx:10` and the form's submit button (`ContactForm.tsx:75`) are four separate button styles. | Low |

### 5.2 Bugs (`v2`)

| ID | Where | Problem | Severity |
| --- | --- | --- | --- |
| VB1 | `ContactForm.tsx:31-34` | When the request cannot be made at all (offline, connection dropped), the visitor is shown the browser's own exception text followed by "You can also email me directly." On `main` this case had its own message (C14). | Medium |
| VB2 | `vantage-gold/page.tsx:9-14`, `krystal-klean/page.tsx:10-15`, `cv/page.tsx:6-10`, `layout.tsx:19-20` | These pages set a title and description but no Open Graph or X fields, so they inherit the home page's. In the built HTML the Vantage Gold, Krystal Klean and CV pages all carry `og:title` "Samson Eniolorunda · Full-stack developer", the home description and `og:type` `website`. A shared case-study link therefore shows the right image under the wrong title. Notes are correct (`notes/[slug]/page.tsx:21-22`). | Medium |
| VB3 | `next.config.ts:3-13` | No redirects. The four live `.html` addresses and `/api/form` answer 404 on the `v2` build (measured). Switching the live site to this code would break every existing link. | Medium |
| VB4 | `og.tsx:30` | The text `samsoneniolorunda.vercel.app` is written into every share image as a literal, independent of the site-address setting. | Medium |
| VB5 | `ContactForm.tsx:37-47` | On success the form is unmounted and replaced by a panel. Focus is lost (it was on the submit button) and nothing announces the result to a screen reader. | Medium |
| VB6 | `Nav.tsx:48-54`, `83-91` | The mobile menu has no outside-tap close and no scroll lock, and focus is not moved into it or returned from it. | Low |
| VB7 | `layout.tsx:32`; `Nav.tsx:24` | The device theme is read only at load (G7 lost). The toggle's server snapshot is always "light", so for a dark-theme visitor the button's icon and label are wrong until the script runs. | Low |
| VB8 | `src/app` (no `not-found.tsx`) | Unknown addresses show the framework's default 404 text, with a white or black body that ignores the site's colours (measured `rgb(255, 255, 255)` light, `rgb(0, 0, 0)` dark). | Low |
| VB9 | `layout.tsx:14-21` | The home page has no canonical link and no page emits `og:url` (confirmed in the built HTML). | Low |
| VB10 | `route.ts:17`, `24`, `26`, `34` | Only the success response is marked `no-store`; the others are not. | Low |
| VB11 | `Footer.tsx:9` | The year is computed when the static page is built, so it is correct only until the following January unless the site is redeployed. | Low |
| VB12 | `sitemap.ts:7-10` | Only notes carry a last-modified date. | Low |
| VB13 | `site.ts:81-82`, `133`, `151` against `main` | Content that contradicts `main` or the projects' own READMEs: a different email address (`site.ts:12`), a different DocuMorph address, a different repository for the clock, and "Private code" for PureDraft HR (questions Q3 to Q6). | Medium |

### 5.3 Security and privacy (`v2`)

| ID | Where | Problem | Severity |
| --- | --- | --- | --- |
| VSE1 | `route.ts:15-36` | No rate limiting. Anyone can script unlimited messages into the owner's inbox and exhaust the Formspree quota. | High |
| VSE2 | `next.config.ts:3-13` | No security headers are configured; the built site answers with `X-Powered-By` and none of the protective headers (section 4.1). | Medium |
| VSE3 | `route.ts:15-19` | No check of the request's origin or content type, and no limit on body size before parsing. | Medium |
| VSE4 | `route.ts:13`, `20-27` | Validation is hand-written: a loose email pattern, silent truncation instead of rejection, and no per-field error. | Medium |
| VSE5 | `route.ts:8-10` | Any setting value that begins with `http` is used as the forwarding address; it is not checked to be an HTTPS Formspree address. | Low |
| VSE6 | `layout.tsx:38` | An inline script is injected for the theme. It is safe as written (a constant string) but any Content-Security-Policy must account for it with a hash. | Low |
| VSE7 | `package-lock.json` | `npm audit`: 9 high and 6 moderate advisories, all in development-only lint dependencies; none ships to visitors. | Low |
| VP1 | `cv/page.tsx:26-28`; `README.md:38` | The telephone number is kept off the web page only by a convention: "Do not set `CV_PHONE` on Vercel". The page reads the variable at build time and prints it into the contact line, so one mistaken setting would publish the number on `/cv`. Nothing in the code prevents it. | Medium |
| VP2 | `public/Samson-Eniolorunda-CV.pdf`; `robots.ts:5` | The tracked PDF contains a telephone number (confirmed by extracting its text; the number is deliberately not recorded here). The file is committed to the repository, served at a public address, linked from two pages and not excluded from crawling. This is how `v2` was designed ("phone only in the PDF", `README.md:24`), but it means the number is reachable on the web and in the repository's history. The owner should decide knowingly (question D5). | Medium |

No secret value is hard-coded in tracked source.

### 5.4 Performance (`v2`)

Lighthouse was not run (section 4.1); these findings come from the source and the built HTML.

| ID | Where | Problem | Severity |
| --- | --- | --- | --- |
| VPF1 | `page.tsx:59`, `149-155`, `196`; `vantage-gold/page.tsx:89` | No image has a `sizes` attribute. The built home page offers the featured screenshot only as `w=1920` (1x) and `w=3840` (2x), so a phone with a 2x screen is sent the 3,840-pixel candidate for a slot about 340 px wide. The same applies to every project and case-study image. The bundled documentation states that without `sizes` the browser assumes the full viewport width and "unnecessarily large images" may be downloaded (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:224`). | High |
| VPF2 | `page.tsx:115-123` | The portrait is hidden below 768 px but marked `priority`, and the built HTML carries a preload for it. Phones download an image they never display, ahead of everything else. `priority` is also deprecated in this Next version in favour of `preload` (`image.md:294`). | Medium |
| VPF3 | `public/images/projects/lingerie.png` | The source screenshot is 654,701 bytes at 1440 × 900, six to ten times the size of the others. | Low |
| VPF4 | `layout.tsx:8-10`; `og.tsx:15-18` | Three font families are loaded; the build emits 15 `.woff2` files (193,460 bytes in total). Instrument Serif is stored a second time as a 70 KB `.ttf` (`src/app/fonts/InstrumentSerif-Regular.ttf`). | Low |
| VPF5 | `globals.css:52` | `scroll-behavior: smooth` is unconditional; it is not switched off for reduced motion. | Low |

### 5.5 Accessibility (`v2`)

Contrast figures were computed with the WCAG 2 formula from the tokens in `globals.css:5-32`. Sizes were measured in the browser at 360 px (section 13.1).

| ID | Where | Problem | Severity |
| --- | --- | --- | --- |
| VA1 | `globals.css:12`, `26` | The `subtle` text colour fails 4.5:1 everywhere it is used: 3.71:1 on the page and 3.36:1 on the raised surface in light, 4.18:1 and 3.61:1 in dark. It carries real information: dates, kinds, section labels, reading times, captions (`page.tsx:21-26`, `73`, `231`; `ui.tsx:7`, `41`). | Medium |
| VA2 | `globals.css:13`, `8` | The accent as text is 4.55:1 on the page (a bare pass) and 4.11:1 on the raised surface in the light theme. | Low |
| VA3 | `globals.css:79`; `SheetSketch.tsx:11`, `22` | Label text is 0.72 rem (11.52 px); the illustration uses 11 px and its caption 9.6 px. | Medium |
| VA4 | `Nav.tsx:40`, `77`; `SocialLinks.tsx:29` | Theme toggle, menu button and the three social links are 36 × 36 px, below a 44 px target. | Medium |
| VA5 | `page.tsx:40-52`, `133`; `vantage-gold/page.tsx:108`, `193`; `notes/[slug]/page.tsx:33` | Text links stand 16 to 20 px tall with nothing added to the tap area; several sit in a row 24 px apart ("Live site", "Code"). | Medium |
| VA6 | `ContactForm.tsx:9` | Fields remove the outline and signal focus by border colour alone; no `:focus-visible` style is defined for links or buttons anywhere, so they fall back to the browser default. | Medium |
| VA7 | `Nav.tsx:63-67`, `85-89` | No `aria-current` on any navigation link. | Low |
| VA8 | `ContactForm.tsx:52-64` | No inline validation: errors are the browser's own prompts or one message for the whole form; fields are not marked invalid. | Medium |
| VA9 | `vantage-gold/page.tsx:89-90` | The caption repeats the alternative text exactly, so a screen reader hears each description twice. | Low |
| VA10 | `page.tsx:196` | The three earlier-build thumbnails have empty alternative text; acceptable as decoration, but their descriptions are truncated to one line (`page.tsx:201`) with no way to read the rest. | Low |

### 5.6 SEO and sharing (`v2`)

| ID | Where | Problem | Severity |
| --- | --- | --- | --- |
| VSO1 | see VB2 | Wrong Open Graph title, description and type on the CV and both case studies. | Medium |
| VSO2 | `site.ts:6`; `og.tsx:30`; `README.md:36`; the CV PDF | The site address is fixed in four places (section 9.3), although the owner intends to move to a new domain. | Medium |
| VSO3 | `layout.tsx:14-21` | No structured data, no `og:url`, no home canonical, no X handle, no web manifest. | Low |
| VSO4 | `site.ts:66-135` | PureDraft HR, Lingeries by Sisioyin and DocuMorph have rows on the home page but no page of their own, so they cannot be linked to or shared individually (question Q8). | Medium |

### 5.7 Design (`v2`)

| ID | Where | Problem | Severity |
| --- | --- | --- | --- |
| VD1 | `Nav.tsx:57` | The header is translucent with `backdrop-blur-md`: the glass effect that section 11 rules out. | Low |
| VD2 | `page.tsx:154` | The featured screenshot scales on hover. | Low |
| VD3 | `globals.css:99-118` | Sections animate as they enter the viewport. It is restrained and respects reduced motion, but it is decoration triggered by scrolling (section 7.6). | Low |
| VD4 | `SocialLinks.tsx:4-17` | Brand marks are hand-copied SVG paths beside the Lucide set: two icon sources. | Low |
| VD5 | `public/images/profile.jpg`; `page.tsx:122` | The portrait is the same file as on `main` (moved unchanged in commit `484cfdd`), 1120 × 928, which the first audit found to carry a sparkle watermark in its bottom-right corner. `v2` displays it partly desaturated and only on wide screens. A clean original is still needed (N1). | Medium |
| VD6 | `page.tsx:73`, `129`, `231`; `ui.tsx:41` | Most supporting text is 12 to 14 px. At 360 px the home page sets about 3,600 characters at 14 px and about 1,100 below 13 px, against about 1,900 at 16 px (measured). The page reads as small print on a phone. | Medium |

### 5.8 Problems on `main`, and what `v2` already does about them

The full tables are in the first version of this plan. In summary:

| `main` problem (first audit's ids) | State in `v2` |
| --- | --- |
| ST1, ST2: header and footer copied into four files and drifting | **Solved**: one layout (`layout.tsx:47-49`) |
| ST3, ST4, ST10: no manifest, global script, no README or `.gitignore` | **Solved** (`package.json`, `README.md`, `.gitignore`); tests and CI still missing (VS3) |
| ST5 to ST8: dead tokens, selectors, classes and unused images | **Solved**: the files are gone |
| B1, B2: the empty-state text always visible; unreachable empty state | **Gone** with the filter (question G7) |
| B3: flash of the wrong theme | **Solved** (`layout.tsx:32`, `38`) |
| B4 to B6, B9, B10: charset position, empty role line without JavaScript, hard-coded year, form spacing, role written three ways | **Solved**, except that the year is now fixed at build time (VB11) |
| B7: malformed JSON reported as 500 | **Changed, not solved**: now treated as an empty body and answered 400 with a generic message (VS6) |
| B8: upstream failures relayed undifferentiated | **Solved** (502 and a plain message, `route.ts:34`) |
| SE1: no rate limiting | **Not solved** (VSE1) |
| SE2: `Access-Control-Allow-Origin: *` | **Solved**: the header is no longer sent; an origin check is still absent (VSE3) |
| SE3: non-empty validation only | **Partly solved** (`route.ts:13`, `20-27`; VSE4) |
| SE4: honeypot enforced only in the browser | **Solved** (`route.ts:24`) |
| SE5, SE6: unpinned and unverified CDN stylesheets | **Solved**: no third-party stylesheet |
| SE7: no security headers | **Not solved** (VSE2) |
| SE8 to SE10: unvalidated client fields forwarded, upstream body relayed, setting name leaked | **Solved** (`route.ts:17`, `32-34`) |
| SE11: `target="_blank"` without `rel` | **Solved** (`page.tsx:45`; `ui.tsx:26`; `SocialLinks.tsx:27`) |
| PF1, PF2: a 765 KB stock image; unoptimised screenshots without dimensions | **Partly solved**: the stock image is gone and images have dimensions and modern formats, but phones are sent desktop sizes (VPF1) |
| PF4, PF5, PF8: render-blocking CDN styles, eight font weights, unminified assets | **Solved** |
| PF6, PF7: scroll listener, `transition: all` | **Solved** |
| AX1 to AX5: accent and badge contrast failures | **Replaced** by a new palette with its own, smaller failures (VA1, VA2) |
| AX6: no `<nav>` landmark, no skip link | **Solved** (`Nav.tsx:58`; `layout.tsx:41-46`) |
| AX7: no focus-visible styles | **Not solved** (VA6) |
| AX8 to AX10, AX15, AX17, AX18: invisible focusable buttons, dialog without a focus trap, fake disabled links, filter state, icon font failure, hidden scrollbar | **Gone** with the features concerned |
| AX11: no reduced-motion handling | **Mostly solved** (`globals.css:100`; VPF5 remains) |
| AX12, AX13: small text and 34 to 35 px controls on phones | **Not solved** (VA3, VA4, VD6) |
| AX14: heading levels skipped | **Solved** |
| AX16: no `autocomplete` on the form | **Solved** (`ContactForm.tsx:54`, `58`) |
| SO1: no Open Graph or X tags | **Solved in principle**, defective on four page types (VB2) |
| SO2, SO3: no canonical, sitemap, robots, icons | **Mostly solved**; structured data and a manifest are still absent (VSO3) |
| SO4, SO5: `meta keywords`; `.html` addresses and no 404 page | Keywords gone; clean addresses; legacy redirects and a 404 page missing (VB3, VB8) |
| SO6: the site understates the owner's work | **Solved** in content, subject to the owner confirming it (section 9) |
| D1 to D8, D10 to D13: template hero, gradients, glass, lifted cards, five accent colours, ten radii, decorative motion, emoji, mismatched favicon, stock graphic, generic copy | **Solved**, except one translucent blurred header (VD1) |
| D9: watermarked portrait | **Not solved** (VD5) |

---

## 6. Proposed folder structure

The structure grows out of `v2`'s (`src/app`, `src/components`, `src/data`, `src/lib`). Routes keep their `v2` addresses. What changes: case studies become one template, components are grouped, all copy moves into `src/data`, server logic leaves the route file, and tests are added.

```
my-portfolio/
├── .github/workflows/ci.yml          lint, type check, unit tests, build, end-to-end tests
├── .gitignore                         kept from v2
├── .nvmrc                             new
├── AGENTS.md                          kept: written by the Next tooling, which re-adds it if removed
├── README.md                          run, deploy, settings (names only), content editing, making the CV PDF
├── eslint.config.mjs                  kept, plus typescript-eslint strictTypeChecked
├── next.config.ts                     security headers, legacy redirects
├── package.json                       exact versions; scripts: dev, build, start, lint, typecheck, test, test:e2e, format, cv:pdf
├── package-lock.json
├── playwright.config.ts               projects: phone (390 × 844) and desktop (1280 × 800)
├── prettier.config.mjs
├── tsconfig.json                      strict, noUncheckedIndexedAccess, allowJs off
├── vitest.config.ts
├── scripts/
│   └── cv-pdf.ts                      local only: renders /cv to public/Samson-Eniolorunda-CV.pdf
├── public/
│   ├── Samson-Eniolorunda-CV.pdf
│   └── images/
│       ├── profile/                   owner-supplied portrait
│       └── projects/<slug>/           screenshots, desktop and phone captures
├── src/
│   ├── app/
│   │   ├── layout.tsx                 fonts, theme script, header, footer, site metadata, JSON-LD
│   │   ├── page.tsx                   home: composition only, no copy
│   │   ├── globals.css                tokens and base styles only
│   │   ├── not-found.tsx              new
│   │   ├── icon.svg, apple-icon.png   kept
│   │   ├── manifest.ts                new
│   │   ├── robots.ts, sitemap.ts      kept; sitemap built from the content modules
│   │   ├── opengraph-image.tsx        kept
│   │   ├── projects/[slug]/
│   │   │   ├── page.tsx               one case-study template (generateStaticParams, dynamicParams = false)
│   │   │   └── opengraph-image.tsx
│   │   ├── notes/[slug]/              kept
│   │   ├── cv/                        kept; takes no telephone number
│   │   └── api/contact/route.ts       POST only; logic lives in server/
│   ├── components/
│   │   ├── ui/                        Button, TextLink, Field, Label, Stack, SectionHead, Figure, FactsStrip
│   │   └── layout/                    SiteHeader, MobileMenu, ThemeToggle, SiteFooter, SkipLink, ActionBar, BackToTop
│   ├── features/
│   │   ├── home/                      Hero, FeaturedProject, ProjectRow, EarlierBuilds, Principles, NotesList, Timeline, About
│   │   ├── case-study/                CaseStudyHeader, Steps, Numbers, Decisions, Scope, Screens, OnThisPage, SheetSketch
│   │   ├── notes/                     NoteBody
│   │   ├── cv/                        CvDocument, CvToolbar
│   │   └── contact/                   ContactLinks, ContactForm, useContactForm
│   ├── data/                          the only place site copy and figures live
│   │   ├── profile.ts                 name, role, location, biography, education, experience, links
│   │   ├── projects.ts                projects and earlier builds
│   │   ├── case-studies/              vantage-gold.ts, krystal-klean.ts (and any added later)
│   │   ├── notes.ts                   kept
│   │   ├── skills.ts
│   │   └── figures.ts                 every published number, with its source and confirmation date
│   ├── server/
│   │   ├── contact/schema.ts          zod schema shared with the client
│   │   ├── contact/send.ts            Formspree client
│   │   ├── contact/rate-limit.ts
│   │   └── env.ts                     zod-validated environment
│   ├── lib/
│   │   ├── seo.ts                     metadata and JSON-LD builders (one function sets title, description, Open Graph and X together)
│   │   ├── og.tsx                     shared share-image layout, kept
│   │   └── site.ts                    site address and route helpers
│   └── types/                         Project, CaseStudy, Note, Role, Figure
└── tests/
    ├── unit/                          schema, rate limit, figures, content integrity, metadata
    └── e2e/                           parity checklist by id, viewport matrix, accessibility scan, contact flows, CV
```

`src/data/site.ts` is split because it mixes profile, projects, experience and skills in one 255-line file; nothing is duplicated in the split, and the old file is deleted, not left as a re-export.

---

## 7. Proposed design direction

**In one line: keep `v2`'s editorial "ledger" identity (warm paper, near-black ink, one vermilion accent, Instrument Serif headlines over Geist, hairline rules, no cards) and rebuild its sizes, contrast and controls from the phone upwards.**

The audience is recruiters and engineering leads who see many dark, gradient-lit developer sites. `v2` already reads like a set document written by one person, which is the right answer, and it is the owner's own choice (`globals.css:3-4`). The first version of this plan proposed keeping `main`'s amber accent and Inter; with `v2` as the base those proposals are withdrawn. What follows keeps `v2`'s system and corrects the places where it fails section 11 or the mobile standard in section 13.

### 7.1 What is kept and what changes

| `v2` element | Decision |
| --- | --- |
| Paper and ink surfaces (`globals.css:6-10`, `20-24`) | **Kept** unchanged |
| Vermilion accent `#c43d12` / `#f0663a` (`globals.css:13`, `27`) | **Kept** as the brand hue; the light-theme text shade is darkened one step (7.2) |
| `subtle` text colour (`globals.css:12`, `26`) | **Changed**: fails AA (VA1) |
| Instrument Serif, Geist, Geist Mono (`layout.tsx:8-10`) | **Kept** |
| 0.72 rem labels (`globals.css:79`) | **Changed** to 12 px minimum |
| Square corners, hairline rules, no shadows | **Kept** |
| Numbered sections (`ui.tsx:4-17`) | **Kept** |
| Translucent blurred header (`Nav.tsx:57`) | **Changed** to a solid surface with a hairline (VD1) |
| Scroll-in movement and hover scaling (`globals.css:99-118`; `page.tsx:154`) | **Removed** (7.6) |
| Inline brand marks (`SocialLinks.tsx`) | **Replaced** by words (7.7) |
| "SE" icon in ink with an accent square (`src/app/icon.svg`) | **Kept** |
| Drawn spreadsheet for the private client system (`SheetSketch.tsx`) | **Kept**, honestly labelled, with legible text |
| `main`'s amber, sky-blue badges, gradients and glass cards | **Not carried over** |

### 7.2 Palette

Tokens are those of `v2` with four corrections (marked). Contrast is computed with the WCAG 2 relative-luminance formula.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `bg` | `#f3efe6` | `#141311` | Page |
| `surface` | `#faf8f2` | `#1b1a17` | Toolbars, the illustration |
| `raised` | `#e9e4d8` | `#23211d` | Image mats, confirmation panel |
| `line` | `#d6cfbf` | `#34312b` | Decorative hairlines only |
| `border` (new) | `#8a8374` | `#6f695d` | Borders of fields and outlined controls |
| `fg` | `#1a1916` | `#eeeadf` | Primary text |
| `muted` | `#4f4b43` | `#b0a998` | Secondary text |
| `subtle` (changed) | `#655f54` (was `#807a6e`) | `#989183` (was `#7d776b`) | Labels, dates, captions |
| `accent` (changed in light) | `#b23a10` (was `#c43d12`) | `#f0663a` | Links, emphasis, focus ring |
| `accent-mark` (new) | `#c43d12` | `#f0663a` | Non-text marks: rules, bullets, the icon square |
| `accent-fg` | `#fffaf2` | `#141311` | Text on accent |
| `ok` (changed in light) | `#2a6e3e` (was `#2f7a45`) | `#5fbf7a` | Success text and the status dot |
| `error` (new) | `#a32a1b` | `#f1907f` | Form errors (today errors reuse the accent, `ContactForm.tsx:68`) |

| Pair | Ratio as in `v2` | Ratio after the change | Requirement |
| --- | --- | --- | --- |
| Light: `fg` on `bg` / `raised` | 15.32 / 13.86 | unchanged | 4.5 |
| Light: `muted` on `bg` / `surface` / `raised` | 7.56 / 8.17 / 6.84 | unchanged | 4.5 |
| Light: `subtle` on `bg` / `surface` / `raised` | **3.71 / 4.01 / 3.36** | 5.52 / 5.96 / 4.99 | 4.5 |
| Light: `accent` on `bg` / `surface` / `raised` | 4.55 / n/a / **4.11** | 5.22 / 5.64 / 4.72 | 4.5 |
| Light: `accent-fg` on `accent` | 5.02 | 5.76 | 4.5 |
| Light: `ok` on `bg` / `raised` | 4.59 / n/a | 5.38 / 4.87 | 4.5 |
| Light: `border` on `bg` / `surface` | `line` is 1.35 | 3.28 / 3.54 | 3.0 |
| Dark: `fg` on `bg` / `raised` | 15.45 / 13.37 | unchanged | 4.5 |
| Dark: `muted` on `bg` / `raised` | 7.94 / 6.87 | unchanged | 4.5 |
| Dark: `subtle` on `bg` / `surface` / `raised` | **4.18 / n/a / 3.61** | 5.94 / 5.56 / 5.14 | 4.5 |
| Dark: `accent` on `bg` / `surface` / `raised` | 5.89 / 5.52 / 5.10 | unchanged | 4.5 |
| Dark: `accent-fg` on `accent` | 5.89 | unchanged | 4.5 |
| Dark: `ok` on `bg` / `raised` | 8.15 / 7.06 | unchanged | 4.5 |
| Dark: `border` on `bg` / `surface` | `line` is 1.43 | 3.41 / 3.19 | 3.0 |

Fields and outlined controls sit on `bg` or `surface`, never on `raised`. The two `error` values are carried from the first version of this plan, where they were computed against near-identical backgrounds; they are recomputed against these exact backgrounds in phase 1 and adjusted if either falls below 4.5:1. The contrast table becomes a unit test so a later token change cannot reintroduce a failure.

### 7.3 Typography

| Role | Face | Note |
| --- | --- | --- |
| Display (h1, h2, case-study titles, note titles) | Instrument Serif 400, italic for emphasis | As `v2` (`globals.css:69-74`) |
| Text and interface | Geist, variable | As `v2` |
| Labels, dates, stacks, figures | Geist Mono | As `v2`; never for prose |

All three stay on `next/font`. Only the weights and styles in use are requested. The duplicate `.ttf` for share images stays, since the image generator needs a font file (`og.tsx:15-18`).

Type scale (size / line height in px at a 16 px root), designed at 360 px first:

| Token | Phone (360 to 430) | From 768 px | From 1280 px | Today at 360 px |
| --- | --- | --- | --- | --- |
| `display` (h1) | 44 / 46 | 64 / 64 | 88 / 90 | 54.4 px home, 60 px Vantage Gold, 48 px elsewhere |
| `title` (h2) | 32 / 36 | 40 / 44 | 48 / 52 | 36 px |
| `heading` (h3) | 24 / 30 | 28 / 34 | 28 / 34 | 24 to 30 px |
| `lead` | 18 / 28 | 20 / 30 | 20 / 30 | 18 to 20 px |
| `body` | **16 / 26** | 16 / 26 | 17 / 28 | mostly 14 px |
| `small` | 14 / 22 | 14 / 22 | 14 / 22 | 12 px in places |
| `label` (mono, upper case, tracking 0.08em) | **12 / 16** | 12 / 16 | 12 / 16 | 11.52 px |
| `figure` (numbers in grids) | 40 / 44 | 48 / 52 | 48 / 52 | 48 px |

Rules: body copy, list items, form fields and descriptions are 16 px on phones; 14 px is for secondary metadata only; nothing is below 12 px, and 12 px is never the only carrier of a fact. Prose is capped at 68 characters per line (about 34 to 38 at 360 px with 20 px gutters, which is comfortable).

### 7.4 Layout

- **Designed at 360, 390 and 430 px first**, then 768, 1024, 1280 and 1536 px. Tailwind's default breakpoints (640, 768, 1024, 1280, 1536) are kept, as `v2` uses them (`page.tsx:96-97`, `126`).
- **Container:** maximum 1152 px (`max-w-6xl`, as `v2`); side padding 20 px on phones, 32 px from 640 px, 48 px from 1280 px. Case studies 1024 px; notes and the CV 768 px, with prose at 680 px.
- **Structure:** left-aligned; sections separated by a full-width ink rule and a numbered mono label, as `v2`. Nothing centred except the 404 page.
- **Vertical rhythm:** 64 px between sections on phones, 96 px from 1024 px.

### 7.5 Spacing, radius, shadow

- **Spacing (4/8 base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. `v2` uses off-scale values in places (`py-2.5`, `p-2.5`, `py-3.5`, `gap-px` with a coloured background as a rule: `ui.tsx:22`; `page.tsx:195`, `126`; `Nav.tsx:86`); these are brought onto the scale, the 1 px rule technique excepted.
- **Radius:** none, as `v2`. `full` is used for the status dot only.
- **Shadow:** none by default. One shadow, `0 -1px 0` hairline plus `0 -8px 24px rgb(20 19 16 / 0.10)`, for the phone action bar and the open menu sheet, the only things that float.

### 7.6 Motion

- 120 ms for hover and focus, 180 ms for the menu sheet and form state changes; easing `cubic-bezier(0.2, 0, 0, 1)`; opacity and at most 8 px of movement.
- No scroll-triggered movement, no hover scaling, no looping animation except the sending spinner. This removes X8, which is listed as a parity item: question G12a in section 9.4 asks the owner to confirm.
- Under `prefers-reduced-motion: reduce` transitions and smooth scrolling are off.

### 7.7 Icons

**Lucide is the only icon set** (`lucide-react` 1.75.0), 16 and 20 px, 1.5 px stroke: `menu`, `x`, `sun`, `moon`, `arrow-up-right`, `arrow-right`, `arrow-left`, `arrow-up`, `download`, `printer`, `send`, `loader-circle`, `circle-check`, `triangle-alert`, `mail`.

Lucide ships no brand glyphs (checked against the 1.75.0 package in the first audit). `v2` works round this with three hand-copied paths (`SocialLinks.tsx:4-17`), which is a second icon source and gives 36 px icon-only targets. **GitHub, LinkedIn and X are written as words** with an `arrow-up-right` mark: easier to tap, readable by everyone, and one set.

### 7.8 Key screens (phone layout first; section 13 gives the mobile detail)

**Header.** 56 px solid bar with a hairline: the name at the left; at the right the theme toggle and, below 768 px, the menu button, each 44 × 44 px. From 768 px the links (Work, Notes, About, CV, Contact) replace the menu button, the current one marked.

**Home.**

1. **Hero.** Mono label (role, location); the name as visible text above the headline; the h1 headline; the introduction at 18 px; two full-width actions on phones, "See the work" (solid) and "Get in touch" (outlined), side by side from 640 px, with "Download CV" as a text link beneath. The portrait appears on phones as a 96 px square beside the label, and as a 4:5 figure from 768 px. The facts strip follows as a two-column grid on phones.
2. **01 Selected work.** The featured product first: screenshot, then name, tagline, summary, only the confirmed figures, stack, and two actions. Then the project rows, each stacked on phones: number and kind, name, summary, points, stack, links as 44 px rows, screenshot. Then the earlier builds as a three-row list with thumbnail, name, full description, technologies, and "Live" and "Code" links.
3. **02 How I work.** Three principles, stacked with rules on phones.
4. **03 Notes.** Three rows, each a single 44 px-plus link: title, summary, date and reading time.
5. **04 About and experience.** Biography, then the experience timeline, then education; the portrait and (if kept) interests beside the biography from 1024 px.
6. **05 Contact.** The invitation, the email address as a link that wraps without overflowing, GitHub, LinkedIn and X as words, then the form: one column on phones, Name and Email side by side from 640 px.

**Case study (`/projects/<slug>`).** Back link; label; h1; standfirst; actions; facts strip (one column on phones, two from 640 px, four from 1024 px); "On this page" list; opening screenshot or illustration; numbered sections in the 680 px measure; figures in a two-column grid on phones; decisions with the trade-off beneath each, not beside it, on phones; screenshots full-width with a caption that adds to the alternative text and does not repeat it; closing actions; next project.

**Note.** Back link; label; h1 at 44 px on phones; summary; body at 16 px / 28 px in the measure; author line; more notes.

**CV.** Toolbar; the document as on paper, at web sizes on screen (16 px body on phones) and print sizes on paper.

**404.** Themed page: heading, one sentence, links to home and to the work.

---

## 8. Rebuild plan

### 8.1 Preconditions

- The owner has answered the blocking items in section 9 (the figures in 9.2, the domain in 9.3, questions Q3 and D5, and the portrait N1). Work that does not depend on them (phases 0, 1, 6 and most of 8) can begin first.
- For any case study added for DocuMorph, PureDraft HR or Lingerie by Sisioyin (question Q8): that project's rebuild is complete and deployed, because the case study uses its screenshots, stack and address.

### 8.2 Phases and commits (starting from `v2`)

The work starts on `rebuild/production` at `e37b7cb`, the `v2` code. Nothing is scaffolded afresh; each commit changes `v2`.

**Phase 0: Foundations on `v2` (0.5 day)**

1. `chore: pin exact dependency versions, add engines and .nvmrc`
2. `chore: upgrade react, tailwindcss, lucide-react, typescript and types to the target versions` (section 3.3; settle the Tailwind integration)
3. `chore: tighten tsconfig (noUncheckedIndexedAccess, allowJs off) and add strictTypeChecked lint rules, Prettier and scripts` (`typecheck`, `test`, `test:e2e`, `format`, `lint --max-warnings 0`)
4. `chore: add Vitest, Playwright (phone and desktop projects) and the CI workflow`
5. `test(e2e): baseline screenshots of every v2 route at 360, 390, 768, 1024, 1280 and 1536 px, light and dark` (the "before" set for gate (e) in section 14)
6. Record Lighthouse mobile for every route on a Vercel preview of unchanged `v2` (not measured in this audit, section 4.1).

**Phase 1: Tokens and shell, phone first (1.5 days)**

7. `feat(tokens): corrected colour tokens, type scale, spacing scale; contrast unit test` (fixes VA1 to VA3, VD6)
8. `feat(ui): one Button, TextLink, Field, Label, SectionHead, Stack` (fixes VS17, VA5, VA6)
9. `feat(layout): solid header with 44 px controls, active state and aria-current` (G1 to G3, G15, X2; fixes VA4, VA7, VD1)
10. `feat(layout): mobile menu as a bottom sheet with outside-tap, Escape, resize, scroll lock and focus management` (G8 to G14; fixes VB6)
11. `feat(theme): toggle that follows live device changes and renders correctly before hydration` (G4 to G7, X3, X4; fixes VB7)
12. `feat(layout): footer with social links as words; skip link; themed 404 page` (G16, G17, X1, X10; fixes VB8, VB11, VD4)
13. `feat(layout): phone action bar and back-to-top` (G18, G20; section 13.3)
14. `refactor(motion): remove scroll-in movement and hover scaling; honour reduced motion for smooth scrolling` (fixes VD2, VD3, VPF5; subject to G12a)

**Phase 2: Content model and figures (1 day)**

15. `refactor(data): split site.ts into profile, projects, skills; move every string out of page files` (fixes VS2, VS9 to VS12)
16. `feat(data): figures registry; a figure renders only when it has a source and a confirmation date` (unit test fails on any unconfirmed figure; the two unconfirmed figures and the others in section 9.2 stay out until the owner confirms each)
17. `test(unit): content integrity` (every project has a name, summary and at least one link; every image file exists; every internal link resolves)

**Phase 3: Home, phone first (1.5 days)**

18. `feat(home): hero with name, portrait on phones, and contact action` (H1, H2, H4, H5, HV1 to HV5; fixes VPF2)
19. `feat(home): featured project and project rows with correct image sizes` (HV6 to HV10, W8, W10, W11; fixes VPF1)
20. `feat(home): earlier builds with full descriptions, technologies and code links` (W5 to W7; fixes VS10, VA10)
21. `feat(home): principles, notes list, about, experience and education` (HV11 to HV14, HV17, A5, and P2, A1 to A4, A6 as decided in G1)

**Phase 4: Case studies and notes (1.5 days)**

22. `feat(case-study): one typed template at /projects/[slug]` (fixes VS1, VS7)
23. `content(case-study): Vantage Gold from typed data` (VG1 to VG12)
24. `content(case-study): Krystal Klean from typed data` (KK1 to KK8)
25. `feat(case-study): on-this-page navigation, figures and screens for phones` (section 13.8; fixes VA9)
26. `feat(notes): note body at reading sizes; block types for code and tables that scroll inside themselves` (NT1 to NT5)
27. `content(case-study): DocuMorph, PureDraft HR, Lingerie by Sisioyin` (only if Q8 is yes, each after its own rebuild)

**Phase 5: CV and PDF (1 day)**

28. `feat(cv): CV page from the shared data, readable on a phone` (CVP1 to CVP8)
29. `feat(cv): local-only script that generates the PDF; the page no longer reads a telephone setting` (CVP9, CVP10; fixes VP1; outcome of D5 applied)
30. `test: the built /cv HTML and every other page contain no telephone number pattern`

**Phase 6: Contact (1 day)**

31. `feat(server): zod-validated environment and contact schema` (fixes VS5, VSE4, VSE5)
32. `feat(api): POST /api/contact with origin and content-type checks, body limit, honeypot, rate limit, no-store on every response and structured logging` (R5, S3 to S9, CF1 to CF3, CF7; fixes VSE1, VSE3, VB10, VS6)
33. `feat(contact): form with mobile keyboards, inline validation, pending, success, error and offline states` (C1 to C14, CF4 to CF6; fixes VB1, VB5, VA8)

**Phase 7: SEO, sharing and the domain (1 day)**

34. `feat(seo): one metadata builder; correct Open Graph and X fields, canonical and og:url on every page` (G23, M1 to M3; fixes VB2, VB9)
35. `feat(seo): share images read the site address from configuration` (R8; fixes VB4)
36. `feat(seo): Person, WebSite, article and project structured data; manifest` (fixes VSO3)
37. `feat(seo): sitemap and robots built from the content modules, with last-modified dates` (R6, R7, M4, M5; fixes VB12)
38. `feat(routing): permanent redirects from the four legacy .html addresses` (P5; fixes VB3)
39. `feat(security): response headers and Content-Security-Policy; remove X-Powered-By` (fixes VSE2, VSE6)

**Phase 8: Verification (1.5 days)**

40. `test(e2e): parity checklist, one test per item id, at phone and desktop sizes`
41. `test(e2e): viewport matrix, tap-target and text-size assertions, accessibility scan`
42. `test(unit): contact schema, rate limit, metadata builder, figures`
43. `docs: README covering run, deploy, settings, content editing and the CV PDF` (fixes VS16)
44. Independent review of the full diff; every finding fixed and re-checked (gate (f)).

**Phase 9: Release (0.5 day)**

45. Preview deployment; Lighthouse and link-preview checks on real phones; the owner's review and approval; the pull request is opened only when every gate in section 14 has passed. Merging and deploying wait for the owner (gate (i)).

Sections 13, 14 and 15 apply to every phase: each commit that touches a page is built at 360 px first, and no phase is complete until its part of the gates in section 14 passes.

### 8.3 SEO and sharing requirements (concrete)

**Every page**

- A unique `<title>` of at most 60 characters and a `meta description` of 120 to 160 characters, written from confirmed facts. The home description today is 212 characters (`site.ts:14-15`), so it is shortened for the meta tag.
- A canonical link as an absolute HTTPS address on the one production host, without a trailing slash; the other host (www or apex, and the `vercel.app` address) redirects permanently.
- `<html lang="en-GB">`, one `<h1>`, headings in order, `robots: index, follow` stated.

**Open Graph**

- `og:type` (`website` on the home page and CV, `article` on case studies and notes), `og:site_name`, `og:locale` `en_GB`, `og:title`, `og:description`, `og:url` (identical to the canonical), `og:image` with type, width `1200`, height `630` and alt.
- **Image:** 1200 × 630 px PNG, from an absolute HTTPS address that answers 200 without redirects, with the essential content inside the central 630 × 630 square because WhatsApp crops to a square thumbnail in some layouts.
- **Size: at most 300 KB per image.** WhatsApp does not publish its limit; images above roughly 300 KB are widely reported to be dropped from previews, so 300 KB is a hard budget enforced by a test. `v2`'s seven images are 56 to 89 KB today.
- The title and description of a page's preview are that page's own (the fix for VB2), enforced by a unit test over every route.
- The address printed inside the image comes from the site-address setting.

**X**

- `twitter:card` `summary_large_image`, title, description, image and alt, and `twitter:creator` set to the handle in the existing X link (`site.ts:22`).

**Structured data (JSON-LD)**

- `Person` on the home page: `name`, `url`, `image`, `jobTitle`, `address.addressLocality` "Lagos", `addressCountry` "NG", `alumniOf` and `sameAs` (LinkedIn, GitHub, X). No telephone. `email` only if the owner wants it machine-readable.
- `WebSite`; `Article` with `datePublished` on notes; `CreativeWork` or `SoftwareApplication` plus `BreadcrumbList` on case studies.
- Validated with the Schema.org validator and Google's Rich Results Test.

**Other assets**

- `sitemap.xml` with every page and `lastmod`; `robots.txt` allowing everything except `/api/` (and the PDF, if D5 so decides).
- `icon.svg`, a 32 px `favicon.ico`, the 180 px Apple icon, 192 and 512 px PNGs in a web manifest, and `theme-color` for both schemes.
- After deployment: LinkedIn Post Inspector, a draft post on X, and a link pasted into WhatsApp on Android and iOS.

### 8.4 Verification plan

The gates are defined once, in section 14. In short: type check, lint and build clean; unit and end-to-end tests passing at phone and desktop sizes; one test per parity item (169, less any the owner retires); every page seen at six widths in both themes; an accessibility scan with no violations; Lighthouse mobile 90 or above in all four categories; security headers and API behaviour checked; an independent review; and the owner's approval.

### 8.5 Effort estimate

| Phase | Working days |
| --- | --- |
| 0 Foundations on `v2` | 0.5 |
| 1 Tokens and shell | 1.5 |
| 2 Content model and figures | 1.0 |
| 3 Home | 1.5 |
| 4 Case studies and notes | 1.5 |
| 5 CV and PDF | 1.0 |
| 6 Contact | 1.0 |
| 7 SEO, sharing and the domain | 1.0 |
| 8 Verification | 1.5 |
| 9 Release | 0.5 |
| **Total** | **11.0** |

This excludes time waiting for the owner's answers, and excludes commit 27: add about 0.5 day for each further case study.

### 8.6 Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Unconfirmed figures reach the live site | The figures registry refuses to render a number without a source and a confirmation date, and a unit test fails the build (commit 16). Until the owner answers section 9.2 the figures are absent, not approximated. |
| The domain changes after launch | The address lives in one setting; a test fails if the old address appears anywhere in source or in a built page (section 9.3). The CV PDF is regenerated after the change. |
| The telephone number appears on a web page | The CV route stops reading any telephone setting; a test scans every built page for telephone patterns (commit 30). |
| Removing `main` behaviours is seen as a regression | Every `main`-only item is listed in section 2.12 with a recommendation; nothing is retired without the owner's answer. |
| Share previews fail on WhatsApp despite correct tags | The 300 KB budget is enforced by test; previews are checked on real devices before merge. |
| Formspree quota or spam after launch | Server-side honeypot, origin check, length limits and a rate limit (question Q13); the email address remains visible as a fallback. |
| Loss of search equity when the live site switches | Permanent redirects from all four legacy addresses; canonical tags; sitemap submitted. |
| Toolchain version ceilings (TypeScript 6.0.x, ESLint 9.x) | Pinned exactly; upgraded in one follow-up commit when the lint plugins declare support. |
| Lighthouse was not measured on `v2` | Measured in phase 0 on a preview before any change, so the "before" figures in the pull request are real. |
| A case study for a sibling project is written before that project's rebuild is finished | Commit 27 is last and optional; the template and all other phases do not depend on it. |

---

## 9. Needed from the owner

### 9.1 The content source of truth

With `v2` as the base, the content of the rebuilt site is what `v2` holds in `src/data/site.ts` and `src/data/notes.ts` and in the page files listed in VS2, **subject to the confirmations in 9.2 and 9.4**. Nothing is added that the owner has not supplied or confirmed, and no figure is carried over on this audit's authority.

Content that exists only on `main`, kept here because section 2.12 may restore some of it:

| Item | Text on `main` | Source on `main` |
| --- | --- | --- |
| Role | "a Lagos-based frontend developer"; title "Samson Eniolorunda \| Frontend Developer" | `index.html:31`, `41` |
| Greeting and role line | "Hi, I'm Samson Eniolorunda"; "I am a" + "Front-End Developer" / "Problem Solver" / "Web Enthusiast" | `index.html:123`, `126`; `script.js:26-28` |
| Biography 1 | "Hi! I'm Samson. With a foundation in the humanities and a B.A. in History & International Studies, I bring a unique perspective to web development. My curiosity for how things work on the internet led me to pivot into technology. Through the Product Hub Africa Front-End Bootcamp, I mastered HTML, CSS, JavaScript, and responsive design, blending creativity with code to build meaningful user experiences." | `about.html:115-123` |
| Biography 2 | "Today I focus on crafting clean, accessible interfaces with solid structure and maintainable styling. When I'm not coding, I'm usually exploring new tech trends, watching football, reading, or gaming." | `about.html:125-129` |
| Interests | "Exploring new technologies"; "Football"; "Reading & Research"; "Video Gaming" | `about.html:150-153` |
| Skills | Languages: HTML 5, CSS 3, JavaScript (ES6+), Bootstrap. Tools: VS Code, Git, GitHub, Vercel | `index.html:151-159`, `168-181` |
| Earlier projects | Titles "Client Portfolio Site", "Real-Time Digital Clock", "Social Links Profile", each with description, labels, live and code links | `portfolio.html:127-255` |
| Email | `samsoneniolorunda@gmail.com` | `contact.html:125` |
| Form messages | "Message Sent", "Missing Fields", "Not Sent", "Network Error" and their sentences | `script.js:380-385`, `395-399`, `436-440`, `449-452`, `458-462` |
| Copyright | "© {year} Samson Eniolorunda. All rights reserved." | `index.html:207-209` |

No telephone number, employer, client name (other than the footballer's site), testimonial or statistic appears on `main`.

### 9.2 Figures to confirm or remove (blocking)

**The owner has said that two figures in `v2` are unconfirmed.** They appear in exactly one place each; a search of all 49 tracked files, the built pages and the text of the CV PDF found no other occurrence.

| Ref | The figure as `v2` displays it | Every place it appears | Status |
| --- | --- | --- | --- |
| **F1** | "13" beside the label "external services monitored" | `src/app/projects/vantage-gold/page.tsx:27` (rendered by `page.tsx:165-170`) | **Unconfirmed by the owner. Confirm with a source, correct, or remove.** |
| **F2** | "9,555" beside the label "past results imported for team form" | `src/app/projects/vantage-gold/page.tsx:28` (rendered by `page.tsx:165-170`) | **Unconfirmed by the owner. Confirm with a source, correct, or remove.** |

Neither figure can be checked from this repository: Vantage Gold's code is not here. Until the owner answers, the rebuild leaves both out.

**Other numerical claims in `v2` that this repository cannot substantiate.** The same rule applies: each is confirmed with a source (a page on the live product, a repository, a document), corrected, or removed. For each confirmed figure the owner is asked for the date it was true, because several will drift.

| Ref | Claim as written in `v2` | Every place it appears |
| --- | --- | --- |
| F3 | Vantage Gold covers "six sports" / "6" | `site.ts:51`, `58`, `193`; `vantage-gold/page.tsx:12`, `24`, `33`, `70`; the CV PDF |
| F4 | "900+" picks graded in 30 days | `site.ts:59`, `193`; `vantage-gold/page.tsx:25`; the CV PDF |
| F5 | "20+" scheduled jobs | `site.ts:60`, `194`; `vantage-gold/page.tsx:26`; the CV PDF |
| F6 | "5" social platforms automated (named as Telegram, Facebook, Instagram, X and TikTok) | `site.ts:61`, `194`; `vantage-gold/page.tsx:29`, `35`; the CV PDF |
| F7 | Picks "go live at 09:00" | `vantage-gold/page.tsx:35` |
| F8 | Settlement is retried "up to eight times" | `vantage-gold/page.tsx:47`; `notes.ts:42` |
| F9 | Free data plans allow "roughly a hundred calls a day" | `notes.ts:70` |
| F10 | PureDraft HR has "more than 31 templates" (its README said "31+" before its rebuild) | `site.ts:72`; the CV PDF |
| F11 | DocuMorph: "nine of fourteen tools never upload anything"; "the five server conversions" | `site.ts:127-128` |
| F12 | Krystal Klean: "about 7,600 lines" "across three script files" | `site.ts:204`; `krystal-klean/page.tsx:21`; the CV PDF |
| F13 | Krystal Klean: "6" custom menus, "8" kinds of email, "3" platforms, "14" day payroll periods | `krystal-klean/page.tsx:25-28` |
| F14 | Krystal Klean: form responses sync "every five minutes"; calendar events removed "two days after the job" | `krystal-klean/page.tsx:42`, `44` |
| F15 | "3-month contract" and the dates October to December 2025 | `site.ts:87`, `202`; `krystal-klean/page.tsx:13`, `19` |
| F16 | Employment and study dates: Vantage Gold from April 2026; Raphnik June 2025 to May 2026; BTB Cooking Gas from April 2024; bootcamp 2025; university 2019 to 2024 | `site.ts:48`, `191`, `212`, `221`, `234`, `241`; `vantage-gold/page.tsx:18` |
| F17 | "I will reply within a day" (a promise, not a measurement) | `page.tsx:283` |
| F18 | Reading times of 4, 4 and 3 minutes | `notes.ts:19`, `60`, `101`. Proposed: compute them from the word count so they need no confirmation. |
| F19 | PureDraft HR's stack "Next.js 15"; DocuMorph's "Next.js 16"; Vantage Gold's "Next.js 16" | `site.ts:56`, `78`, `130`. To be re-stated from each project's rebuilt state. |

F11 and F10 can be checked against the DocuMorph and PureDraft HR repositories once their rebuilds are finished; the rest need the owner.

### 9.3 The domain and every place the site address is fixed (blocking for release)

The owner intends to claim a new domain; a `.dev` domain was suggested. Needed: the exact domain, whether the apex or `www` is canonical, and confirmation once DNS points at the Vercel project. A `.dev` domain is HTTPS-only by registry policy, which suits this site.

The present address `samsoneniolorunda.vercel.app` is written in these places:

| Where | What |
| --- | --- |
| `src/data/site.ts:6` | The default when `NEXT_PUBLIC_SITE_URL` is not set |
| `src/lib/og.tsx:30` | Literal text drawn into every share image |
| `README.md:36` | Documentation of the default |
| `public/Samson-Eniolorunda-CV.pdf` (page 1, contact line) | Produced from `cv/page.tsx:28` when the PDF was last made; the file must be regenerated after the change |

Places that take the address from `SITE_URL` and so follow the setting: `layout.tsx:15` (metadata base, hence every canonical and share-image address), `robots.ts:5`, `sitemap.ts:7-11`, `cv/page.tsx:28`.

In the rebuild the address has no default in code: the build fails without the setting, share images read it, and a test fails if the old address appears in source or in any built page. Other addresses fixed in content are the projects' own (`site.ts:54`, `81`, `115`, `133`, `143-158`; and the label "Visit vantagegold.live" at `vantage-gold/page.tsx:119`); see Q4 to Q6.

### 9.4 Decisions and questions

**Settled since the first version of this plan**

- Q1 (baseline): **`v2`**, by the owner's decision.
- Q7 (domain): superseded by section 9.3.
- Q9 (theme remembered permanently): `v2` already does this; kept.
- Q14 (role title): `v2` says "Full-stack developer"; kept unless the owner says otherwise.

**Blocking**

- **F1 to F19.** The figures in section 9.2.
- **Q2. `v2`'s content.** `v2` was a preview. Confirm that each of these is true and wanted on the public site: Vantage Gold as the featured product; the Krystal Klean contract and permission to name the client; the four experience entries (including the employer named for national service and the owner's own business); the university; the three notes; the "open to" line (`site.ts:16`); the statement about working with AI coding assistants (`site.ts:172-175`, `notes.ts:95-127`).
- **Q3. Email address.** `main` shows `samsoneniolorunda@gmail.com` (`contact.html:125`); `v2` shows `eniolorundasamson@gmail.com` (`site.ts:12`). Which is correct?
- **D5. The telephone number and the PDF.** The tracked PDF contains the number and is publicly downloadable and crawlable (VP2). Choose one: (a) keep it, knowingly; (b) publish a PDF without the number and keep a private copy with it for direct applications (recommended); (c) keep the number in the public PDF but exclude the file from crawling. Under every option the number stays out of the code and off every web page, and the rebuild removes the route's ability to print it (VP1).
- **N1. Portrait.** An original photograph without the watermark, at least 1600 px on the short side, uncropped (VD5).

**Content decisions**

- **Q4. DocuMorph address:** `docu-morph.vercel.app` (`portfolio.html:287` on `main`) or `documorph-blue.vercel.app` (`site.ts:133`)?
- **Q5. Digital clock repository:** `real-time-digital-clock` (`portfolio.html:207` on `main`) or `DigitalClock` (`site.ts:151`)?
- **Q6. PureDraft HR:** is the code public or private (`site.ts:82` says "Private code"; its README linked a public repository), and which address is canonical (`site.ts:81` uses `pure-draft-hr.vercel.app`; its README named `puredrafthr.btbcoder.site`)?
- **Q8. Further case studies.** Should DocuMorph, PureDraft HR and Lingerie by Sisioyin each get a case-study page after their rebuilds (recommended), or remain rows on the home page?
- **Q13. Rate limiting.** A Vercel Firewall rule on `/api/contact` (no new setting) or, if the plan does not include it, a small rate-limit store, which adds settings (names to be agreed).
- **Q16. Footballer project.** May the client continue to be pictured (`site.ts:142`)? The screenshot shows a person's photograph and federation logos.
- **Q18. Brand spelling.** "Lingeries by Sisioyin" (`site.ts:102`) or "Lingerie by Sisioyin" (the repository and domain)?
- **Q19. Krystal Klean.** Is the client content in the case study approved by the client for publication (it describes their internal processes)?

**Live on `main`, missing in `v2`: restore, or dropped on purpose?** (section 2.12)

- **G1.** An About section and navigation item, with the portrait and the Interests list? (Recommended: yes to the section; interests optional. `v2`'s biography replaces `main`'s.)
- **G2.** Scroll buttons: restore "back to top" on long pages and retire "scroll to bottom"?
- **G3.** Retire the scrollbar that appears only while scrolling?
- **G4.** Keep `v2`'s headline as the h1, with the name as visible text above it?
- **G5.** Retire the typewriter role line?
- **G6.** Keep skills on the CV and per project, with no Tech Stack block on the home page? Are VS Code and Bootstrap still to be listed anywhere?
- **G7.** Retire the All / Web / Apps filter and its empty state?
- **G8.** Retire the "New App Launching Soon" card?
- **G9.** Keep the inline confirmation in place of the dialog?
- **G10.** Retire the `/api/form` path?
- **G11.** Same-origin only for the endpoint, with no CORS headers?
- **G12.** Footer wording: restore "All rights reserved." or keep the location?
- **G12a.** Remove the scroll-in movement of sections (X8), in line with section 7.6?

### 9.5 Assets and content to supply

- **N1.** Portrait (above).
- **N2.** Sources for each figure confirmed in 9.2 (a link or a screenshot is enough).
- **N3.** For any further case study (Q8): two or three sentences on the problem, who it is for, and three decisions worth explaining. Drafts will be prepared from each repository for correction. Screenshots are taken from the rebuilt, deployed products at 1280 px and 390 px, with a demo account or seeded data so no real person's data is captured.
- **N4.** For Vantage Gold: confirmation that the five screenshots in `public/images/projects/` are current, or fresh ones, including one more at phone width.
- **N5.** A decision on which contact details appear on the public CV (D5).

### 9.6 Settings (names only; no value was read, and none is recorded here)

| Name | Where it is read | Purpose | Where it may be set |
| --- | --- | --- | --- |
| `PORTFOLIO_FORMSPREE_ENDPOINT` | `src/app/api/contact/route.ts:8` (and `api/form.js:45` on `main`) | Formspree form address or id | Vercel, server only. Already exists for the live site; must remain set. |
| `NEXT_PUBLIC_SITE_URL` | `src/data/site.ts:6` | The site's public address | Vercel, public (not a secret). Value follows section 9.3. |
| `CV_PHONE` | `src/app/cv/page.tsx:27` | The telephone number for the PDF | **Local machine only, never on Vercel** (`README.md:26`, `38`). In the rebuild it is read only by the local `cv:pdf` script, never by a route, and only if D5 keeps a version of the PDF with the number. |

No other environment variable is read anywhere in `v2` (searched for `process.env` across `src`). No `.env` file exists in the working tree, and none was read or created during this audit. If Q13 leads to a rate-limit store, its setting names will be proposed for approval.

### 9.7 Platform

- Confirm the Vercel project, and that the production branch stays `main` until the owner approves the switch.
- After launch: submit the sitemap in Google Search Console and re-scrape the home page in LinkedIn Post Inspector.

---

## 10. Schema changes

**None proposed.** The site has no database and stores nothing. Contact messages pass through to Formspree and are not persisted by the site. The only stored state is the visitor's theme choice in their own browser (`Nav.tsx:30`). Should Q13 be answered in favour of a rate-limit store, that would be a key-value counter with an expiry, not a schema, and would be put forward separately for approval.

---

## 11. Code and design standards

These are commitments that govern the rebuild. A change that breaks one is not merged. Where `v2` breaks one today, the problem id is given.

**TypeScript**

- TypeScript in strict mode throughout. No `any`. No `ts-ignore`, `ts-expect-error` or `ts-nocheck`. No `eslint-disable` (VS8). No `as unknown as X`, and no type assertion on untrusted input (VS5). No non-null `!` used to silence an error (VS7).

**Structure**

- A clear structure with UI components, feature modules, server and data logic, types, utilities and configuration kept apart. Small, focused files.
- One source of truth for each thing: one Button (VS17), one case-study template (VS1), one metadata builder, one set of design tokens, and one place for every sentence and figure (VS2).

**Behaviour and errors**

- zod validation on the server. Real error messages. No empty or swallowing catch blocks (VS6). Pending, empty and error states on every asynchronous screen.

**Hygiene**

- No `console.log`, commented-out code, dead code (VS9, VS10), TODOs, lorem ipsum or placeholder images. Comments only where they explain a non-obvious why.
- No patching: problems are fixed at the root. Configurations are never loosened. No re-export stubs, alias files or wrappers, and no old and new versions side by side.

**Design: what is ruled out**

- The design must not look machine-generated. No purple, blue or pink gradients; no gradient text; no neon glows; no glassmorphism (VD1); no blurred blobs.
- No emoji as icons and no mixed icon sets (VD4).
- Not the stock template: a centred hero with two buttons, three identical feature cards, testimonials, a call-to-action banner.
- Not every card in `rounded-2xl` with `shadow-lg` and a hover scale (VD2).
- This copy is not used: "Unlock", "Elevate", "Seamless", "Revolutionize", "Supercharge", "Empower", "Next-level", "Your all-in-one solution", "Built for the future". Copy is plain, specific and written in a human voice, in British English.
- Motion is subtle, quick and purposeful.

**Design: what is required instead**

- A design system for the project: colour tokens, a type scale, a 4/8-based spacing scale, one radius scale and one shadow scale.
- A restrained palette: one primary, at most one accent, and a well-built neutral scale.
- A deliberate font pairing.
- A strong grid and generous whitespace.
- One icon set.
- Real images delivered through `next/image`, with correct `sizes` and alt text (VPF1).

**Mobile**

- Every page is designed and built at 360 px first. Body text is 16 px or more; every tap target is 44 px or more; nothing scrolls sideways (section 13).

**Specific to this site**

- Nothing is invented. No experience, client, number or testimonial appears unless the owner has supplied or confirmed it. A figure without a recorded source and confirmation date does not render (section 9.2).
- The telephone number never appears in the code, in the repository's new commits, or on any web page.

---

## 12. The v2 base: keep or redo

`v2` was read in full (49 tracked files), built, linted and type-checked (section 4.1), and its use of framework features was compared with the documentation bundled in `node_modules/next/dist/docs`, as `AGENTS.md:5` instructs. The seven commits on `v2` (`git log origin/main..origin/v2`) show the intent: a Next.js and Tailwind rebuild (`484cfdd`), a new favicon (`8c2ae61`), the editorial identity with notes, CV, share images, sitemap and robots (`888bea6`), the Krystal Klean case study (`b1e1f50`), a "Core stack" fact (`2df955c`), a corrected national-service entry (`e62b47f`) and an updated DocuMorph entry (`e37b7cb`).

Verdicts: **keep** (carry over as it is), **keep with changes** (the approach is right; named defects are fixed), **redo** (rewritten; the content and intent are kept).

| Area | Verdict |
| --- | --- |
| Structure | Keep with changes |
| Components | Keep with changes |
| Design system | Keep with changes |
| Routes | Keep with changes |
| The CV page and CV PDF generation | Page: keep with changes. PDF generation: redo |
| The API route (`/api/contact`) | Redo |
| SEO (metadata, link-preview images, sitemap, robots) | Keep with changes |
| Tests | None exist: build from nothing |

### 12.1 Structure: keep with changes

**For keeping.** A conventional App Router layout under `src/` with an import alias (`tsconfig.json:21-23`); one root layout holding fonts, theme, header and footer (`layout.tsx:34-52`); content in typed modules (`site.ts:26-42`, `178-184`; `notes.ts:3-10`); strict TypeScript (`tsconfig.json:7`); a clean build, lint and type check (section 4.1).

**Changes.** Copy is split between the data modules and five component files (VS2). `site.ts` mixes four concerns in 255 lines. There is no `server/` layer: validation, forwarding and configuration all sit in the route file (`route.ts:7-36`). There are no tests, no CI, no formatter (VS3), and versions are not pinned (VS4). `allowJs` is on and `noUncheckedIndexedAccess` is off (VS13). Section 6 gives the target structure.

**Framework usage checked against the bundled documentation.** Route `params` are awaited as promises in pages and in the share-image route (`notes/[slug]/page.tsx:14-15`, `26-27`; `notes/[slug]/opengraph-image.tsx:12-13`), which is what this version requires (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md:219-247`, `528`). The `turbopack.rules` loader configuration (`next.config.ts:5-12`) is a supported option (`.../05-config/01-next-config-js/turbopack.md:50`), though the Tailwind set-up the documentation describes is the PostCSS plugin (section 3.3). One deprecated API is in use: `priority` on an image (`page.tsx:121`; `.../02-components/image.md:294`).

### 12.2 Components: keep with changes

| Component | Evidence | Verdict |
| --- | --- | --- |
| `Nav` and `ThemeToggle` | Landmark and labels (`Nav.tsx:58`, `74-76`), Escape handling (`49-54`), theme store with `useSyncExternalStore` (`24`) and guarded storage (`29-33`). Defects: 36 px controls (`40`, `77`), no active state (`63-67`), blurred translucent bar (`57`), no outside-tap, scroll lock or focus handling (`83-91`), device changes not followed. | Keep with changes; the menu is rebuilt as a bottom sheet (section 13.3) |
| `Footer` | `Footer.tsx:4-15`. Year fixed at build (VB11). | Keep with changes |
| `SocialLinks` | Hand-copied brand paths, icon-only 36 px targets (`SocialLinks.tsx:4-17`, `29`). | Redo as text links |
| `ui.tsx` (`SectionHead`, `Button`, `Stack`) | Sound, small components (`ui.tsx:4-46`). `Button` is 40 to 42 px tall with 14 px text (`22-23`) and is one of four button styles (VS17). | Keep with changes; split into one file each |
| `ContactForm` | Clear state machine (`ContactForm.tsx:6`, `12-35`), labels wrapping inputs (`52-64`), `autocomplete` (`54`, `58`), honeypot (`66`). Defects: VB1, VB5, VA6, VA8, VS5; 14 px fields (`9`). | Keep with changes (section 13.6) |
| `PrintButton` | `PrintButton.tsx:5-15`. | Keep |
| `SheetSketch` | An honest drawn stand-in for a private system, hidden from assistive technology and labelled (`SheetSketch.tsx:11`, `22`). Text at 11 px and 9.6 px; formatting slip (`9`). | Keep with changes |
| Case-study pieces (`H2`, `Shot`, the grids) | Defined inside page files and duplicated (VS1). | Redo as shared components |

### 12.3 Design system: keep with changes

**For keeping.** A coherent identity that meets most of section 11 already: one accent, a warm neutral family shared by both themes (`globals.css:5-32`), tokens mapped once into Tailwind (`globals.css:34-49`), a deliberate serif and sans pairing, square corners, hairline rules and no shadows, reduced-motion respected for the one animation (`globals.css:100`), and dedicated print styles (`globals.css:120-143`). Both themes were verified on every route.

**Changes.** `subtle` text fails contrast in both themes (VA1); the accent is marginal on raised surfaces (VA2); there is no border token that reaches 3:1, so field borders use the 1.35:1 hairline colour (`ContactForm.tsx:9`; `globals.css:9`); there is no type scale as tokens, and sizes are set ad hoc, including an arbitrary `text-[3.4rem]` and `text-[5.75rem]` (`page.tsx:102`); labels are 11.52 px (VA3); most text is 14 px (VD6); spacing uses off-scale values (section 7.5); the header uses a glass effect (VD1). Section 7 gives the corrected system.

### 12.4 Routes: keep with changes

**For keeping.** The address scheme (`/`, `/projects/<slug>`, `/notes/<slug>`, `/cv`, `/api/contact`) is clear and already in the sitemap (`sitemap.ts:6-12`). Notes use one dynamic route with `generateStaticParams` and `dynamicParams = false` (`notes/[slug]/page.tsx:8-12`), so unknown slugs are 404 and everything is static (build output, section 4.1).

**Changes.** The two case studies are two static folders, not one template (VS1): they become `/projects/[slug]` with the same addresses. There is no `not-found.tsx` (VB8). The four live addresses and `/api/form` are not redirected (VB3). Three projects have no page of their own (VSO4, question Q8). `main`'s About destination has no equivalent (section 2.12).

### 12.5 The CV page and CV PDF generation: page keep with changes; generation redo

**The page: keep with changes.** It is built from the same data as the home page (`cv/page.tsx:3`, `63-114`), so the CV and the site cannot drift apart; it has print rules for one A4 sheet (`globals.css:133-139`; `cv/page.tsx:19`, `32`, `48-49`, `96`) and the tracked PDF is indeed one A4 page. Changes: the route itself reads `CV_PHONE` (`cv/page.tsx:27-28`), which is the single point at which the number could reach the web (VP1); a project entry and its stack are invented in the view (VS11); the summary is a second copy of facts held elsewhere (`cv/page.tsx:12-13`); on a phone nearly all of it is 14 px or smaller (4,030 of about 4,400 characters at 360 px, measured) and the two toolbar buttons are 38 px tall.

**PDF generation: redo.** Today it is a manual procedure: add the number to `.env.local`, run the development server, print from the browser with particular settings and save over the tracked file (`README.md:22-29`). It depends on the operator's browser and print dialog, it cannot be repeated exactly, nothing checks that the result is one page or matches the site, and the committed result carries the telephone number (VP2) and the old site address (section 9.3). Replacement: `npm run cv:pdf`, a local-only script using Playwright's PDF output, which renders the CV component with fixed A4 settings, refuses to run when it detects a Vercel or CI environment, asserts that the output is exactly one page, and writes the public PDF. Whether any copy carries the number is decided in D5; if one does, the number is passed to the script on the owner's machine and that copy is kept out of the repository. The `/cv` route takes no telephone input at all.

### 12.6 The API route (`/api/contact`): redo

**Worth carrying over (behaviour, not code).** The server-side honeypot (`route.ts:24`), the single environment variable accepting an address or an id (`route.ts:7-11`), length caps (`route.ts:20-22`), `_replyto` (`route.ts:32`), a 502 with a plain message for upstream failures (`route.ts:34`), and no CORS headers.

**Why redo.** In 36 lines the handler breaks five of the standards in section 11 and leaves the main abuse path open: a type assertion on the parsed body (`route.ts:19`), two swallowing catches and no logging (`route.ts:19`, `33`), hand-written validation with silent truncation (`route.ts:13`, `20-27`), no rate limit (VSE1), no origin, content-type or body-size check (VSE3), an unvalidated forwarding address (VSE5), and `no-store` on one response of five (VB10). The rewrite is small: a zod schema shared with the form, a validated environment, an origin check, a rate limit (Q13), a typed result from a `send` function, structured logs without message content, and tests for every branch (section 14, gate (d)). The path, the setting name and the response shape the form relies on are unchanged.

### 12.7 SEO: keep with changes

| Part | Evidence | Verdict |
| --- | --- | --- |
| Metadata | `metadataBase`, a title template and site-level Open Graph and X fields (`layout.tsx:14-21`); per-page titles, descriptions and canonicals (`cv/page.tsx:6-10`; `vantage-gold/page.tsx:9-14`; `krystal-klean/page.tsx:10-15`; `notes/[slug]/page.tsx:14-24`). Defects: VB2 (wrong preview title on four page types), VB9 (no home canonical, no `og:url`), no structured data (VSO3), a 212-character home description. | Keep with changes: one builder that always sets title, description, Open Graph and X together |
| Link-preview images | One shared layout (`og.tsx:17-58`) used by seven routes; correct size and type (`og.tsx:6-7`); 56 to 89 KB each (measured); static. Defects: the address is a literal (`og.tsx:30`), the strapline is a literal (`og.tsx:47`), one lint suppression (`og.tsx:40`), and the Krystal Klean, CV and note images have no picture. | Keep with changes |
| Sitemap | Lists all nine pages (`sitemap.ts:6-12`). Entries are typed by hand and only notes have dates (VB12). | Keep with changes: generated from the content modules |
| Robots | Correct and minimal (`robots.ts:5`). | Keep; add the PDF rule if D5 chooses it |
| Icons | SVG icon and Apple icon (`src/app/icon.svg`, `apple-icon.png`). No `favicon.ico`, no manifest. | Keep with changes |
| Legacy addresses | None redirected (VB3). | Add |

### 12.8 Tests: none exist

There is no test file, test script or test runner in `v2` (`package.json:5-26`). One of `v2`'s own notes describes checking work with "the type checker, the linter, scripted tests ... and a full production build" and screenshots "at desktop and phone sizes, in light and dark themes" (`notes.ts:117`); the portfolio itself should meet the standard it describes. The whole test suite is new work: section 14, gate (b).

---

## 13. Mobile first (the priority)

Most visitors will open this site on a phone, from a link in a message. The mobile experience is therefore the product; the desktop layout is the same content given more room. Every page is designed and built at 360 px first, checked at 390 and 430 px, and only then scaled up through 768, 1024, 1280 and 1536 px.

### 13.1 The mobile state of `v2` today (evidence)

Measured on the production build with Playwright 1.63.0 and the installed Chrome at 360, 390 and 430 px, in light and dark, on `/`, both case studies, a note, `/cv` and the 404 page.

| Aspect | Found | Evidence |
| --- | --- | --- |
| Viewport meta | `width=device-width, initial-scale=1`, supplied by the framework. No `viewport-fit=cover`, so safe-area insets are not available to the page. | Built HTML; `layout.tsx:23-28` sets only the theme colour |
| Breakpoints | Tailwind defaults: `sm` 640, `md` 768, `lg` 1024. Layouts are written desktop-inclusive with phone as the unprefixed case. | `page.tsx:96-97`, `126`, `147`; `Nav.tsx:62`, `77` |
| Horizontal scroll | None on any route at any measured width, in either theme. | Section 4.1 |
| Sticky and fixed elements | One: the header, `sticky top-0`, 57 px tall, translucent with a blur. In-page links are offset by 5 rem so they clear it. Nothing is fixed to the bottom. | `Nav.tsx:57`; `globals.css:53` |
| Tap targets below 44 px | Home: 23 of 34 visible targets. Vantage Gold: 13 of 15. Krystal Klean: 10 of 10. Note: 9 of 11. CV: 9 of 9. The worst: theme toggle, menu button and six social icons at 36 × 36; text links 16 to 20 px tall ("Live site", "Code", "Back to work", "Read the note", "All skills"); buttons 40 to 42 px; CV toolbar buttons 38 px. | `Nav.tsx:40`, `77`; `SocialLinks.tsx:29`; `page.tsx:40-52`, `133`; `ui.tsx:22-23`; `cv/page.tsx:40`; `PrintButton.tsx:10` |
| Targets that already pass | The three form fields and the submit button (46 to 48 px), the mobile menu rows, the notes rows and the earlier-build rows. | `ContactForm.tsx:9`, `75`; `Nav.tsx:86`; `page.tsx:230`, `195` |
| Text sizes at 360 px | Home: about 1,930 characters at 16 px, 3,610 at 14 px, 690 at 12 px, 330 at 11.52 px, 125 at 11 px, 32 at 9.6 px. CV: about 4,030 at 14 px against 15 at 16 px. Notes are the exception: 1,970 at 16 px. | `globals.css:79`; `page.tsx:29`, `73`, `201`; `SheetSketch.tsx:11`, `22`; `cv/page.tsx:61`, `73`, `82` |
| Form field text | 14 px, which makes iOS Safari zoom the page when a field is focused. | `ContactForm.tsx:9` (`text-sm`) |
| Input types | Name: no `type` (text), `autocomplete="name"`. Email: `type="email"`, `autocomplete="email"`. Message: `textarea`, five rows, no attributes. No `inputmode`, `enterkeyhint`, `autocapitalize`, `maxlength` or inline validation anywhere. | `ContactForm.tsx:54`, `58`, `63` |
| Headline size | h1 is 54.4 px on the home page and 60 px on Vantage Gold at 360 px: three to four words a line. | `page.tsx:102`; `vantage-gold/page.tsx:114` |
| Images on phones | No `sizes`; the featured screenshot is offered at 1,920 and 3,840 px only. The hidden portrait is preloaded. | VPF1, VPF2 |
| Portrait | Not shown below 768 px. | `page.tsx:115` |
| Primary actions | Hero buttons sit in the first screen but in the upper half; the menu button is top right, the hardest corner to reach one-handed; contact is at the very end of a page about 11,000 px tall at 360 px (measured from the full-page capture), with no shortcut but the menu. | `page.tsx:106-113`; `Nav.tsx:69-81` |
| Case studies | No in-page navigation; decisions put the trade-off under the choice on phones (good); figures stack in one column at 48 px each. | `vantage-gold/page.tsx:164`, `183` |
| Code blocks and tables | None exist: notes are headings and paragraphs only. Nothing overflows, but the model has no safe way to add them. | `notes.ts:9` |
| Themes | Both work on every page from the device setting, with no flash; the manual choice persists. The 404 page ignores them. | `layout.tsx:32`; `Nav.tsx:25-34`; VB8 |

### 13.2 Layout: 360, 390 and 430 px first

- Mock-ups and component work start at 360 × 800. A component is not accepted until it is right at 360, 390 and 430 px; wider layouts are added afterwards with `min-width` rules, as `v2` already writes them.
- Gutter 20 px at all three phone widths; the content column is therefore 320, 350 and 390 px. No element may have a fixed width above 320 px.
- One column on phones for everything except: the facts strips (two columns, label over value), the figure grids (two columns), and the hero portrait beside the label.
- Long unbroken strings wrap: the email address uses `overflow-wrap: anywhere`, not `break-all` as today (`page.tsx:284`), so it breaks at sensible points; URLs in the CV contact line likewise.
- The type scale in section 7.3 is the phone scale; the h1 comes down to 44 px so the headline sets in four lines, not six.

### 13.3 Thumb reach and tap targets

- **Every interactive element is at least 44 × 44 CSS px**, with at least 8 px between adjacent targets. Inline text links inside paragraphs are exempt from the height rule but never sit closer than 8 px to another target. This is asserted by a Playwright test on every route at 360 px (section 14, gate (b)).
- **Header controls** become 44 px squares. Link rows ("Live site", "Code", "Case study") become a vertical list of full-width 48 px rows on phones.
- **The menu opens as a bottom sheet.** The button stays in the header where people expect it, but the links appear in a sheet anchored to the bottom edge, each row 52 px, so they are chosen with the thumb. The sheet locks page scroll, closes on an outside tap, on Escape and on a link, traps focus while open and returns it to the button (G8 to G14).
- **A phone action bar** (below 768 px only), 56 px plus the bottom safe-area inset, appears once the hero's own buttons have scrolled out of view and hides while the contact section or the keyboard is on screen:
  - Home: "Get in touch" (solid, jumps to the form) and "CV".
  - Case study: "Visit the site" where one exists, and "Get in touch". Krystal Klean, which is private, shows "Get in touch" and "Next project".
  - Note: "All notes" and "Get in touch".
  - CV: "Download PDF" (solid) and "Email".
  This is two actions, not a navigation bar: the site has too few destinations to justify permanent bottom navigation, and a five-item bar would crowd a reading page.
- **Back to top** (G18, G20) is a 44 px button above the action bar on pages longer than three screens, shown when scrolling up, removed from the tab order while hidden.
- **Hero actions** are full-width and stacked at 360 px, in the order "See the work", "Get in touch", with "Download CV" as a text link.

### 13.4 Readable type, comfortable measure, no horizontal scroll

- Body text 16 px minimum on phones, 26 px line height; notes 16 px / 28 px. Secondary metadata 14 px; labels 12 px minimum. The automated check fails the build if any visible text node is below 12 px, or if less than 80% of a page's characters are at 16 px or above (today the home page is at about 36% and the CV under 2%, from the measurements in section 13.1).
- Line length: 34 to 45 characters on phones (a consequence of 16 px text in a 320 to 390 px column), capped at 68 from tablet upwards. No justified text; no hyphenation tricks.
- Never scale text with the viewport alone; sizes are fixed per breakpoint so they respect the user's own font-size setting (all sizes in rem). The layout must hold at 200% text zoom.
- No horizontal page scroll at any width from 320 px upwards. Anything that may be wider than the column (a code block, a table, a wide diagram, should a note or case study gain one) scrolls inside its own box, with `overflow-x: auto`, a visible edge fade, `tabindex="0"` and a label so keyboard users can scroll it. Tables with more than three columns become stacked label-and-value rows on phones. The figure and facts grids are definition lists, not tables, and reflow.

### 13.5 Sticky bars and safe areas

- `viewport-fit=cover` is added to the viewport so the page can read the insets.
- Header: solid, 56 px, `position: sticky`, padded with `env(safe-area-inset-top)` and the left and right insets in landscape. `scroll-padding-top` equals the header height plus 16 px so headings reached by in-page links are never covered (X7).
- Action bar: padded with `env(safe-area-inset-bottom)`; the page's bottom padding grows by the bar's height whenever it is present, so the footer and the last line of content are never under it.
- The bar and the back-to-top button hide when the on-screen keyboard opens (detected with the Visual Viewport API) and whenever the contact form is in view, so they never cover a field or the submit button.
- Nothing sticky exceeds 15% of a 640 px-tall viewport in total (header 56 px plus bar 56 px is 112 px, 17.5%: so the header hides on scroll down and returns on scroll up on phones, leaving at most one bar while reading).
- Print: all bars removed, as today (X9).

### 13.6 The contact form on a phone

The form has three visible fields and one hidden one (`ContactForm.tsx:54-66`). All field text is 16 px so iOS does not zoom.

| Field | Attributes |
| --- | --- |
| Name (`name`) | `type="text"`, `inputmode="text"`, `autocomplete="name"`, `autocapitalize="words"`, `autocorrect="off"`, `spellcheck="false"`, `enterkeyhint="next"`, `required`, `maxlength="120"` |
| Email (`email`) | `type="email"`, `inputmode="email"`, `autocomplete="email"`, `autocapitalize="none"`, `autocorrect="off"`, `spellcheck="false"`, `enterkeyhint="next"`, `required`, `maxlength="200"` |
| Message (`message`) | `textarea`, `autocomplete="off"`, `autocapitalize="sentences"`, `spellcheck="true"`, `required`, `minlength="5"`, `maxlength="5000"`, six rows, vertical resize only; no `enterkeyhint`, because Return must insert a new line |
| Honeypot (`company`) | `type="text"`, `autocomplete="off"`, `tabindex="-1"`, `aria-hidden="true"`, visually and physically removed from layout, as today |

The limits match the server's (`route.ts:20-22`, `25`) and come from the one shared zod schema.

- **Labels** stay above the fields and always visible; placeholders are examples, never the label.
- **Inline validation**: on leaving a field (not on every keystroke), with a message directly beneath the field, linked with `aria-describedby`, the field marked `aria-invalid`, in the `error` colour with an icon so colour is not the only signal. Messages: "Enter your name."; "Enter an email address, such as name@example.com."; "Write a message of at least five characters." (C8). On submit with errors, focus moves to the first invalid field.
- **Autofill** works because the fields keep standard names and `autocomplete` values; the autofill background is styled to remain legible in both themes.
- **Sending**: the button keeps its width, shows the spinner and "Sending…", and is disabled (C9).
- **Success**: the confirmation replaces the form, receives focus and is announced (`role="status"`); "Send another message" returns to an empty form (C10, C12, CF5).
- **Failure**: a message above the button with `role="alert"`, the text kept (C13). Offline or dropped connection has its own sentence, "You appear to be offline. Your message has not been sent." (C14, VB1). Every failure offers the email link (CF6). A 429 from the rate limit says when to try again.
- The submit button is full-width on phones and at least 48 px tall.

### 13.7 Speed on a mid-range Android over mobile data

Targets, measured with Lighthouse mobile (its default throttling: a mid-tier phone on slow 4G) on a Vercel preview, for the home page, both case studies, one note and the CV:

| Measure | Target |
| --- | --- |
| Lighthouse Performance, Accessibility, Best Practices, SEO | 90 or above each, on every page type |
| Largest Contentful Paint | under 2.5 s |
| Cumulative Layout Shift | under 0.1 |
| Interaction to Next Paint | under 200 ms (checked in the field with the Vercel Speed Insights or Chrome's data once live; in the laboratory, Total Blocking Time under 200 ms stands in for it) |

Budgets, enforced in CI where a tool can enforce them:

| Budget | Limit | How `v2` stands |
| --- | --- | --- |
| Any single image as transferred to a 390 px, 2x phone | 80 KB | Not met: phones are offered 1,920 and 3,840 px candidates (VPF1) |
| Images above the fold on a phone | one, at most 60 KB, with `fetchPriority="high"`; everything else lazy | Not met: a hidden portrait is preloaded (VPF2) |
| Total image transfer for the home page on a phone, full scroll | 400 KB | Not measured |
| Source screenshots in the repository | 1440 × 900, at most 200 KB each | One file is 655 KB (VPF3) |
| Font files requested on first view | at most three (serif regular, sans variable, mono), 110 KB in total; `display: swap`; serif italic loaded only where used | 15 files, 193 KB emitted in total; the number requested on first view was not measured |
| JavaScript on first load, compressed | measured in phase 0; the budget is that baseline, and no page may add more than 15 KB to it | The eight largest chunks total about 600 KB uncompressed; compressed size not measured |
| CSS, compressed | 12 KB | 30.7 KB uncompressed |
| Share images | 300 KB each | Met (56 to 89 KB) |
| Third-party scripts | none | Met |

How: every `next/image` gets a `sizes` value matching its slot (for example `(min-width: 1024px) 352px, 100vw` for a project row); the portrait on phones is a 96 px image, not the desktop file; only the first content image has high priority; client components stay limited to the menu, theme toggle, form, action bar and print button; no animation library; pages remain static.

### 13.8 Touch patterns for this product

- **Case studies as long-form reading.** Text in the 16 px / 26 px body at the phone measure; each numbered section starts with its label and title; figures in a two-column grid at 40 px, so six figures take three rows, not six screens; decisions as "choice" then "trade-off", stacked.
- **In-page navigation.** An "On this page" list directly under the facts strip on phones, collapsed by default (`<details>`), each entry a 48 px row linking to a section; from 1024 px it is a sticky side list. The back link at the top stays, and "Next project" at the foot means a visitor can read every case study without returning to the home page.
- **Images and screenshots.** Full-bleed to the gutter on phones, with reserved aspect ratio so nothing shifts; desktop screenshots are shown whole (never cropped to illegibility), and each can be tapped to open the full image in a new tab, where the browser's own pinch-zoom works; no custom lightbox and no carousel. The phone screenshot of Vantage Gold is shown at its natural width, centred. Captions are 14 px and add information.
- **Wide content.** As section 13.4: code, tables and diagrams scroll inside their own box. The drawn spreadsheet keeps four columns but with 12 px text and a 12 px caption.
- **The project list.** On phones each project is a self-contained block in reading order (name before screenshot, so the first screen says what it is), with its links as full-width rows. The earlier builds become three full rows with complete, untruncated descriptions.
- **Notes.** The list rows are single large links. A note shows its reading time and date at the top and the other notes at the foot.
- **The CV on a phone.** On screen the CV uses the site's reading sizes (16 px body) and one column; the compact 12.4 px layout applies only to print (`globals.css:137-139`). "Download PDF" is the primary action, in the toolbar and in the action bar, labelled with the file type and size. "Print" remains available but secondary. The PDF link is a plain same-origin link with `download`, which saves on Android and opens the system viewer on iOS; both are tested on real devices. Contact details on the web CV are links (`mailto:` and the profile addresses). The telephone number does not appear.
- **External links** open in a new tab and say so to assistive technology; the arrow mark distinguishes them from internal links.
- **No hover-only information.** Nothing is revealed only on hover; hover styles are wrapped in `@media (hover: hover)` so they do not stick after a tap.

### 13.9 Light and dark themes

`v2` has both and both were verified on every route (section 13.1). The rebuild keeps: the device setting as the default, a remembered manual choice, no flash, and a `theme-color` per scheme so the browser's bars match the page. It adds: following a live device change when no manual choice is stored (G7); a correct toggle before hydration (VB7); a themed 404 page (VB8); the corrected tokens in section 7.2 so every text pair passes in both themes; screenshots given a hairline border so light screenshots do not glare on the dark page; and both themes in every screenshot comparison and accessibility scan (section 14).

### 13.10 Page-by-page mobile checklist

Built from the inventory in section 2. Every entry is checked at 360, 390 and 430 px, in light and dark, and has a Playwright assertion or a recorded manual check on a real phone.

**All pages (shell: G1 to G24, X1 to X10)**

- [ ] No horizontal scroll from 320 px upwards; nothing clipped at 360 px.
- [ ] Header 56 px, solid, clears the top safe area; hides on scroll down and returns on scroll up.
- [ ] Theme toggle and menu button 44 × 44 px; the menu opens as a bottom sheet with 52 px rows, scroll lock, outside-tap, Escape and focus return; the current page is marked.
- [ ] Skip link is the first focusable element and visible on focus.
- [ ] Action bar shows the two actions for the page, clears the bottom safe area, never covers content, hides for the keyboard and near the form.
- [ ] Back-to-top appears on scroll up on long pages and is unfocusable while hidden.
- [ ] Footer: copyright line, GitHub, LinkedIn and X as words, each a 44 px target.
- [ ] Body text 16 px; no text below 12 px; layout holds at 200% text zoom.
- [ ] Both themes correct; no flash; `theme-color` matches.
- [ ] Focus is always visible, on every link, button and field.
- [ ] Legacy addresses redirect (P5).

**Home `/` (P1, H1 to H7, HV1 to HV17, A1 to A6, W1 to W11, C1 to C18, CF1 to CF7)**

- [ ] First screen at 360 × 640 shows the label, the name, the whole headline and at least the first action.
- [ ] Portrait visible on phones as a small image; no hidden image is downloaded.
- [ ] Hero actions full-width, 48 px, in the order work, contact; "Download CV" beneath.
- [ ] Facts strip in two columns with nothing truncated.
- [ ] Featured project: name and tagline before the screenshot; only confirmed figures; two full-width actions.
- [ ] Each project row reads name, summary, points, stack, links, screenshot; links are 48 px rows; screenshots are served at phone sizes.
- [ ] Krystal Klean illustration legible, labelled as an illustration.
- [ ] Earlier builds: three rows, full descriptions, technologies, "Live" and "Code".
- [ ] Principles stacked; notes rows each one 44 px-plus link.
- [ ] About and experience: biography, timeline with dates above titles, education.
- [ ] Contact: email wraps without overflow and is a 44 px target; form as section 13.6; the action bar hides here.
- [ ] In-page links from the menu land with the heading visible below the header.

**Case study: Vantage Gold `/projects/vantage-gold` (R1, VG1 to VG12)**

- [ ] h1 fits at 44 px; standfirst at 18 px; "Visit the site" 48 px.
- [ ] Facts strip readable in one or two columns.
- [ ] "On this page" list present and working; each section heading clears the header.
- [ ] Figures in two columns; **only figures confirmed under section 9.2 are shown**; the grid still looks deliberate with fewer entries.
- [ ] Steps and decisions stacked; "Read the note" links are 44 px targets.
- [ ] Five screenshots: whole, sharp, sized for the phone, each opening full size; the phone screenshot centred at natural width.
- [ ] Related notes rows and closing actions; action bar shows "Visit the site" and "Get in touch".

**Case study: Krystal Klean `/projects/krystal-klean` (R2, KK1 to KK8)**

- [ ] Title wraps cleanly at 44 px.
- [ ] Illustration: four columns legible at 360 px, caption 12 px.
- [ ] Figures in two columns, confirmed ones only.
- [ ] Eight modules as a single-column list at 16 px.
- [ ] Decisions stacked with the trade-off beneath.
- [ ] Privacy statement and closing actions; action bar shows "Get in touch" and "Next project".

**Notes `/notes/<slug>`, three pages (R3, R9, NT1 to NT5)**

- [ ] Title at 44 px; date and reading time on one line at 12 px or more.
- [ ] Body 16 px / 28 px; section headings 28 px; comfortable measure.
- [ ] Any code block or table scrolls inside itself; the page does not.
- [ ] Author line and "More notes" rows are 44 px-plus targets.
- [ ] Unknown slug shows the themed 404.

**CV `/cv` (R4, CVP1 to CVP10)**

- [ ] On-screen CV at reading sizes in one column; role headings with dates beneath, not squeezed beside.
- [ ] Toolbar: "Download PDF" primary and 48 px; "Print" secondary; both hidden in print.
- [ ] The PDF downloads on Android Chrome and opens on iOS Safari (real devices).
- [ ] `/cv#skills` lands on the Skills heading below the header.
- [ ] Email and profile addresses are tappable links; the contact line wraps without overflow.
- [ ] **No telephone number anywhere on the page** (automated scan).
- [ ] Printing from a phone still yields one A4 page.

**Contact endpoint `/api/contact` (R5, S1 to S9)**: no screen of its own; its states are covered in the home checklist and in gate (d).

**404 (new)**

- [ ] Themed, one sentence, links to home and to the work as 44 px targets.

**Link previews (R8, M1 to M5)**

- [ ] Each page's link pasted into WhatsApp on Android and iOS, LinkedIn and X shows that page's own title, description and image.

---

## 14. Quality gates (must all pass before the PR)

**Nothing is called done until every one of these passes.** A gate that fails is fixed at the cause and the gate is run again; it is never waived, weakened or reported as "mostly passing". The pull request description records the result of each gate.

**(a) Type check and lint clean, with no workarounds.**
`npm run typecheck` (`tsc --noEmit`, with `strict` and `noUncheckedIndexedAccess`) and `npm run lint` (`eslint . --max-warnings 0`, with `eslint-config-next` and `typescript-eslint` `strictTypeChecked`) both exit 0 with no output. `npm run format -- --check` passes. A search of the diff finds no `any`, `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, `eslint-disable`, `as unknown as`, or non-null `!`; the one suppression and the one assertion in `v2` (`og.tsx:40`; `krystal-klean/page.tsx:8`) are gone. `tsconfig.json` and `eslint.config.mjs` are stricter than `v2`'s, never looser.

**(b) A test for every rule, fix and key flow, with the suite passing.**
- Unit (`npm test`, Vitest): the contact schema (valid, each invalid field, over-length, honeypot); the rate limit; the environment schema; the metadata builder (every route's Open Graph title equals its own title: the regression test for VB2); the figures registry (no figure without a source and date); content integrity (every image exists, every internal link resolves, every project has a name, summary and link); the contrast table in section 7.2; reading-time calculation.
- End-to-end (`npm run test:e2e`, Playwright), every flow run in two projects, **phone (390 × 844, touch) and desktop (1280 × 800)**:
  1. Home loads; the menu opens, navigates and closes by link, Escape and outside tap; the current item is marked.
  2. Theme: follows the device, toggles, persists across pages and reloads, no flash.
  3. Home to the Vantage Gold case study, through "On this page" to a section, to a linked note, and back.
  4. Home to the Krystal Klean case study and on to the next project.
  5. Notes list to a note to another note; an unknown note shows the 404.
  6. CV: open, jump to `#skills`, the PDF link answers 200 with `application/pdf`, the page contains no telephone pattern.
  7. Contact, success: fill, submit against a mocked Formspree, confirmation announced and focused, "Send another message".
  8. Contact, validation: each field's inline message; focus to the first invalid field.
  9. Contact, failure: upstream error (502), rate limit (429) and offline each show their own message and keep the text.
  10. Honeypot filled: success shown, nothing forwarded.
  11. Legacy addresses: the four `.html` paths redirect permanently.
  12. One test per parity item id in section 2 (169, less any the owner retires in section 9.4).
- Phone-only assertions on every route: no horizontal overflow at 360, 390 and 430 px; every target at least 44 × 44 px; no text below 12 px; sticky bars never overlap a focused element.
- An automated accessibility scan (axe through Playwright) on every route in both themes with zero violations.
- A pass is every test green in CI on the final commit, with no skipped or focused tests.

**(c) The production build passes.**
`npm run build` exits 0 with no errors and no warnings, on Node 24 in CI, with only the documented settings present. The route list still shows every page as static and only `/api/contact` as dynamic.

**(d) Data and secret safety.**
- No secrets on the client: the only `NEXT_PUBLIC_` variable is the site address; a search of `.next/static` after the build finds neither the Formspree setting's name nor a `formspree.io/f/` address.
- No telephone number: a test scans every built HTML page and the repository's tracked text files for telephone patterns; the `/cv` route has no code path that reads one.
- Server-side validation: the API tests show valid 200; invalid 400 with field messages; malformed JSON 400; wrong content type 415; oversize body 413; wrong method 405; cross-origin request refused; rate limit 429; honeypot answered as success without forwarding; upstream failure 502; missing setting 500 without naming it; every response `no-store`. The site has no accounts and no stored data, so there is no authentication to test; the origin check and the rate limit are the access controls on its one endpoint.
- Safe headers, checked with `curl -I` on the preview and a header scanner: `Content-Security-Policy` (no `unsafe-eval`; scripts limited to self plus a hash for the theme script), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera, microphone and geolocation, `frame-ancestors 'none'`, and no `X-Powered-By`.
- `npm audit --omit=dev` reports 0 vulnerabilities; any development-only advisory left is listed in the pull request with the reason.
- No `.env` file is committed; `.gitignore` continues to exclude them (`.gitignore:34`).

**(e) Seen on screen.**
Every page (home, both case studies, each note, the CV, the 404, and the form's success and error states) is rendered at **360, 390, 768, 1024, 1280 and 1536 px in light and dark**, compared against section 7 and the checklist in section 13.10 by a person, not only by a script. The pull request contains before (the phase 0 captures of `v2`) and after screenshots side by side, **phone first**. A pass is no clipped, overlapping or truncated text, no horizontal scroll, and no departure from the design direction at any width in either theme.

**(f) An independent review of the finished diff.**
A reviewer who did not write the code reads the whole diff for real defects: security (the endpoint, headers, the theme script), privacy (the telephone number, client data in the Krystal Klean copy, anything personal in screenshots), data loss (parity items dropped without the owner's answer, content lost in the move out of page files), and broken flows. Every finding is fixed and the reviewer re-checks each fix. A pass is a written list of findings with each marked resolved and verified.

**(g) The professional finish.**
A read-through of every page against section 11: none of the ruled-out design patterns, one icon set, the tokens only (a lint rule or search finds no arbitrary colour or size values in class names), none of the banned phrases (a test searches the content modules), no emoji, British English spelling throughout (a spelling check with a British dictionary over the content modules), and no figure without a confirmed source.

**(h) Lighthouse mobile 90 or above in all four categories.**
Run on the Vercel preview for the home page, both case studies, one note and the CV, three runs each, median taken. A pass is Performance, Accessibility, Best Practices and SEO all at 90 or above on every page, with LCP under 2.5 s and CLS under 0.1. The scores, with the phase 0 scores of unchanged `v2` beside them, go in the pull request.

**(i) The owner's approval.**
The owner reviews the preview on his own phone, checks the content and the figures, makes one real form submission, checks a shared link in WhatsApp, and approves in writing. Nothing is merged to `main` or deployed to production before that.

---

## 15. What will make it stand out

Judged against what a hiring manager or client actually compares a junior developer's site with. The usual alternatives are: template portfolios (typically a centred hero, a grid of skill logos or percentage bars, and cards for tutorial projects, built for a desktop screen); a GitHub profile and its pinned repositories; a LinkedIn profile; and hosted profile or CV builders. These are descriptions of common patterns, not claims about any particular person's site.

1. **It is built for the phone it will be opened on.** Portfolio links travel by message and are opened on phones, yet such sites are commonly designed at desktop width and merely shrink. This one is designed at 360 px first: 16 px text, 44 px targets, actions in thumb reach, case studies that read like articles, images sized for the device. *Verified by:* the phone assertions and screenshots in gates (b) and (e), and Lighthouse mobile 90 or above in gate (h), with the scores published in the README.

2. **Every number can be checked, or it is not there.** Portfolios often carry round, unverifiable statistics. `v2` already states the principle ("what is written here can be checked on the live sites", `site.ts:170`); the rebuild enforces it in code: a figure renders only with a recorded source and confirmation date, and each links to where it can be seen. The site will show fewer numbers than `v2` does and each will stand up. *Verified by:* the figures unit test in gate (b) and the owner's confirmation in section 9.2.

3. **Case studies about running software, not only building it.** Most junior portfolios show screenshots and a stack list. These explain decisions with their trade-offs, what the owner would do differently, and, for client work that cannot be shown, say so plainly with a labelled illustration in place of an invented screenshot (`SheetSketch.tsx:22`; `krystal-klean/page.tsx:185-188`). That is the material an engineering lead reads for. *Verified by:* the content itself, approved by the owner (Q2, Q19).

4. **The CV and the site are one source.** A CV attached as a separate file usually drifts from the site it sits on. Here the web CV, the one-page PDF and the home page are generated from the same data, the PDF by a repeatable script that asserts one A4 page, and a private detail is kept off the web by construction, not by a note in a README. *Verified by:* the CV tests in gates (b) and (d).

5. **Shared links look right everywhere.** A pasted link to a personal site frequently shows no image or a generic one. Every page here has its own correct title, description and a 1200 × 630 image under 300 KB, checked in WhatsApp, LinkedIn and X on real devices. `v2` has the images; the rebuild fixes the titles (VB2) and the address printed in them (VB4). *Verified by:* the metadata unit test and the device checks in sections 8.3 and 13.10.

What is deliberately not claimed: that the site is the fastest or the best-looking of its kind. The claims above are limited to what the gates in section 14 can show.

---

No rebuild work will start until the owner approves this plan.
