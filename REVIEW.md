# Before this goes live: things for Jay and Michelle to confirm

Everything on the site was written from the live v1 site, the 57 YouTube titles, and the background brief. Where the sources were thin, the copy stays general and the page says so. Nothing below is a guess presented as fact on a page, but each item is an inference or a gap that you can settle in a minute and we cannot.

Fix by editing the Markdown file named. Delete a line here when it is settled.

## Facts to confirm

1. ~~Two Honolulu Marathons~~ **Settled by the timing data.** Sportstats has both of you in 2022, 2023, 2024 and 2025. All four have pages now.

2. ~~Who raced Ironman Texas~~ **Settled.** Both of you, with splits, from IRONMAN's results system. Same for Honu 2023 through 2026, 70.3 Augusta 2025, IRONMAN California 2025, and 70.3 Northern California 2026.

3. ~~Did a full happen in 2024?~~ **No.** IRONMAN's athlete records show no full in 2024; the two fulls are Texas (Apr 2025) and California (Oct 2025). The "Going the full distance" essay now says so.

4. **Hibiscus 2022 date.** Set to May 2022, month precision. If you have the day, set `date:` and remove `datePrecision`.

5. **Honu 2023 swim location.** The page says Waikoloa, per the brief. If it was Hapuna Beach that year, change `content/races/honu-70-3-2023.md`.

6. ~~Waikiki Roughwater Swim 2023~~ **Settled.** Official from PSE: Jay 1:50:49, Michelle 2:02:27. My first search of that results app had missed you both.

7. **Oahu Pentathlon 2025.** Time is on the page from your own clock (15:22, 6:00 a.m. to 9:22 p.m.), and the page says it's the one number on the site that isn't from a timing sheet. Date settled (Aug 9, 2025). Still missing: what the five events were.

8. ~~Kaena Point~~ **Settled.** It was the HURT Kaena Point Firecracker, July 6, 2024, both of you, one second apart. Page renamed.

9. **Still unknown after checking every timing site.** Great Aloha Run 2023 (results are on Athlinks, which blocks automated reading), Dick Evans 2023 (not on Webscorer, where 2022, 2024 and 2025 are), Ku'ikahi 2023 and Akahai 2023 (Aloha Racing / Race Roster, no public results page found), Haleiwa Metric Century and Honolulu Century (rides, not timed), Oahu Pentathlon 2025, Honolulu Triathlon 2014.

10. **Michelle's Ku'ikahi 10K time.** Still missing (see 9). The age-group win stays, from the video title.

11. **Dates.** Every race with a timing record now has its exact date from the results page. Only the races in item 9, plus Hibiscus 2022 and Tin Man 2014, still show a month or year.

11a. **Cholo's Waimea Bay 2024** is on Timeline Hawaii with no distance listed. The page calls it an ocean swim. If it was something else, fix `content/races/cholos-waimea-bay-2024.md`.

11b. **Old Pali Road 5K 2022 and Hybrid Design 25K 2022** only have Michelle on the sheet. The pages say so. If Jay ran and wasn't timed, add a line.

11c. ~~Honu 2024 swim~~ **Settled.** Shortened to 750 m because high winds were moving the marker buoys. It's on the page.

12. **Ed.** The Hibiscus 2023 page mentions your friend Ed by first name, as the v1 site did. Confirm he is fine with that.

13. **House number in a photo.** `public/images/bikes-rack.jpg` (used on the About page and the Dick Evans report) shows a street number on the house behind the bikes. It was on the v1 site too. Crop it or swap the photo if you would rather not have it public.

## Who wrote what

Every race report and field note now has an `author:` byline, split roughly in half. The split was my call, page by page, on whose story it is: Michelle got Hibiscus, Ku'ikahi, her first Honu, IRONMAN California, the 2025 marathon you ran together, and so on; Jay got the 2014 Tin Man, his first Honu, Texas, the 2024 marathon, and the rides. Swap any of them by changing the `author:` line and asking for a rewrite. The lessons, Start here, and About stay in the shared "we" voice on purpose.

## Where every number came from

`content/results.json` holds every official result found, with its source URL. Sources: Timeline Hawaii (result tables on each event page), Pacific Sport Events via the acho.io results app, RunSignup's results API, RaceResult's data API, Webscorer, Sportstats, and IRONMAN's competitor results service. Nothing was typed from memory. `scripts/apply-results.mjs` and `scripts/new-race-pages.mjs` wrote the frontmatter, if you ever need to rerun them.

12. **Waikiki Roughwater 2025.** Page added from Jay's account (about 1:30, together). Date assumed to be Labor Day weekend 2025 (Aug 31); the official results should be on PSE's 2025 events page, which I couldn't read. Confirm the date and the official times when you can.

