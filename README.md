# Racing Through Midlife

The written log for racingthroughmidlife.com. Next.js 15, App Router, Tailwind v4, content in Markdown. No CMS, no database, no analytics scripts, no third-party JavaScript until a reader clicks play on a video.

## Run it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000. `pnpm build` produces the static site Vercel deploys.

## Where things live

| Path | What |
|---|---|
| `content/races/*.md` | One file per race. Shows up in the ledger, the calendar, the feed, the sitemap. |
| `content/notes/*.md` | Field notes, the weekly Sunday entry. |
| `content/lessons/*.md` | Do's and don'ts. |
| `content/pages/*.md` | Long-form pages: `start-here`, `about`. |
| `content/videos.json` | Every YouTube video, with its year, month, and the race or note it links to. |
| `src/lib/calendar.ts` | The Oahu race calendar, month by month. |
| `src/lib/site.ts` | Site name, tagline, email, nav, disclaimer. |
| `public/images/` | Photos. |

The filename is the URL. `content/races/honu-70-3-2023.md` is `/races/honu-70-3-2023`.

## The weekly loop: `/sunday`

Open Claude Code in this folder and type `/sunday`. It runs `scripts/check-week.py` to see whether a new race result or video showed up this week, pulls the week's workouts from Strava if that's set up (see below), asks for the week in your words, drafts the note in the house voice (`VOICE.md`), shows it to you, and pushes only when you say go. `/sunday recap <race>` does the same for a race report and pulls the official result from the timing site itself. A scheduled task in the desktop app kicks this off every Sunday at 4 p.m. Whoever's writing that week gets their own voice: the `jay-voice` and `michelle-voice` skills in `~/.claude/skills/` hold each person's sample sentences, and `/sunday` loads the right one.

You can also do it by hand:

## Strava setup (one time, about five minutes)

`/sunday` can pull the week's workouts for both of you from Strava. Garmin has no personal API, so turn on Garmin's Strava sync (Garmin Connect app: Settings, Connected Apps, Strava) and every Garmin workout shows up in Strava within minutes.

1. Log in to strava.com as either of you and go to Settings, then My API Application (strava.com/settings/api). Create one application. Name it anything, category "Other", website `https://www.racingthroughmidlife.com`, Authorization Callback Domain `localhost`. Strava shows you a Client ID and a Client Secret.
2. In this folder, copy `.env.example` to `.env.local` and paste the Client ID and Client Secret into it. That file is gitignored and never leaves your machine.
3. Run this, once per person, logged in to Strava as that person in your browser:

```bash
python3 scripts/strava-auth.py jay
```

```bash
python3 scripts/strava-auth.py michelle
```

   Each one prints a Strava link. Open it, click Authorize, and you'll land on a localhost page that doesn't load. That's expected. Copy the full URL from the address bar and paste it back into the terminal. The script stores a refresh token in `.env.local`.

4. Check it:

```bash
python3 scripts/strava-week.py
```

That prints the last seven days for both of you: sport, distance, time, climb, average heart rate if you share it, and your activity titles. `/sunday` runs it automatically. The scripts only ever read; nothing gets written to Strava.



Create `content/notes/YYYY-slug.md`:

```markdown
---
title: "Short title, the way you would say it"
deck: "One or two sentences. This is what shows in lists and in the feed."
date: "2026-09-13"
week: "2026 · September, week 2"
tags: ["heat", "marathon"]
video: "YouTubeIdIfThereIsOne"
author: "Jay"              # or Michelle; shows as a byline
---

Body in Markdown. Use ## for sections. Link to other pages with relative paths, like [Honu](/races/honu-70-3-2023).
```

Push it. Vercel rebuilds. It is on the home page as the latest note.

## Add a race report

Create `content/races/slug-year.md`:

```markdown
---
title: "Race name: what the day was about"
deck: "One or two sentences."
date: "2026-12-13"          # exact date if you know it
datePrecision: "day"        # or "month" or "year" if you do not; the page says "approx."
event: "Honolulu Marathon"
location: "Ala Moana to Kapiolani Park, Honolulu"
distance: "26.2 mi"
discipline: "run"           # run | tri | bike | swim | trail | multi
athletes: "Both"            # Jay | Michelle | Both, or leave it out
result: "Jay 4:12:34 · Michelle 4:58:01"   # ONLY the official result. Leave it out otherwise.
series: "Marathon Readiness Series 5 of 5"  # optional
featured: true              # optional
video: "YouTubeId"
tags: ["marathon", "heat"]
---

Body.
```

Leave `result` out if you do not have the official time. The page then says "no official time on file" and invites the reader to send it. That is by design. Do not put an estimate in that field.

To put the race on the calendar page, add its slug to the matching entry in `src/lib/calendar.ts`, or add a new entry.

## Add a video

Append to `content/videos.json`:

```json
{"id":"YouTubeId","title":"Title as you want it shown","year":2026,"month":9,"kind":"race","race":"slug-of-race-report","views":0}
```

`kind` is `race`, `training`, `review`, or `intro`. `race` links to a race report; `note` links to a field note. The first entry in the file is treated as the newest, so add new videos at the top.

## Rules the code enforces

- A race with no `result` shows an honest blank, never a placeholder.
- Every page carries the disclaimer: not coaching, not a clinic, not medical advice.
- YouTube loads nothing until a reader clicks play. Thumbnails come from YouTube's image CDN only.
- `/feed.xml`, `/sitemap.xml`, and `/robots.txt` are generated from the content folders.

## URLs kept from the first version of the site

`/races/honu-70-3-2023`, `/races/hibiscus-half-2023`, `/races/going-the-full-distance`, `/races/honolulu-triathlon-2014-and-again`, `/races/honolulu-marathon-for-fifty`, `/lessons/honolulu-is-not-a-recovery-week`, `/lessons/whose-day-is-it`, `/lessons/dont-sign-up-before-the-long-run`, `/notes/heat-is-the-fourth-sport`, `/notes/two-paces-one-house`, `/notes/the-shoe-you-trained-in`, `/watch`, `/about`, `/contact`. Nothing needs a redirect.
