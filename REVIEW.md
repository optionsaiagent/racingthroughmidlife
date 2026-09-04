# Before this goes live: things for Jay and Michelle to confirm

Everything on the site was written from the live v1 site, the 57 YouTube titles, and the background brief. Where the sources were thin, the copy stays general and the page says so. Nothing below is a guess presented as fact on a page, but each item is an inference or a gap that you can settle in a minute and we cannot.

Fix by editing the Markdown file named. Delete a line here when it is settled.

## Facts to confirm

1. **Two Honolulu Marathons, not one.** The v1 page "The marathon Jay never wanted" is dated 2022-12-11, which is the date of the 2022 Honolulu Marathon. The 2023 vlog opens with "lose the holiday five" in January and ends with "Dec Week 2 - The 2023 Honolulu Marathon." The site now treats those as two separate marathons: `content/races/honolulu-marathon-for-fifty.md` (Dec 2022, the 50th) and `content/races/honolulu-marathon-2023.md` (Dec 2023). If you only ran one, delete one file and fix the About timeline in `src/app/about/page.tsx`.

2. **Who raced Ironman Texas 2025, and the official times.** `content/races/ironman-texas-2025.md` deliberately never says who was on the course. Add `athletes:` and `result:` to the frontmatter when you have them.

3. **Did a full happen in 2024?** The v1 "Going the full distance" post (Oct 2024) implied 140.6 was done. It is now an essay about the decision (`content/races/going-the-full-distance.md`, marked `essay: true` so it does not appear in the ledger as a race). If there was a 2024 full, it needs its own race file.

4. **Hibiscus 2022 date.** Set to May 2022, month precision. If you have the day, set `date:` and remove `datePrecision`.

5. **Honu 2023 swim location.** The page says Waikoloa, per the brief. If it was Hapuna Beach that year, change `content/races/honu-70-3-2023.md`.

6. **The Waikiki 2.4-mile swim.** If it was the Waikiki Roughwater Swim, say so in `content/races/waikiki-2-4-mile-swim-2023.md` and in `src/lib/calendar.ts`.

7. **Oahu Pentathlon.** The page has no event details because none were available. Add what the five events were and the date.

8. **Kaena Point 10 Mile.** Year precision only. Set the date.

9. **Who raced what.** Only these have `athletes:` set: Hibiscus 2022 and 2023, both marathons, Honolulu Tri (Both), Honu (Jay), Ku'ikahi 10K (Michelle). Every other 2023 race leaves it out. Add `athletes:` where you know it.

10. **Michelle's Ku'ikahi 10K result** is listed as "1st, age group" from the video title. Add the official time next to it if you have it.

11. **Month-precision dates.** Most 2023 race dates are inferred from the "Month Week N" video titles and display as "March 2023 (approx.)". Replace with exact dates when you can. The page stops saying "approx." the moment `datePrecision` is removed.

12. **Ed.** The Hibiscus 2023 page mentions your friend Ed by first name, as the v1 site did. Confirm he is fine with that.

13. **House number in a photo.** `public/images/bikes-rack.jpg` (used on the About page and the Dick Evans report) shows a street number on the house behind the bikes. It was on the v1 site too. Crop it or swap the photo if you would rather not have it public.

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
