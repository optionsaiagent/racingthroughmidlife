# Before this goes live: things for Jay and Michelle to confirm

Everything on the site was written from the live v1 site, the 57 YouTube titles, and the background brief. Where the sources were thin, the copy stays general and the page says so. Nothing below is a guess presented as fact on a page, but each item is an inference or a gap that you can settle in a minute and we cannot.

Fix by editing the Markdown file named. Delete a line here when it is settled.

## Facts to confirm

1. ~~Two Honolulu Marathons~~ **Settled by the timing data.** Sportstats has both of you in 2022, 2023, 2024 and 2025. All four have pages now.

2. ~~Who raced Ironman Texas~~ **Settled.** Both of you, with splits, from IRONMAN's results system. Same for Honu 2023 through 2026, 70.3 Augusta 2025, IRONMAN California 2025, and 70.3 Northern California 2026.

3. ~~Did a full happen in 2024?~~ **No.** IRONMAN's athlete records show no full in 2024; the two fulls are Texas (Apr 2025) and California (Oct 2025). The "Going the full distance" essay now says so.

4. **Hibiscus 2022 date.** Set to May 2022, month precision. If you have the day, set `date:` and remove `datePrecision`.

5. **Honu 2023 swim location.** The page says Waikoloa, per the brief. If it was Hapuna Beach that year, change `content/races/honu-70-3-2023.md`.

6. ~~The Waikiki 2.4-mile swim~~ **Checked.** Neither of you is in the 2023 Waikiki Roughwater Swim results, so the page now says it was the distance, not the race. If you did have bibs, tell me where the results live.

7. **Oahu Pentathlon 2025.** Still no date or events. PSE's results for it are on dot.vision, which only shows a live map, not a results list.

8. ~~Kaena Point~~ **Settled.** It was the HURT Kaena Point Firecracker, July 6, 2024, both of you, one second apart. Page renamed.

9. **Still unknown after checking every timing site.** Great Aloha Run 2023 (results are on Athlinks, which blocks automated reading), Dick Evans 2023 (not on Webscorer, where 2022, 2024 and 2025 are), Ku'ikahi 2023 and Akahai 2023 (Aloha Racing / Race Roster, no public results page found), Haleiwa Metric Century and Honolulu Century (rides, not timed), Oahu Pentathlon 2025, Honolulu Triathlon 2014.

10. **Michelle's Ku'ikahi 10K time.** Still missing (see 9). The age-group win stays, from the video title.

11. **Dates.** Every race with a timing record now has its exact date from the results page. Only the races in item 9, plus Hibiscus 2022 and Tin Man 2014, still show a month or year.

11a. **Cholo's Waimea Bay 2024** is on Timeline Hawaii with no distance listed. The page calls it an ocean swim. If it was something else, fix `content/races/cholos-waimea-bay-2024.md`.

11b. **Old Pali Road 5K 2022 and Hybrid Design 25K 2022** only have Michelle on the sheet. The pages say so. If Jay ran and wasn't timed, add a line.

11c. **Honu 2024 swim.** Both swim splits are about 16 minutes, so the swim was clearly shortened. The page says that and nothing more. Add the reason if you want it on the record.

12. **Ed.** The Hibiscus 2023 page mentions your friend Ed by first name, as the v1 site did. Confirm he is fine with that.

13. **House number in a photo.** `public/images/bikes-rack.jpg` (used on the About page and the Dick Evans report) shows a street number on the house behind the bikes. It was on the v1 site too. Crop it or swap the photo if you would rather not have it public.

## Where every number came from

`content/results.json` holds every official result found, with its source URL. Sources: Timeline Hawaii (result tables on each event page), Pacific Sport Events via the acho.io results app, RunSignup's results API, RaceResult's data API, Webscorer, Sportstats, and IRONMAN's competitor results service. Nothing was typed from memory. `scripts/apply-results.mjs` and `scripts/new-race-pages.mjs` wrote the frontmatter, if you ever need to rerun them.

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