13. **Waikiki Roughwater 2026.** Times on the page are from your watches via Strava. PSE hadn't posted the official results as of Sept 6, 2026; the Sunday checker will keep looking.

## The seasons and the context flags (added Sept 8, 2026)

`src/lib/seasons.ts` has one record per year (title, what it was for, what it cost, what we changed). All five are marked `draft: true` and say so on the /seasons page until you correct them. The 2025 and 2026 text is Jay's description from the spec; 2022 to 2024 are my reading of the results. Rewrite them in your own words and flip `draft` off.

Every race now carries `context:` flags (peak build, rebuild, raced injured, together on purpose, weeks after an Ironman, training day, flew for it, heat day, first at distance) and some carry a `contextNote:`. I tagged all 65 from the results and the pages; the ones that matter most are 2025 and 2026. Check them in `content/races/*.md`; the flags show on each race page under "Read the time with this."

The 2025 Honolulu Marathon now says Michelle went in injured, per the spec, with a line pointing readers to their own doctor. It says nothing about what the injury was. Add that only if you want it on the record.

Pieces the spec asks for that only you can write (send the raw version and `/sunday` drafts it):
- A lesson: what two years at peak volume cost. What you noticed, when, what you changed.
- A lesson: racing injured, and how you decided to. December 2025 as the case study. Descriptive, not prescriptive.
- The 2026 Sunday notes as a rebuild series.

Signature phrases now have one home each (`content/phrases.json`) and `scripts/lint-prose.py` warns on every build if one strays or repeats. The per-page disclaimer is gone; the footer carries it once.

## From Jay's 2022 account (Sept 8, 2026)

- The 2022 season page is written from your account and marked final. Three things I changed or assumed: "Great Oahu Run" became Great Aloha Run; I left the golf-course restroom code out of the story on purpose (the story stays, the digits don't); and the new lesson on keto keeps to what you described with the doctor line beside it.
- The sign-up story is corrected everywhere it appeared. The old lesson said you paid for the marathon after the half; the truth, per you, is two days after the walk, and the lesson now says so.
- Na Wahine 2022 has a page with no time. PSE timed it; I'll look for the sheet.
- The Kastor book is named on the season page because you used it. Say so if you'd rather not name it.

## From Jay's 2023 account (Sept 9, 2026)

- The 2023 season story is written from your account. Two readings: "4:34" I took as 4:00:34, which matches the official time and your "35 seconds"; and "Boston Marathon readiness series" I took as BioAstin.
- Michelle's ankle at the 2023 marathon is now on that page and in its context flags. If she'd rather it read differently, it's her page to change.
- You said you both did the Na Wahine sprint again in July 2023, but PSE's results only show you in the Kane race. The page still says Jay raced. Tell me if Michelle did too.
- Trainers moved from "late October" to Labor Day weekend per you; the October videos are still the first ones about them.

## Coming up

- **IRONMAN 70.3 Washington (Tri-Cities), Sept 20, 2026**, both of you. After the race, `/sunday recap` pulls the result from IRONMAN's results service by name; the event id will be on ironman.com's Washington results page.

## Copy to read with a red pen

These pages describe courses from public knowledge and your titles, not from your notes. Read them for anything that is wrong about the course or the day:
`kailua-10-miler-2023`, `kings-runner-10k-2023`, `windward-half-2023`, `hapalua-half-2023`, `haleiwa-metric-century-2023`, `lanikai-8k-2023`, `na-wahine-kane-sprint-2023`, `runners-hi-20k-2023`, `hybrid-design-25k-2023`, `tantalus-10-mile-2023`, `boca-hawaii-30k-2023`, `val-nolasco-half-2023`, `kaiwi-coast-fun-run-2023`, `turtle-bay-triathlon-2023`, `bosetti-sunrise-10k-2024`, `kaena-point-10-mile-2024`.

The calendar page (`src/lib/calendar.ts`) says "Dates drift, confirm with the organizer." Still read the `when` and `where` fields.

## Things left out on purpose

- No email signup. It would be a funnel.
- No mortgage link, no IronAgeWisdom link (it was 404 on 2026-09-03). If IronAgeWisdom comes back, decide whether it belongs in the footer.
- No family names, no kids' names. Family visits are mentioned as "kids," "nieces and a nephew."
- No gear beyond the two shoe models you already published.
- No times anywhere except the two you had published: Michelle's 2:12 and her age-group win.

## Open question

IronAgeWisdom.com and the "follow results, not institutions" philosophy: nothing from it is on this site. If you want it here, it fits best as a lesson.
