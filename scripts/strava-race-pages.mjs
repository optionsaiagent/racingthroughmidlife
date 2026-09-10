import fs from "node:fs";
import matter from "gray-matter";
const OWN = "own watch (Strava); no timing sheet found";
const r = (time, extra = {}) => ({ time, splits: { Source: OWN }, ...extra });
const newPages = [
  { slug: "great-aloha-run-2024", date: "2024-02-19", author: "Michelle", event: "Great Aloha Run", location: "Aloha Tower to Aloha Stadium, Honolulu", distance: "8.15 mi", discipline: "run", context: ["together_on_purpose", "training_day"], tags: ["consistency", "couples"],
    title: "Great Aloha Run 2024: two seconds ahead of Jay", deck: "1:19:22 for me, 1:19:24 for Jay, side by side on Presidents' Day. Then I ran back to the start.", results: { jay: r("1:19:24"), michelle: r("1:19:22") },
    body: `We ran this one together, and by our watches I crossed two seconds ahead of Jay, which I'm mentioning because it's on the record and he can't argue with a watch. Six minutes faster than the year before for both of us, in the winter that ended with our first Honu together.

Then I ran back. There's a second activity on my Strava that morning called the Reverse Great Aloha Run, 8.7 miles from the stadium back toward town, because we'd taken the shuttle out and I wanted the miles. Was that smart in February with a 70.3 in June? It was a long-run day, and a long run is a long run.

The times are from our watches. The official results live on Athlinks, which we can't read by machine, so if either of us finds the finisher email these get replaced.` },
  { slug: "great-aloha-run-2025", date: "2025-02-17", author: "Jay", event: "Great Aloha Run", location: "Aloha Tower to Aloha Stadium, Honolulu", distance: "8.15 mi", discipline: "run", context: ["peak_build", "together_on_purpose", "training_day"], tags: ["consistency", "couples", "marathon"],
    title: "Great Aloha Run 2025: the warm-up was longer than the race", deck: "We ran 7.7 miles from the stadium to the start, then raced 8 back. Ten weeks out from IRONMAN Texas, that was the long run.", results: { jay: r("1:18:03"), michelle: r("1:18:09") },
    body: `Ten weeks out from [IRONMAN Texas](/races/ironman-texas-2025) the plan called for a long run on Presidents' Day, and the Great Aloha Run is only 8.15 miles, so we parked at the stadium and ran to the start. Stadium to Aloha Tower, 7.7 miles, as the warm-up, then the race back to where the car was. Sixteen miles total, with a start line and aid stations in the middle of it, which is the best kind of long run.

For me it was 1:18:03 for the race itself, and Michelle came in six seconds behind at 1:18:09. Both of those are a minute faster than 2024, on legs that had already done nearly eight miles. The times are from our watches, since the official results are on Athlinks and we can't pull them by machine.

We didn't run it in 2026. The race said goodbye after the 2026 edition, and we were in a rebuild year and let it go.` },
  { slug: "kings-runner-10k-2024", date: "2024-03-03", author: "Jay", event: "King's Runner 10K", location: "Honolulu", distance: "10K", discipline: "run", context: ["peak_build"], tags: ["10k", "speed"],
    title: "King's Runner 10K 2024: two minutes off the year before", deck: "44:36 for me and 57:18 for Michelle, by our watches, at the top of the spring that led to the 3:41 marathon.", results: { jay: r("44:36"), michelle: r("57:18") },
    body: `This is the flat town 10K we run in early March to find out where the legs are, and in 2024 the answer was two minutes faster than [2023](/races/kings-runner-10k-2023) for me, 44:36 by the watch. Michelle ran 57:18. A year later on this course I'd run [42:53](/races/kings-runner-10k-2025), so this was the middle step.

The official sheet for 2024 isn't posted anywhere we can read, so these are from our watches. The next race was the [Windward Half](/races/windward-half-2024) three weeks later.` },
  { slug: "haleiwa-metric-century-2024", date: "2024-04-28", author: "Michelle", event: "Haleiwa Metric Century", location: "North Shore, Oahu", distance: "100 km", discipline: "bike", context: ["peak_build", "training_day"], tags: ["bike", "long ride", "70.3", "north shore"],
    title: "Haleiwa Metric Century 2024: my longest ride before Honu", deck: "62 miles on the North Shore, five weeks before my first 70.3. Jay 3:07, me 3:54, by our watches.", results: { jay: r("3:07:06", { miles: 62.2 }), michelle: r("3:54:38", { miles: 62.2 }) },
    body: `Five weeks before [my first Honu](/races/honu-70-3-2024), this was the longest organized ride I'd done: 62 miles out of Haleiwa with the Hawaii Bicycling League, rest stops every twenty miles, and the North Shore wind doing what it does. Jay rode it in 3:07. I rode it in 3:54, and I was fine with that, because the point was the hours in the saddle and the eating, not the time. It's a ride, not a race, so there's no sheet; the times are from our watches.

Jay had done this ride the [year before](/races/haleiwa-metric-century-2023) on the old road bike as his own bridge to Honu. This year it was mine.` },
  { slug: "hoomau-10k-2023", date: "2023-06-10", author: "Michelle", event: "Ho'omau 10K", location: "Oahu", distance: "10K", discipline: "run", context: ["post_ironman", "training_day"], tags: ["10k", "recovery"],
    title: "Ho'omau 10K 2023: the Saturday after Honu", deck: "A week after Jay's first 70.3, an easy 10K together. 1:02 for both of us, by our watches, and nobody was racing.", results: { jay: r("1:02:24"), michelle: r("1:02:20") },
    body: `Seven days after Jay came through the finish at [Honu](/races/honu-70-3-2023), we ran a 10K together at an hour and two minutes, which for us is a conversation pace. It was on the calendar and we went, and that was the whole ambition. Jay's legs had a half Ironman in them and mine had the Hibiscus PR from two weeks earlier, and the family was about to land for June.

We didn't write it up at the time and the timing sheet isn't somewhere we can read, so the times are from our watches. It's here because the [week after a big race](/notes/the-week-after-the-marathon) is a real part of a season, and this is what ours looked like that June.` },
  { slug: "spartan-super-nashville-2024", date: "2024-10-05", author: "Jay", event: "Spartan Super (10K, obstacles)", location: "Nashville, Tennessee", distance: "10K with obstacles", discipline: "trail", context: ["travel_race", "together_on_purpose"], tags: ["trail", "travel", "obstacles"],
    title: "Spartan Super, Nashville 2024: mud, walls, and a 10K", deck: "The one race on this site with obstacles. Two hours and twenty-four minutes on the clock for both of us, on a Tennessee hillside in October.", results: { jay: r("2:24:33", { miles: 6.3 }), michelle: r("2:24:34", { miles: 6.7 }) },
    body: `This is the one race on the site that isn't a swim, a bike, or a run, and it's the only one where "finish time" includes climbing over things. A Spartan Super is a 10K, more or less, with obstacles: walls, ropes, carries, mud, and the kind of hills a Honolulu runner doesn't have at home. We did it together in Nashville in October 2024, two months before the [marathon](/races/honolulu-marathon-2024), and the elapsed time on both our watches says 2:24, a second apart, which tells you we stayed together the whole way.

Michelle went back the next morning and did the Sprint, the 5K version, in 1:25 by her watch, because she was working on a Trifecta. That's hers to explain.

No timing sheet on this one, so the times are from our watches, and the only useful training note is that a full Ironman build handles a Spartan fine and a Spartan handles your forearms in a way a full Ironman build does not.` },
  { slug: "spartan-sprint-nashville-2024", date: "2024-10-06", author: "Michelle", event: "Spartan Sprint (5K, obstacles)", location: "Nashville, Tennessee", distance: "5K with obstacles", discipline: "trail", context: ["travel_race"], tags: ["trail", "travel", "obstacles", "michelle"],
    title: "Spartan Sprint, Nashville 2024: the morning after", deck: "4.3 miles and every obstacle again, the day after the Super, because I was working on a Trifecta. 1:25 by my watch.", results: { michelle: r("1:25:55", { miles: 4.3 }) },
    body: `The morning after the [Super](/races/spartan-super-nashville-2024), I went back and did the Sprint by myself. Jay had done his one Spartan and was done, which is fair. I had a reason: a Spartan Trifecta is the three distances in one calendar year, and this was one of them. Was it a good idea to do the walls again on arms that had done the walls the day before? It was a 5K, and I'd flown to Tennessee, and I wasn't going to leave one on the table.

1:25 elapsed by my watch, 4.3 miles with the detours the course takes. No timing sheet I can get to, so that's the number.` },
  { slug: "tour-of-hawaii-kai-half-2026", date: "2026-01-11", author: "Jay", event: "The Tour of Hawaii Kai Half-Marathon", location: "Hawaii Kai, Oahu", distance: "13.1 mi", discipline: "run", context: ["rebuild", "post_ironman"], tags: ["half marathon", "consistency"],
    title: "Tour of Hawaii Kai Half 2026: a January half in a rebuild year", deck: "2:08:14 by my watch, four weeks after the marathon, the first long race of a year that was supposed to be slower.", results: { jay: r("2:08:14", { miles: 13.3 }) },
    body: `Four weeks after the [2025 marathon](/races/honolulu-marathon-2025) I ran a half in Hawaii Kai, the east end of the marathon course, at 2:08 by my watch. That's twenty minutes slower than my halves from the spring before, and it was supposed to be. 2026 was the year we brought the volume down, and a January half run easy, a month after a marathon run injured beside Michelle, is what the start of a rebuild looks like on a Sunday.

No timing sheet I've found for this one, so the time is from the watch. Michelle didn't run it.` },
];
const updates = {
  "great-aloha-run-2023": { athletes: "Both", result: "Jay 1:25:56 · Michelle 1:25:07 (our own watches)", results: { jay: r("1:25:56"), michelle: r("1:25:07") }, note: "Michelle ran it faster than Jay that year, by 49 seconds on the watches. The official results are on Athlinks, which we can't read by machine, so these are ours." },
  "akahai-half-2023": { athletes: "Jay", result: "Jay 1:53:55 (own watch)", results: { jay: r("1:53:55") }, note: "Jay's watch says 1:53:55. Michelle wasn't on Strava yet that January, and the race's results aren't posted anywhere we can read, so hers isn't on the card." },
  "kuikahi-10k-2023": { result: "Michelle 1:01:56, 1st in age group · Jay 50:49 (our own watches)", results: { michelle: r("1:01:56", { agegroup: "F40-44", agrank: 1 }), jay: r("50:49") }, athletes: "Both", note: "The age-group win is from the video and the podium. The times are from our watches, since Aloha Racing's results aren't posted anywhere we can read." },
  "dick-evans-112-2023": { result: "Jay 6:19:54 moving, 6:24:36 elapsed (own watch)", results: { jay: r("6:24:36", { miles: 112.0, splits: { "Moving time": "6:19:54", Source: OWN } }) }, athletes: "Jay", note: "The 2023 edition never made it onto Webscorer, where 2022, 2024, and 2025 are, so the time here is from Jay's watch: 6:24:36 elapsed, 6:19:54 of it moving." },
  "honolulu-century-ride-2023": { result: "Jay 5:36 moving · Michelle 5:45 moving (79 mi, own watches)", results: { jay: r("5:36:10", { miles: 79.3, splits: { "Elapsed with stops": "7:04:57", Source: OWN } }), michelle: r("5:45:55", { miles: 79.4, splits: { "Elapsed with stops": "7:05:10", Source: OWN } }) }, athletes: "Both", distance: "79 mi (the 75-mile option, by the watch)", note: "Our watches say 79 miles, so this was the 75-mile turnaround and not the full hundred, seven hours door to door with the rest stops. Jay's Strava title for the day is \"Century'ish Ride,\" which is honest." },
  "waikiki-roughwater-swim-2025": { results: { jay: r("1:30:01"), michelle: r("1:30") }, result: "Jay 1:30:01 · Michelle about 1:30 (own watches)" },
  "northern-california-70-3-2026": { location: "Redding, California" },
};
const results = JSON.parse(fs.readFileSync("content/results.json", "utf8"));
for (const p of newPages) {
  const data = { title: p.title, deck: p.deck, date: p.date, event: p.event, location: p.location, distance: p.distance, discipline: p.discipline,
    athletes: p.results.jay && p.results.michelle ? "Both" : p.results.jay ? "Jay" : "Michelle", author: p.author,
    result: [p.results.jay && `Jay ${p.results.jay.time}`, p.results.michelle && `Michelle ${p.results.michelle.time}`].filter(Boolean).join(" · ") + " (our own watches)",
    context: p.context, tags: p.tags, results: p.results };
  fs.writeFileSync(`content/races/${p.slug}.md`, matter.stringify(p.body.trim() + "\n", data));
  results.push({ event: `${p.event} ${p.date.slice(0, 4)}`, date: p.date, source: "self-reported via Strava (own watches)", url: null, athletes: Object.fromEntries(Object.entries(p.results).map(([k, v]) => [k, { time: v.time }])) });
}
for (const [slug, u] of Object.entries(updates)) {
  const path = `content/races/${slug}.md`; const f = matter.read(path);
  for (const [k, v] of Object.entries(u)) if (k !== "note") f.data[k] = v;
  let body = f.content.trimEnd();
  if (u.note) body += "\n\n" + u.note + "\n";
  fs.writeFileSync(path, matter.stringify(body + "\n", f.data));
  if (u.results) results.push({ event: `${f.data.event} ${f.data.date.slice(0, 4)}`, date: f.data.date, source: "self-reported via Strava (own watches)", url: null, athletes: Object.fromEntries(Object.entries(u.results).map(([k, v]) => [k, { time: v.time }])) });
}
results.sort((a, b) => (a.date < b.date ? -1 : 1));
fs.writeFileSync("content/results.json", JSON.stringify(results, null, 1));
console.log("new pages", newPages.length, "updated", Object.keys(updates).length);
