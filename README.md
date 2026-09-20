# Self Learners · CSS 2027 Hub

A mobile-first Progressive Web App for CSS 2027 aspirants — MCQ practice, solved papers, facts, syllabus, schedule, and eligibility tracking, all in one installable app.

**Live URL:** https://sangi.github.io/self-learners/

---

## Features

### Study tools (after sign in)
- **Practice** — timed MCQ quiz with instant feedback and grid overview
- **Solutions** — read-mode list of every MCQ with the correct answer highlighted
- **Facts** — one-tap fact cards with verified / unverified status
- **Papers** — FPSC past papers with solution links, searchable and filterable

### Reference pages (before sign in)
- **Schedule** — live CSS 2027 study timetable with countdown to MPT and Written
- **Eligibility** — age and attempts calculator per CSS CE Rules 2019
- **Syllabus** — complete FPSC syllabus with subtopics and recommended books

### PWA
- Installable on Android, iOS, and desktop
- Offline shell caching via service worker
- Sky-blue replaced with a single professional blue (`#1e6fd9`)
- Install banner appears on every visit (dismissible)

---

## Files

| File | Purpose |
|---|---|
| `index.html` | App shell — hosts each screen in an iframe, manages nav + auth |
| `page-login.html` | Sign in / guest entry |
| `page-edu.html` | Post-login hub — Practice, Solutions, Facts, Papers |
| `page-schedule.html` | Study timetable, live from Google Sheets |
| `page-syllabus.html` | FPSC syllabus browser |
| `page-eligibility.html` | Age and attempts calculator |
| `page-papers.html` | FPSC past papers grid |
| `manifest.json` | PWA manifest |
| `service-worker.js` | Offline cache strategy |
| `icon-192.png` | App icon (small) |
| `icon-512.png` | App icon (large) |

---

## Navigation model

**Pre-login:** Sign in · Schedule · Eligibility · Syllabus
**Post-login:** Practice · Solutions · Facts · Papers

Desktop shows a top tab bar (pre-login only; post-login uses the in-page
mode dropdown inside `page-edu.html`). Mobile shows a fixed bottom nav that
swaps between the two menus after login.

Login state persists in `localStorage` under the keys `slUser` and
`slPostLogin`. Refreshing after login keeps you on the post-login menu.

---

## Data sources

All content is fetched live from published Google Sheets as CSV:

| Data | Sheet |
|---|---|
| Users | `17yY_LUiqMsABz7tbtAXFpZIYpHN2TJTZSxo7oJWzckI` · GID `2076597807` |
| Questions | published CSV |
| Facts | published CSV |
| Job sites | `108C9USSy1WysOwKThC1JFsL5OfjSC3HAX5EysDMw4gM` · GID `614189291` |
| Syllabus | published CSV |
| Schedule | published CSV |
| Papers | published CSV |

---

## Deployment (GitHub Pages)

1. Push all files to the `main` branch of the repo.
2. Repo → **Settings → Pages** → Source: `main` / `root` → Save.
3. Wait ~60 seconds, then visit `https://<username>.github.io/self-learners/`.
4. To update a file: click it on GitHub → pencil icon → paste new content → Commit. Pages redeploys automatically.

**When you change any file**, also bump `CACHE` in `service-worker.js`
(e.g. `sl-cache-v2` → `sl-cache-v3`) so returning users get the new version
instead of a stale cached copy.

---

## Install as an app

**Android (Chrome):** open the site → ⋮ menu → *Install app* (or *Add to Home screen*).

**iOS (Safari):** open the site → Share button → *Add to Home Screen* → Add.

**Desktop (Chrome/Edge):** look for the install icon in the address bar,
or use menu → *Install Self Learners*.

---

## Security note

Sign-in credentials are stored in a Google Sheet that is published as CSV.
This means anyone with the URL can read the raw username/password list, and
login state in the browser can be modified via DevTools. **Do not use this
app to store real accounts, personal data, or anything sensitive.** It is a
study tool with a soft gate, not a secure auth system.

---

## License

Private project — all rights reserved by the author.