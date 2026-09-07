---
name: sunday
description: The weekly Racing Through Midlife publishing loop. Use for "/sunday", "write this week's note", "post the race recap", or any request to add a field note or race report to the site. Drafts in the house voice, pulls official results from the timing sites, and pushes when told to.
---

# /sunday

You are helping Jay and Michelle Miller publish to racingthroughmidlife.com, a Next.js site whose content is Markdown in `content/`. Two modes:

- `/sunday` or `/sunday note` — the weekly field note.
- `/sunday recap <race>` — a race report for a race that just happened.

Read `VOICE.md` before writing a word. Then find out who's writing this one, Jay or Michelle, and load that person's voice skill (`jay-voice` or `michelle-voice`, both in `~/.claude/skills/`). The house voice is the floor; the personal skill is what makes it sound like one of them. Set `author:` in the frontmatter to match. Read `README.md` for the frontmatter formats. Never invent a time, split, placing, or race detail. If a fact isn't from Jay, Michelle, a timing site, or a video title, it doesn't go on the page.

## Step 1: find out what happened

Run the checker first. It sweeps Timeline Hawaii for the past nine days, asks IRONMAN's results service for anything new under either name, and lists YouTube videos not yet in `content/videos.json`:

```bash
python3 scripts/check-week.py
```

Then pull the week's training from Strava, if it's set up (README, "Strava setup"):

```bash
python3 scripts/strava-week.py
```

That gives you both athletes' sessions for the last seven days with their own activity titles, which are usually the best raw material for a note. Every Sunday note carries the week on Strava, two ways:

1. A `training:` block in the note's frontmatter, rendered as a card on the page. Generate it and paste it in as is:

```bash
python3 scripts/strava-week.py --yaml
```

2. Commentary in the body, in the author's voice, that talks about how the sessions felt and what they cost, not what they were. The card has the what. Use the Strava titles (they carry the Humango workout names) for context, and don't recite the table.

If the script says tokens are missing, say so once and write the note without the card. Strava data is training, not results; it never goes on a race card.

If a race shows up that the site doesn't have, or a video, say so before anything else. For races timed by other companies (Pacific Sport Events, Sportstats, RunSignup, RaceResult, Webscorer), `results-sources.md` in this folder explains how to read each one. Do the lookup yourself; don't ask Jay for a time you can get.

## Step 2: get the bullets

Ask who's writing this week if it isn't obvious, then ask for the week in their words, if they haven't already pasted it. What you need, and nothing more:

- What the week was (the sessions that mattered, anything that went wrong).
- What's next on the calendar.
- One thing they'd tell a friend about it.
- A YouTube link if there is one.

If they give you one line, write from one line. Don't pad.

## Step 3: draft

**Field note** → `content/notes/<slug>.md`. Slug is short and specific (`the-rib-came-back`, not `weekly-update-37`). Frontmatter per README: `title`, `deck`, `date` (the Sunday), `week` like `2026 · September, week 2`, `tags` from the existing tag set (run `grep -h "^tags" content/notes/*.md | sort | uniq -c` to see it), `video` if there is one, `author`, and the `training:` block. Body 250 to 500 words. Link to the race pages it touches with relative paths.

The shape of a field note, which Jay set on 2026-09-07:

1. **Opener.** One paragraph: where the week sits (what's next on the calendar, how far out) and the one thing that defined it.
2. **The week, but not a rehash.** The day-by-day card on the right already lists every session, so the body does not recite them. It explains the shape (which days were bricks, which was the long one, why the short runs are short) only where the shape needs explaining, and then spends its words on the personal part: how a session felt, the effort it took, what went wrong, what surprised them. Ask for that in step 2 if they didn't give it; do not invent it.
3. **Sidebars.** Small, specific observations that don't fit the narrative: a gel that tasted fine but couldn't be opened with sweaty hands mid-run, a bottle cage that rattled, a sock that didn't survive the swim. Write them as a blockquote whose first line starts with `Sidebar:`; the site renders that as a boxed aside. Zero to three per note. Only real ones.
4. **Next week.** Short.

Generate the training block with `--end` set to the Sunday so it runs Monday to Sunday:

```bash
python3 scripts/strava-week.py --yaml --end YYYY-MM-DD
```

The card marks a run straight off the bike as a brick automatically.

**Race recap** → `content/races/<race-slug-year>.md`. Frontmatter per README, including `results:` with whatever the timing site gave (time, age group, AG place, overall, splits) and `resultSource:` with the URL. Set `athletes:` to who actually raced. Exact `date` from the results page. If the race is on the Oahu calendar, add the slug to its entry in `src/lib/calendar.ts`. If there's a video, add it to the top of `content/videos.json` with `race` pointing at the slug.

Add every official result to `content/results.json` too, in the same shape as the existing entries, so the record stays in one place.

Before showing the draft, run it through the `humanizer` skill (`~/.claude/skills/humanizer/SKILL.md`) as a final pass: it catches the structural AI tells (not-X-but-Y contrasts, one-line closers, forced triads, staged openers) that the voice skills don't list. Keep the author's voice and every fact; only remove the tells.

Then show them the draft in full and stop. Say what you couldn't verify.

## Step 4: publish, only when they say go

```bash
pnpm build
```

If it builds, commit with a one-line message in plain English and push. Vercel deploys the branch on its own. If it doesn't build, fix it before you commit; don't push a broken build.

## Things that get you fired

- A number that isn't on a timing sheet, unless they told you it's from their own clock and the page says so (see the Oahu Pentathlon page for how that reads).
- Motivational-poster copy. Reread `VOICE.md`.
- Publishing before they've read it.
- Touching Jay's mortgage business, sponsors, or anything that smells like a funnel.
