import fs from "node:fs";
import matter from "gray-matter";
const RR = (id) => `https://my.raceresult.com/${id}/results`;
const pages = [
  { slug: "kings-runner-10k-2025", date: "2025-03-02", author: "Jay", title: "King's Runner 10K 2025: 42:53 and fourth in the age group", deck: "Fastest 10K on this site for me, five weeks out from IRONMAN Texas. Michelle 53:52 and tenth in hers.", event: "King's Runner 10K", location: "Honolulu", distance: "10K", discipline: "run", context: ["peak_build"], tags: ["10k", "speed", "milestone"], source: RR(326971),
    results: { jay: { time: "42:53", agegroup: "M50-54", agrank: 4, place: 106, bib: 126 }, michelle: { time: "53:52", agegroup: "F40-44", agrank: 10, place: 647, bib: 780 } },
    body: `A flat town 10K in early March, seven weeks before [IRONMAN Texas](/races/ironman-texas-2025), and the fastest 10K either of us has run with a number on. For me it was 42:53, fourth in the 50-54s, and I usually run this race as a check on where the legs are after a winter of long slow miles. That winter the legs were somewhere I hadn't been before. Michelle ran 53:52 for tenth in her age group, and it was the last race she ran as a 40-44 before the birthday moved her up.

We didn't film this one and didn't write it up at the time, so the card is the report. The next race was the [Windward Half](/races/windward-half-2025) three weeks later, where I won the age group and Michelle went under two hours for the first time.` },
  { slug: "hapalua-half-2025", date: "2025-04-13", author: "Michelle", title: "Hapalua 2025: my half-marathon PR", deck: "1:58:02, three weeks after my first sub-two at Windward. Jay 1:38:34 and ninth in his age group, a PR for him too.", event: "Hapalua Half Marathon", location: "Waikiki and Diamond Head, Honolulu", distance: "13.1 mi", discipline: "run", featured: true, context: ["peak_build", "heat_day"], tags: ["half marathon", "heat", "milestone", "michelle"], source: RR(334584),
    results: { jay: { time: "1:38:34", agegroup: "M50-54", agrank: "9/247", genderRank: "174", place: 192, pace: "7:31", bib: 9331, splits: { "5k": "23:45", "10k": "47:10", "15k": "1:10:40", "20k": "1:33:02" } }, michelle: { time: "1:58:02", agegroup: "F45-49", agrank: "19/289", genderRank: "283", place: 1143, pace: "9:00", bib: 11348, splits: { "5k": "28:14", "10k": "56:22", "15k": "1:24:37", "20k": "1:51:16" } } },
    body: `I want to be upfront: I didn't know this was a PR until we pulled the sheet a year and a half later. I knew I'd gone under two hours again, three weeks after doing it for the first time at [Windward](/races/windward-half-2025), and I knew the Hapalua in April is warmer at the start than a March morning on the windward side. What I didn't know was that 1:58:02 was 51 seconds faster than Windward, on the course with Diamond Head in the middle of it, two weeks before we flew to Texas for a full Ironman.

Jay ran 1:38:34, ninth in the 50-54s, and that's his half PR too. Two PRs on the same morning in the middle of a full-distance build tells you what kind of shape we were in that spring, and I'm choosing to enjoy that now since I didn't get to at the time.

We didn't write this one up or film it. The splits are on the card and they're steady, which for me on that course is the whole story.` },
  { slug: "honolulu-triathlon-2025", date: "2025-05-18", author: "Michelle", title: "Honolulu Triathlon 2025: first in my age group", deck: "2:47:11 and the top of the 45-49s, three weeks after IRONMAN Texas. Jay 2:26:29 and second in his.", event: "Honolulu Triathlon (Olympic)", location: "Ala Moana Beach Park, Honolulu", distance: "1.5K swim / 40K bike / 10K run", discipline: "tri", featured: true, context: ["peak_build", "post_ironman"], tags: ["olympic", "triathlon", "milestone", "michelle"], source: RR(337972),
    results: { jay: { time: "2:26:29", agegroup: "M50-54", agrank: 2, place: 42, swim: "31:05", t1: "2:54", bike: "1:04:25", t2: "1:41", run: "46:24", bib: 1368 }, michelle: { time: "2:47:11", agegroup: "F45-49", agrank: 1, place: 144, swim: "32:33", t1: "3:02", bike: "1:13:39", t2: "3:05", run: "54:52", bib: 1369 } },
    body: `Here's one the site had wrong until we went looking. My first age-group win was the [Ku'ikahi 10K](/races/kuikahi-10k-2023) in 2023, and I've been telling people it was the only one in the house that's mine. It isn't. Three weeks after [IRONMAN Texas](/races/ironman-texas-2025), on legs that were still finding out what a full Ironman costs, I won the 45-49s at the Honolulu Triathlon. 2:47:11. Jay was second in his age group at 2:26:29, which is the closest we've come to both being on the podium on the same morning.

Was I racing it? Honestly, no. Three weeks after a full you don't race an Olympic, you go and see what's there. What was there was a 54-minute run off the bike, my best on that course, and a swim and a bike a minute or two off the year before. The full had cost something. It hadn't cost as much as I'd assumed.

Two weeks later was [Honu](/races/honu-70-3-2025), which is the race that actually told us what April had cost.` },
  { slug: "kings-runner-10k-2026", date: "2026-03-01", author: "Michelle", title: "King's Runner 10K 2026: the first race of a rebuild year", deck: "57:47 for me, 48:03 for Jay. Five minutes slower each than 2025, and that was the plan.", event: "King's Runner 10K", location: "Honolulu", distance: "10K", discipline: "run", context: ["rebuild"], tags: ["10k", "consistency"], source: RR(382075),
    results: { jay: { time: "48:03", agegroup: "M50-54", agrank: 15, place: 303, bib: 176 }, michelle: { time: "57:47", agegroup: "F45-49", agrank: 19, place: 1072, bib: 1089 } },
    body: `A year earlier on this course Jay ran [42:53](/races/kings-runner-10k-2025) and I ran 53:52, at the top of a build that ended with two full Ironmans. This year it was 48:03 and 57:47, and I'm putting both years on the same page on purpose, because the number by itself reads like something went wrong.

Nothing went wrong. 2026 is the year we brought the volume down before our bodies did it for us, and a 10K in March is where that shows first. Was it fun to see 57 on the clock? Not especially. But I ran the whole thing, my hip didn't have anything to say, and that was the job that morning.

We didn't write this one up or film it. The card is the report, and the [Hapalua](/races/hapalua-half-2026) six weeks later is the next data point in the same story.` },
  { slug: "hapalua-half-2026", date: "2026-04-12", author: "Jay", title: "Hapalua 2026: six minutes off, on purpose", deck: "1:44:22 for me, 2:09:30 for Michelle, a year after we both set our half PRs on this course. A rebuild year looks like this on a timing sheet.", event: "Hapalua Half Marathon", location: "Waikiki and Diamond Head, Honolulu", distance: "13.1 mi", discipline: "run", context: ["rebuild", "heat_day"], tags: ["half marathon", "heat", "consistency"], source: RR(388143),
    results: { jay: { time: "1:44:22", agegroup: "M50-54", agrank: "17/258", place: 414, bib: 1251, splits: { "5k": "25:17", "10k": "50:06", "15k": "1:15:26", "20k": "1:38:56" } }, michelle: { time: "2:09:30", agegroup: "F45-49", agrank: "45/317", place: 2117, bib: 1250, splits: { "5k": "31:16", "10k": "1:01:40", "15k": "1:32:38", "20k": "2:01:58" } } },
    body: `A year earlier this race was a [PR for both of us](/races/hapalua-half-2025), 1:38 for me and 1:58 for Michelle, in the middle of a build toward a full Ironman. This year it was 1:44:22 and 2:09:30, six minutes and eleven minutes slower on the same course, and if you only look at the ledger that reads like decline. It isn't. 2026 was the year we brought the volume down after two years at the top of it, and the Hapalua in April is where the difference shows up in a number.

The splits on the card are steady for both of us, which is what I care about in a year like this: I ran even 5Ks all the way through instead of going out fast and paying for it on Diamond Head, and so did Michelle. The race is the same race, warm at the start in April and warmer by the time you come back around the crater.

We didn't write this one up at the time. Five weeks later was the [Honolulu Triathlon](/races/honolulu-triathlon-2026), and two weeks after that, [Honu](/races/honu-70-3-2026).` },
  { slug: "honolulu-triathlon-2026", date: "2026-05-17", author: "Jay", title: "Honolulu Triathlon 2026: the fourth one on this course", deck: "2:28:38 for me and 2:52:43 for Michelle, two minutes and five minutes off last year, two weeks before Honu.", event: "Honolulu Triathlon (Olympic)", location: "Ala Moana Beach Park, Honolulu", distance: "1.5K swim / 40K bike / 10K run", discipline: "tri", context: ["rebuild"], tags: ["olympic", "triathlon", "consistency"], source: RR(397811),
    results: { jay: { time: "2:28:38", agegroup: "M50-54", agrank: 7, place: 84, swim: "24:49", t1: "4:07", bike: "1:05:26", t2: "2:51", run: "51:25", bib: 388 }, michelle: { time: "2:52:43", agegroup: "F45-49", agrank: 6, place: 269, swim: "27:19", t1: "3:35", bike: "1:13:30", t2: "3:21", run: "1:04:58", bib: 389 } },
    body: `We've done this race in [2014](/races/honolulu-triathlon-2014-and-again), 2023, [2024](/races/honolulu-triathlon-2024), [2025](/races/honolulu-triathlon-2025), and now 2026, and it's the best measuring stick we have, because the course doesn't change and it always sits two weeks before Honu. For me it was 2:28:38, seventh in the 50-54s, about two minutes off last year. Michelle went 2:52:43, sixth in hers, five minutes off the year she won it.

The swim was quicker than 2025 for both of us and the bike was within a minute, so the difference was the run, and the run is where a lighter year shows first. That's fine. The point of 2026 was to get to the start line of [Honu](/races/honu-70-3-2026) healthy, and two weeks later we did.

We didn't write this one up at the time. The card is the report.` },
];
const results = JSON.parse(fs.readFileSync("content/results.json", "utf8"));
for (const p of pages) {
  const data = { title: p.title, deck: p.deck, date: p.date, event: p.event, location: p.location, distance: p.distance, discipline: p.discipline, athletes: "Both", author: p.author,
    result: `Jay ${p.results.jay.time} · Michelle ${p.results.michelle.time}` };
  if (p.featured) data.featured = true;
  data.context = p.context; data.tags = p.tags; data.results = p.results; data.resultSource = p.source;
  const path = `content/races/${p.slug}.md`;
  fs.writeFileSync(path, matter.stringify(p.body.trim() + "\n", data));
  results.push({ event: `${p.event} ${p.date.slice(0, 4)}`, date: p.date, source: "raceresult", url: p.source,
    athletes: { jay: { ...p.results.jay, gender_rank: p.results.jay.genderRank }, michelle: { ...p.results.michelle, gender_rank: p.results.michelle.genderRank } } });
}
results.sort((a, b) => (a.date < b.date ? -1 : 1));
fs.writeFileSync("content/results.json", JSON.stringify(results, null, 1));
console.log("created", pages.length, "pages");
