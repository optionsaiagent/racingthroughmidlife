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

`src/lib/seasons.ts` has one record per year (title, what it was for, what it cost, what we changed). 2022, 2023, and 2024 are written from Jay's accounts and have full narratives. 2025 and 2026 are still marked `draft: true` and say so on the /seasons page; the text is Jay's description from the spec. Rewrite them in your own words and flip `draft` off.

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

- The 2023 season story is written from your account. Confirmed by Jay: 4:00:34, and BioAstin.
- Michelle's ankle at the 2023 marathon is now on that page and in its context flags. If she'd rather it read differently, it's her page to change.
- Na Wahine 2023: Jay did the Kane sprint, Michelle did the standalone 5K. The page says so; her 5K time isn't on the card because I haven't found that sheet.
- Trainers moved from "late October" to Labor Day weekend per you; the October videos are still the first ones about them.

## From Jay's 2024 account (Sept 10, 2026)

`content/seasons/2024.md` is the narrative, lightly edited. Facts from it went onto the Honolulu Triathlon, Honu, Dick Evans, and marathon pages for 2024, the Augusta and Texas 2025 pages, and the About timeline. Strava confirms the bike volume exactly: Jay 1,712 miles in 2023 and 4,938 in 2024 (Michelle 1,104 and 4,635).

- ~~Augusta 2024 date~~ **Confirmed by Jay: Sunday, September 29, 2024, Helene on Friday the 27th.** Augusta 2025 was Sunday, September 28, which matches the sheet.
- **Running volume.** Jay remembered over 1,200 miles of running in 2024 against about 760 in 2023. Strava has 719 and 1,067 (Michelle 536 and 783). The season page uses Strava's numbers, rounded, and says so. If Garmin has a different total, say which one to trust.
- **Spartan Beast, Mokuleia, Aug 17, 2024.** New page from Strava; both watches say about 4:43, Jay remembered about five hours, and the page says both. Jay's Sprint in Nashville the next morning (1:24:27) was on his Strava too, so he's on that page and the Trifecta is both of theirs. Jay's left shoulder, hurt on an eight-foot wall at the Beast and still not healed, is flagged for a future page.
- **Honolulu Triathlon 2024 improvements.** Jay remembered "more than 20 minutes" and "about 15" for Michelle. The sheets say 26:01 and 25:49, so the site uses those.
- ~~Michelle's road bike~~ **Answered.** Road bike through Honu 2024; the tri bike came that summer and was packed for Augusta. The Honolulu Triathlon 2024 page no longer credits her a tri bike.
- **Jay's estimate of a full-swim Honu time** (about 5:56) is on the season page as his guess and nowhere on a card.
- **Michelle at Augusta 2024.** Anything from her side of the cancellation would give the Augusta 2025 page a better opening.

## From the RaceResult sweep (Sept 9, 2026)

Every past Honolulu event on my.raceresult.com was searched for both names. Six races were missing from the site and now have pages: King's Runner 2025 and 2026, Hapalua 2025 and 2026, Honolulu Triathlon 2025 and 2026. Two of them are news: Michelle's half PR is the 2025 Hapalua (1:58:02, not Windward), and she won the 45-49s at the 2025 Honolulu Triathlon, her second age-group win. Jay's 10K PR is the 2025 King's Runner (42:53) and his half PR the 2025 Hapalua (1:38:34). The bodies of the six new pages are short and say they weren't written up at the time; send a line or two on any of them and they grow. Na Wahine 2024 and 2025 were checked too; neither of you is on those sheets.

## From the Strava race sweep (Sept 9, 2026)

Every race-flagged or race-named activity on both Strava accounts since 2022 was compared against the site. Athlinks blocks machine reading, so the Great Aloha Run times for 2023, 2024, and 2025 are from your watches, labeled that way on the cards. Also from watches: Akahai 2023 (Jay), Ku'ikahi 2023, Dick Evans 2023, King's Runner 2024, Haleiwa 2024, Ho'omau 10K 2023, Spartan Super and Sprint in Nashville 2024, Tour of Hawaii Kai Half 2026, Roughwater 2025. The 2023 Honolulu Century page now says 79 miles, since both watches did.

Questions this raised:
- Michelle's Nashville Sprint says it was for a Trifecta, which needs a Beast (21K) in the same year. Where was the Beast? It isn't on Strava under any race-like name.
- "Versailles 70.3 IM Route," July 12, 2026, 56 miles, both of you. A ride of the IRONMAN 70.3 Versailles course on a trip? It isn't on the site as anything.
- Akahai 2023: Michelle's time, if she ran it (she wasn't on Strava yet).
- Great Aloha Run 2026 (Feb 16): not on either Strava, so I've said you didn't run it and the race said goodbye after that edition.
- IRONMAN 70.3 Northern California is in Redding; the page now says so.

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
