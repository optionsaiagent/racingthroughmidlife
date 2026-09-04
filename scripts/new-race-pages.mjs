import fs from "node:fs";
import matter from "gray-matter";
const results = JSON.parse(fs.readFileSync("content/results.json", "utf8"));
const byEvent = Object.fromEntries(results.map((r) => [r.event, r]));
const IM703 = "https://labs-v2.competitor.com/results/event/5398aa20-f278-e111-b16a-005056956277";
function clean(a) {
  if (!a) return undefined;
  const out = { time: a.time };
  const put = (k, v) => { if (v !== undefined && v !== null && v !== "" && v !== "None") out[k] = v; };
  put("agegroup", a.agegroup); put("agrank", a.agrank); put("place", a.place); put("genderRank", a.gender_rank);
  put("pace", a.pace); put("swim", a.swim); put("t1", a.t1); put("bike", a.bike); put("t2", a.t2); put("run", a.run);
  put("run1", a.run1); put("run2", a.run2); if (a.splits) out.splits = a.splits; put("bib", a.bib);
  return out;
}
const pages = [
  // ---- 2014
  { slug: "tinman-triathlon-2014", ev: "Tinman Triathlon 2014", title: "Tinman Triathlon 2014: the one before the bug landed", deck: "Two months after the 2014 Honolulu Tri, with no training to speak of. The only 2014 result that's still online, and it's on this page because it's ours.", date: "2014-07-20", datePrecision: "month", event: "Tinman Triathlon", location: "Honolulu", distance: "Olympic-ish (0.5 mi swim / 25 mi bike / 6.2 mi run)", discipline: "tri", tags: ["triathlon", "2014", "progression"], body: `Jay talked Michelle into the Honolulu Triathlon in May 2014, and then into this one two months later. We weren't training. We had jobs and a vague idea that a triathlon was a thing you could just show up to.

Then we more or less stopped for eight years.

## The record

We couldn't find the 2014 Honolulu Tri results anywhere online. The Tinman results are still up on Timeline Hawaii, so here they are: Jay 2:40:58, Michelle 3:08:27, in age groups that make us feel old to type. That's what an untrained triathlon looks like, and it's not embarrassing. It's a Sunday.

## Why it's here

Because the ladder has a bottom rung, and this is it. Nine years later, on a bike he'd actually ridden, Jay went to [Honu](/races/honu-70-3-2023). The 2014 version of him would not have believed that.` },
  // ---- 2022
  { slug: "norman-tamanaha-15k-2022", ev: "2022 Norman Tamanaha 15K", title: "Norman Tamanaha 15K 2022: the first bib of the marathon build", deck: "August 2022, four months before Jay's 50th-birthday marathon. First race in the readiness series, and the first time either of us had run a 15K with a number on.", date: "2022-08-14", event: "Norman Tamanaha 15K", location: "Honolulu", distance: "15K", discipline: "run", series: "Marathon Readiness Series 1 of 5", tags: ["marathon", "readiness series", "heat"], body: `This was before the camera and before the log, so there's no video and no notes. There's a timing sheet, and it's on the card.

What we remember is that the marathon was four months away, the long run was still short, and a 15K in August felt like a lot. It was. Jay ran it under 1:23, Michelle in 2:16, and both of those numbers came down a long way over the next two years.

The readiness series [became the plan](/lessons/let-the-calendar-be-the-plan) in 2023. In 2022 we were just doing what the calendar said, which turns out to be the same thing.` },
  { slug: "runners-hi-20k-2022", ev: "2022 Runner’s HI 20K", title: "Runner's HI 20K 2022: twelve miles in September", deck: "Second race of the 2022 readiness series. The longest either of us had run since the Hibiscus Half in May.", date: "2022-09-04", event: "Runner's HI 20K", location: "Honolulu", distance: "20K", discipline: "run", series: "Marathon Readiness Series 2 of 5", tags: ["marathon", "readiness series", "heat"], body: `No video, no notes, just the sheet. Jay 1:48, Michelle 2:23, in September heat, three months before the [marathon](/races/honolulu-marathon-for-fifty).

The 20K is where the readiness series stops being a fun run and starts being the long run. We didn't know that yet in 2022. We found out at mile ten.` },
  { slug: "old-pali-road-5k-2022", ev: "2022 Old Pali Road 5K", title: "Old Pali Road 5K 2022: Michelle, on her own", deck: "A 5K on the old Pali road in September 2022. Michelle's race. Jay's name isn't on the sheet.", date: "2022-09-10", event: "Old Pali Road 5K", location: "Old Pali Road, Nuuanu", distance: "5K", discipline: "run", tags: ["5k", "michelle"], body: `This one's Michelle's alone. The Old Pali Road is the closed-off, overgrown stretch of the original highway over the mountains, and it goes up. A 5K on it isn't a 5K in the flat, fast sense.

44:35 on the card. Not a PR course, not a PR. A morning on a road you can't normally run on.` },
  { slug: "hybrid-design-25k-2022", ev: "2022 Hybrid Design 25K", title: "Hybrid Design 25K 2022: Michelle goes past the half", deck: "Third race in the 2022 readiness series and the first time Michelle ran farther than a half marathon. Jay sat this one out.", date: "2022-10-02", event: "Hybrid Design 25K", location: "Honolulu", distance: "25K", discipline: "run", series: "Marathon Readiness Series 3 of 5", tags: ["marathon", "readiness series", "michelle"], body: `Fifteen and a half miles, two months before her first marathon. 3:09:48 on the card. It's the first time Michelle ran past 13.1 with a bib on, and it's the run that made December believable.

Jay's not on the sheet for this one. We don't remember why, and we're not going to invent a reason.` },
  { slug: "boca-hawaii-30k-2022", ev: "2022 Boca 30K", title: "BOCA Hawaii 30K 2022: the first dress rehearsal", deck: "Eighteen and a half miles in October, seven weeks before the first marathon. Neither of us had ever run this far.", date: "2022-10-23", event: "BOCA Hawaii 30K", location: "Honolulu", distance: "30K", discipline: "run", series: "Marathon Readiness Series 4 of 5", tags: ["marathon", "readiness series", "long run"], body: `The 30K is the longest race in the series and in 2022 it was the longest either of us had ever run, by a lot. Jay 3:01, Michelle 4:08.

A year later we'd learned to [run this one as a rehearsal](/races/boca-hawaii-30k-2023), not a race. In 2022 we didn't know the difference yet. The marathon seven weeks later was survivable anyway, which tells you the series works even when you're doing it wrong.` },
  { slug: "val-nolasco-half-2022", ev: "2022 Val Nolasco Half Marathon", title: "Val Nolasco Half 2022: a month out from the first marathon", deck: "The last race in the 2022 readiness series. Jay under two hours for the first time in a half.", date: "2022-11-13", event: "Val Nolasco Half Marathon", location: "Honolulu", distance: "13.1 mi", discipline: "run", series: "Marathon Readiness Series 5 of 5", tags: ["half marathon", "marathon", "readiness series"], body: `Four weeks before the [marathon for a fiftieth](/races/honolulu-marathon-for-fifty). Jay 1:57:03, which was his first half under two hours. Michelle 2:28:47, sixteen minutes faster than her Hibiscus time six months earlier.

Then the taper, then December, then everything else on this site.` },
  { slug: "kaiwi-coast-fun-run-2022", ev: "2022 Kaiwi Coast Run and Walk", title: "Kaiwi Coast Run 2022: the first one we ran together on purpose", deck: "Three weeks before the first marathon, a fun run on the coast road. Two tenths of a second apart at the finish.", date: "2022-11-20", event: "Kaiwi Coast Run and Walk", location: "Kaiwi coast, east Oahu", distance: "4 mi", discipline: "run", tags: ["taper", "couples", "community"], body: `Look at the times. 40:18.2 and 40:18.4. That's not a coincidence, it's a rule, and it's the first time the rule shows up on a timing sheet.

We've run this one every November since. Same road, same view, same finish, a second or so apart. It's the one race a year where [whose day is it](/lessons/whose-day-is-it) has an easy answer: nobody's.` },
  // ---- 2023
  { slug: "bosetti-sunrise-10k-2023", ev: "2023 Bosetti 10K", title: "Bosetti Sunrise 10K 2023: three weeks after the first marathon", deck: "New Year's Day 2023, the first bib of the year we filmed. Jay third in his age group, which nobody expected three weeks after 26.2.", date: "2023-01-01", event: "Bosetti Sunrise 10K", location: "Hawaii Kai, Oahu", distance: "10K", discipline: "run", tags: ["10k", "new year", "recovery"], body: `The [first video of the vlog year](/notes/january-the-five-pounds-and-the-groove) is about losing the holiday weight. This race is what we did on the morning of the first day of it.

Jay 47:39, third in the 50-54s. Michelle 1:14, three weeks after her first marathon and not remotely interested in racing a 10K. That's the correct attitude for January 1.` },
  { slug: "kailua-shark-chase-2023", ev: "2023 Kailua Beach 4.4 Mile Shark Chase", title: "Kailua Beach Shark Chase 2023: 4.4 miles on the sand", deck: "The July video calls it a fun shark chase at Kailua Beach. It was a race, and Jay won his age group in it.", date: "2023-07-16", event: "Kailua Beach 4.4 Mile Shark Chase", location: "Kailua Beach", distance: "4.4 mi", discipline: "run", tags: ["beach", "community", "windward"], body: `A beach run in the middle of July, six weeks after Honu, in the week we were easing back into anything that looked like training. The video makes it sound like a lark. The timing sheet says Jay was first in his age group and Michelle was fifth in hers, less than a second apart at the line.

Sand is a different sport. Nobody's pace means anything, which is the point of doing one of these.` },
  // ---- 2024
  { slug: "kailua-10-miler-2024", ev: "2024 Kailua 10-Miler", title: "Kailua 10-Miler 2024: Jay's first age-group win", deck: "February on the windward side. Jay first in the 50-54s at 1:19:47, two minutes faster than the year before.", date: "2024-02-25", event: "Kailua 10-Miler", location: "Kailua, windward Oahu", distance: "10 mi", discipline: "run", tags: ["windward", "milestone", "speed"], body: `We didn't film 2024 week by week, so this one lives on the timing sheet and in the year-in-review video. The sheet's good enough.

Jay's first age-group win, a year after being second here. Michelle fifth in hers. Same wind as always, both directions.` },
  { slug: "windward-half-2024", ev: "2024 Windward Half Marathon and 5K", title: "Windward Half 2024: eight minutes faster on the humid side", deck: "The pretty half, second year running. Jay 1:43:49, Michelle 2:14:46, both fourth in their age groups.", date: "2024-03-24", event: "Windward Half Marathon", location: "Windward Oahu", distance: "13.1 mi", discipline: "run", tags: ["half marathon", "heat", "windward"], body: `Eight and a half minutes faster than [the year before](/races/windward-half-2023) for Jay, five for Michelle. The course didn't get shorter and the humidity didn't get lower. That's a year of long runs showing up.

Both of us fourth in our age groups, which is the placing that teaches you the most about the people who beat you.` },
  { slug: "hapalua-half-2024", ev: "Hapalua Half Marathon 2024", title: "Hapalua 2024: ninth in the age group, in April heat", deck: "Hawaii's half, second time around. Jay 1:43:11 for ninth in the 50-54s. Michelle 2:18:53, fourteen minutes faster than 2023.", date: "2024-04-14", event: "Hapalua Half Marathon", location: "Waikiki and Diamond Head, Honolulu", distance: "13.1 mi", discipline: "run", tags: ["half marathon", "heat"], body: `The [2023 Hapalua](/races/hapalua-half-2023) taught us the lesson about going out too fast in Waikiki. The 2024 one is what the lesson looks like on a sheet: nine minutes off for Jay, fourteen for Michelle, on the same course with the same Diamond Head in the middle of it.

Five weeks later was the [Honolulu Triathlon](/races/honolulu-triathlon-2024), and seven weeks later, [Honu](/races/honu-70-3-2024).` },
  { slug: "honolulu-triathlon-2024", ev: "Honolulu Triathlon 2024 (Olympic)", title: "Honolulu Triathlon 2024: twenty-six minutes faster", deck: "Third time at Ala Moana. Jay 2:20:57, Michelle 2:49:02. A year of triathlon, measured on the same course.", date: "2024-05-19", event: "Honolulu Triathlon (Olympic)", location: "Ala Moana Beach Park, Honolulu", distance: "1.5K swim / 40K bike / 10K run", discipline: "tri", tags: ["olympic", "triathlon", "progression"], body: `Same course as [2014 and 2023](/races/honolulu-triathlon-2014-and-again). Jay took 26 minutes off his 2023 time, Michelle took 25 off hers, and most of it came on the bike. That's what a tri bike, a bike fit, and a winter on the trainer do when you put them on the same course a year later.

The swim splits (23 and 26 minutes) suggest the swim was shorter than the year before. We're not going to guess why. Two weeks later was [Honu](/races/honu-70-3-2024), and this was the rehearsal again.` },
  { slug: "honu-70-3-2024", ev: "2024 IRONMAN 70.3 Hawaii", title: "Honu 70.3 2024: Michelle's first, and Jay 81 minutes faster", deck: "Back to the lava, both of us this time. Jay 5:26:37. Michelle 6:40:28 in her first 70.3, 19th in her age group.", date: "2024-06-01", event: "IRONMAN 70.3 Hawaii (Honu)", location: "Waikoloa and Hawi, Big Island", distance: "1.2 mi swim / 56 mi bike / 13.1 mi run", discipline: "tri", featured: true, tags: ["70.3", "honu", "heat", "milestone", "michelle"], resultSource: IM703, body: `A year after [Jay's first](/races/honu-70-3-2023), we went back. Both of us.

Michelle's first 70.3. 6:40:28, 19th in the 40-44s, on the course Jay had spent the previous June being humbled by. Jay went 5:26:37, which is an hour and twenty-one minutes faster than 2023 on the same road to Hawi.

The swim splits on the card are 16 minutes, which isn't a 1.2-mile swim. The swim was shortened that year, and we'll leave it to IRONMAN's own records to say why. The bike and the run were the full distance and the full heat.

We'd been to the Big Island for this race twice now, and it was starting to feel like the anchor of the year. It was. We came back in [2025](/races/honu-70-3-2025) and [2026](/races/honu-70-3-2026).` },
  { slug: "cholos-waimea-bay-2024", ev: "2024 Cholo’s Waimea Bay", title: "Cholo's Waimea Bay 2024: a North Shore swim in June", deck: "An ocean swim at Waimea Bay three weeks after Honu, timed by Timeline Hawaii. Forty-five minutes each, a minute apart.", date: "2024-06-22", event: "Cholo's Waimea Bay Swim", location: "Waimea Bay, North Shore", distance: "Ocean swim (distance not listed on the timing page)", discipline: "swim", tags: ["swim", "north shore", "ocean"], body: `We don't have notes on this one, and the timing page doesn't list a distance, so all we'll say is what's on the sheet: Jay 44:56, Michelle 45:51, in the flat summer water at Waimea Bay.

Waimea in June is a lake. Waimea in December is the reason surfers exist. Pick your month.` },
  { slug: "kailua-shark-chase-2024", ev: "2024 Kailua Beach 4.4-Mile Shark Chase", title: "Kailua Beach Shark Chase 2024: slower on purpose", deck: "The beach run, second year. Eight minutes slower than 2023 and two seconds apart, which tells you whose day it wasn't.", date: "2024-07-14", event: "Kailua Beach 4.4-Mile Shark Chase", location: "Kailua Beach", distance: "4.4 mi", discipline: "run", tags: ["beach", "community", "windward"], body: `55:36 and 55:38. A week after the [Kaena Point Firecracker](/races/kaena-point-10-mile-2024), six weeks after Honu, in the summer stretch where the calendar is mostly short, fun, and on sand.

Nobody raced this. Both fourth in our age groups anyway, because July.` },
  { slug: "norman-tamanaha-15k-2024", ev: "2024 BOCA Norman Tamanaha 15K", title: "Norman Tamanaha 15K 2024: third year, third in the age group", deck: "The readiness series opener, again. Jay 1:14:14, two seconds faster than 2023. Michelle 1:31:33, her fastest 15K.", date: "2024-08-11", event: "Norman Tamanaha 15K", location: "Honolulu", distance: "15K", discipline: "run", series: "Marathon Readiness Series 1 of 5", tags: ["marathon", "readiness series", "heat"], body: `Three years of the same race in August: [1:22 in 2022](/races/norman-tamanaha-15k-2022), [1:14:16 in 2023](/races/norman-tamanaha-15k-2023), 1:14:14 in 2024. Jay's basically found the ceiling for a 15K in that heat, and it's third in the 50-54s. Michelle went 2:16, then 1:33, then 1:31.

Two weeks later Jay rode [around the island again](/races/dick-evans-112-2024).` },
  { slug: "dick-evans-112-2024", ev: "Dick Evans Memorial Road Race 2024", title: "Dick Evans 2024: around the island, second time", deck: "112 miles in August, again. Jay 6:09:26 in the Golden Masters. Michelle wasn't on the start list this year.", date: "2024-08-25", event: "Dick Evans Memorial Road Race", location: "Around Oahu", distance: "112 mi", discipline: "bike", tags: ["bike", "long ride", "full distance"], body: `Second lap of the island for Jay. 6:09:26, which is a long time to be on a bike in August, in a category the race calls Golden Masters, which is a polite way of saying 50 to 59.

We don't have the 2023 result for this race. It wasn't posted on the timing site the 2024 and 2025 editions use, and we're not going to make one up. [The 2023 page](/races/dick-evans-112-2023) has the story; this page has the first official time.

Michelle rode it the [following year](/races/dick-evans-112-2025).` },
  { slug: "val-nolasco-half-2024", ev: "2024 Val Nolasco Half Marathon", title: "Val Nolasco Half 2024: Michelle under 2:10", deck: "A month out from the 2024 marathon. Jay 1:44:44. Michelle 2:08:08, four minutes under her Hibiscus PR, on a check-not-a-race day.", date: "2024-11-10", event: "Val Nolasco Half Marathon", location: "Honolulu", distance: "13.1 mi", discipline: "run", series: "Marathon Readiness Series 5 of 5", tags: ["half marathon", "marathon", "readiness series", "michelle"], body: `The rule for this race is [run it as a check](/races/val-nolasco-half-2023). Michelle ran it as a check and went 2:08:08, which was a half-marathon PR by four minutes over the [Hibiscus 2:12](/races/hibiscus-half-2023) that this whole site keeps bringing up.

Jay 1:44:44, a few seconds off the year before, which is what a check is supposed to look like. Four weeks later, the [marathon](/races/honolulu-marathon-2024), where both of us found out what the year had been for.` },
  { slug: "kaiwi-coast-fun-run-2024", ev: "2024 Kaiwi Coast Run & Walk", title: "Kaiwi Coast Run 2024: the November tradition", deck: "Third year on the coast road, two weeks before the marathon. 36:28 and 36:28.9.", date: "2024-11-24", event: "Kaiwi Coast Run and Walk", location: "Kaiwi coast, east Oahu", distance: "4 mi", discipline: "run", tags: ["taper", "couples", "community"], body: `Four minutes faster than [the year before](/races/kaiwi-coast-fun-run-2023) and still less than a second apart. That's the whole report. The view was the same.` },
  { slug: "honolulu-marathon-2024", ev: "Honolulu Marathon 2024", title: "Honolulu Marathon 2024: 3:41 and 4:39", deck: "The third one. Jay took nineteen minutes off his marathon PR. Michelle took fifty-eight off hers. Same 5 a.m. start, same two Diamond Heads.", date: "2024-12-08", event: "Honolulu Marathon", location: "Ala Moana to Kapiolani Park, Honolulu", distance: "26.2 mi", discipline: "run", featured: true, tags: ["marathon", "milestone", "readiness series", "pacing", "michelle"], body: `We didn't film 2024 a week at a time, so the story of this one is mostly on the card, and the card is loud.

Jay 3:41:11. Nineteen minutes under his 2023 time, forty-one under the [birthday marathon](/races/honolulu-marathon-for-fifty) two years earlier. Michelle 4:39:06. Fifty-eight minutes under 2023, over an hour under 2022. She'd been under 2:10 for a half a month earlier and it turned out that was the honest number.

## What was different

The year. A full 70.3 season with Honu in June, the readiness series run the way it's supposed to be run, and, for Michelle, a bike fit and a trainer that had turned a lot of dawn hours into an engine. Nothing clever happened on race day. Race day is where the year gets audited, and the audit came back clean.

The next December, at the [2025 marathon](/races/honolulu-marathon-2025), we ran it together, slow, on purpose, six weeks after a full Ironman. Different year, different job.` },
  // ---- 2025
  { slug: "bosetti-sunrise-10k-2025", ev: "2025 Bosetti 10K", title: "Bosetti Sunrise 10K 2025: Jay wins the age group, Michelle under an hour", deck: "New Year's Day, third year running. Jay 45:48 for first in the 50-54s. Michelle 59:37 and third in hers.", date: "2025-01-01", event: "Bosetti Sunrise 10K", location: "Hawaii Kai, Oahu", distance: "10K", discipline: "run", tags: ["10k", "new year", "milestone"], body: `Three New Year's mornings in Hawaii Kai: [47:39](/races/bosetti-sunrise-10k-2023), [50:36](/races/bosetti-sunrise-10k-2024), 45:48. The middle one was three weeks after a marathon. This one was three weeks after a 3:41 marathon and it didn't seem to matter.

Michelle under an hour for a 10K for the first time on this site, and third in her age group. The year that followed had two full Ironmans in it. It started here, at sunrise, with a podium each.` },
  { slug: "kailua-10-miler-2025", ev: "2025 Kailua 10-Miler and 5K", title: "Kailua 10-Miler 2025: 1:13 and a second age-group win", deck: "Jay first in the 50-54s again, six and a half minutes faster than 2024. Michelle third in hers, at 1:31.", date: "2025-02-23", event: "Kailua 10-Miler", location: "Kailua, windward Oahu", distance: "10 mi", discipline: "run", tags: ["windward", "milestone", "speed"], body: `Three Februarys: [1:21](/races/kailua-10-miler-2023), [1:19](/races/kailua-10-miler-2024), 1:13. Jay was two months out from a full Ironman and running 7:19 miles on the windward side, which is a strange thing for the guy who didn't like running to do.

Michelle 1:31:23 and third in the 40-44s. Same wind. Faster legs.` },
  { slug: "windward-half-2025", ev: "2025 Windward Half Marathon and 5K", title: "Windward Half 2025: Jay wins it, Michelle under two hours", deck: "The pretty half, third year. Jay 1:41:31 for first in the age group. Michelle 1:58:53, her first half under two hours.", date: "2025-03-23", event: "Windward Half Marathon", location: "Windward Oahu", distance: "13.1 mi", discipline: "run", featured: true, tags: ["half marathon", "heat", "windward", "milestone", "michelle"], body: `Five weeks before [IRONMAN Texas](/races/ironman-texas-2025), and the last real running race before it.

Jay won the 50-54s at 1:41:31. Michelle ran 1:58:53, which is the first time a half marathon on this site starts with a one for her, on the humid side of the island, in March. Two years earlier on the same course she'd run [2:19](/races/windward-half-2023). Whose day was it? Both, for once.` },
  { slug: "honu-70-3-2025", ev: "2025 IRONMAN 70.3 Hawaii", title: "Honu 70.3 2025: five weeks after a full Ironman", deck: "Third Honu for Jay, second for Michelle, thirty-five days after Texas. 5:44:12 and 6:44:44, tenth and eleventh in the age groups.", date: "2025-05-31", event: "IRONMAN 70.3 Hawaii (Honu)", location: "Waikoloa and Hawi, Big Island", distance: "1.2 mi swim / 56 mi bike / 13.1 mi run", discipline: "tri", tags: ["70.3", "honu", "heat", "recovery"], resultSource: IM703, body: `We'd finished [IRONMAN Texas](/races/ironman-texas-2025) on April 26. Honu was May 31. That's five weeks between a full and a half, and the honest thing to say is that we did it because Honu is the race we don't skip, not because it was smart.

Jay 5:44:12, eleventh in the 50-54s. Michelle 6:44:44, tenth in the 45-49s, four minutes off her time from the year before with a full Ironman still in her legs. The bike was the leg that held up. The run was the leg that reminded us what April had cost.

Full swim distance this year, unlike [2024](/races/honu-70-3-2024). The card shows it.` },
  { slug: "dick-evans-112-2025", ev: "Dick Evans Memorial Road Race 2025", title: "Dick Evans 2025: Michelle's first lap of the island", deck: "112 miles, both of us. Jay 5:55:53, his fastest. Michelle 7:57:33 on her first time around Oahu with a number on.", date: "2025-08-24", event: "Dick Evans Memorial Road Race", location: "Around Oahu", distance: "112 mi", discipline: "bike", featured: true, tags: ["bike", "long ride", "full distance", "milestone", "michelle"], body: `Two months before [IRONMAN California](/races/ironman-california-2025), and the longest ride of that build for both of us.

Jay's third lap: 5:55:53, fourteen minutes faster than [2024](/races/dick-evans-112-2024) and the first time under six hours. Michelle's first: 7:57:33, a full day on the bike around an island with real traffic and real wind, in August. The full-distance bike leg, done alone, eight weeks before it had to be done with a swim in front of it and a marathon behind it. That's the [bridge](/lessons/dont-sign-up-before-the-long-run), and she built it.` },
  { slug: "augusta-70-3-2025", ev: "2025 IRONMAN 70.3 Augusta", title: "IRONMAN 70.3 Augusta 2025: the river swim", deck: "A mainland 70.3 in Georgia, three weeks before IRONMAN California. Jay 5:16:17, his fastest 70.3. Michelle 6:26:20, hers.", date: "2025-09-28", event: "IRONMAN 70.3 Augusta", location: "Augusta, Georgia", distance: "1.2 mi swim / 56 mi bike / 13.1 mi run", discipline: "tri", featured: true, tags: ["70.3", "travel", "race week", "milestone"], resultSource: "https://labs-v2.competitor.com/results/event/", body: `Augusta is famous for its swim, which goes downriver with the current in the Savannah River. Look at the swim splits on the card, 30 and 29 minutes, and then look at any of our Honu swims. That's the current.

Both of us set 70.3 bests here: Jay 5:16:17, Michelle 6:26:20. Some of that is the river. Some of it is a flat, fast bike in cool late-September air after a summer of training in Honolulu. Heat is the fourth sport, and this was the first race in a while where it didn't show up.

It was also a rehearsal. Three weeks later, [IRONMAN California](/races/ironman-california-2025). Two long-course races, two trips, two bike boxes, in one month. [Race week is a logistics problem](/lessons/race-week-is-a-logistics-problem), and that month was the proof.` },
  { slug: "ironman-california-2025", ev: "2025 IRONMAN California", title: "IRONMAN California 2025: the second full distance", deck: "Sacramento in October. Both of us finished a second 140.6 in one year. Jay 11:16:13, thirty-six minutes faster than Texas. Michelle 15:26:59.", date: "2025-10-19", event: "IRONMAN California", location: "Sacramento, California", distance: "2.4 mi swim / 112 mi bike / 26.2 mi run", discipline: "tri", featured: true, tags: ["full distance", "milestone", "travel", "race week", "sleep"], resultSource: "https://labs-v2.competitor.com/results/event/", body: `We said the full distance was [a season you pay for in sleep](/lessons/sleep-funds-the-season). In 2025 we paid for two.

[Texas in April](/races/ironman-texas-2025) was the first. This was the second, six months later, in Sacramento, with a river swim, a flat bike through the delta, and a marathon along the American River. Jay went 11:16:13, thirty-six minutes faster than Texas, with a 3:59 marathon at the end of it. Michelle went 15:26:59, with a six-hour marathon that was, by the card, the hardest leg she's had in any race on this site. She finished it. That's the whole sentence.

Three weeks before this we'd raced [70.3 Augusta](/races/augusta-70-3-2025). Two months before that, [112 miles around Oahu](/races/dick-evans-112-2025). Six weeks after it, we ran the [Honolulu Marathon](/races/honolulu-marathon-2025) together, slowly, as a victory lap. That's what a full-distance year looks like when you write it down.` },
  { slug: "kaiwi-coast-fun-run-2025", ev: "2025 Kaiwi Coast Run and Walk", title: "Kaiwi Coast Run 2025: fourth year, still together", deck: "Five weeks after IRONMAN California. 36:55 and 36:57. The coast road doesn't care what you did in October.", date: "2025-11-23", event: "Kaiwi Coast Run and Walk", location: "Kaiwi coast, east Oahu", distance: "4 mi", discipline: "run", tags: ["taper", "couples", "community"], body: `Four Novembers on the same road: [2022](/races/kaiwi-coast-fun-run-2022), [2023](/races/kaiwi-coast-fun-run-2023), [2024](/races/kaiwi-coast-fun-run-2024), and this one, two seconds apart, a few weeks out from a marathon we'd already decided to run together. Michelle's first race in the 45-49 age group. It went fine.` },
  { slug: "honolulu-marathon-2025", ev: "Honolulu Marathon 2025", title: "Honolulu Marathon 2025: together, on purpose", deck: "Six weeks after IRONMAN California. Both of us at 5:25:08, side by side for 26.2 miles, one place apart in the results.", date: "2025-12-14", event: "Honolulu Marathon", location: "Ala Moana to Kapiolani Park, Honolulu", distance: "26.2 mi", discipline: "run", featured: true, tags: ["marathon", "couples", "pacing", "recovery"], body: `The fourth Honolulu Marathon in a row, and the first one we ran as one race instead of two.

5:25:08 and 5:25:08. Places 7802 and 7803. Six weeks after a full Ironman, there was no PR to chase and no reason to pretend otherwise, so the plan was the simplest one we've ever written: start together, finish together, take every aid station, enjoy the fireworks. [Whose day is it?](/lessons/whose-day-is-it) Both, and the pace was whatever kept it that way.

If you only look at the times on this site you'll see this as the slow one. It was the best one.` },
  // ---- 2026
  { slug: "bosetti-sunrise-10k-2026", ev: "2026-bosetti-1st-sunrise-10k", title: "Bosetti Sunrise 10K 2026: the fourth New Year's morning", deck: "Jay 50:06 and third in the age group, two weeks after the marathon. Michelle 1:01:32, fifth in the 45-49s.", date: "2026-01-01", event: "Bosetti Sunrise 10K", location: "Hawaii Kai, Oahu", distance: "10K", discipline: "run", tags: ["10k", "new year", "recovery"], body: `Four years now. The routine's the same: marathon in December, sunrise 10K on the first, and then [January](/notes/january-the-five-pounds-and-the-groove). Both of us a few minutes slower than 2025, which is what two full Ironmans and a marathon in one calendar year leaves in the legs.

Third and fifth in the age groups anyway. Hawaii Kai on New Year's morning doesn't attract a fast crowd. It attracts the right one.` },
  { slug: "kailua-10-miler-2026", ev: "2026-kailua-10-miler-and-5k", title: "Kailua 10-Miler 2026: a February podium each", deck: "Fourth year on the windward side. Jay 1:19:19 and third in the age group. Michelle 1:34:34 and sixth in hers.", date: "2026-02-22", event: "Kailua 10-Miler", location: "Kailua, windward Oahu", distance: "10 mi", discipline: "run", tags: ["windward", "consistency"], body: `Not the [1:13 of 2025](/races/kailua-10-miler-2025), and that's fine. 2026 was built around [Honu in May](/races/honu-70-3-2026) and a [mainland 70.3 in August](/races/northern-california-70-3-2026), not a spring of fast running.

Third in the 50-54s for Jay, the fourth year in a row he's been on the age-group podium here. Michelle sixth. The wind did the wind thing.` },
  { slug: "honu-70-3-2026", ev: "2026 IRONMAN 70.3 Hawaii", title: "Honu 70.3 2026: the fourth one", deck: "Jay's fourth Honu, Michelle's third. 5:54:48 and 6:59:03. The race we don't skip.", date: "2026-05-30", event: "IRONMAN 70.3 Hawaii (Honu)", location: "Waikoloa and Hawi, Big Island", distance: "1.2 mi swim / 56 mi bike / 13.1 mi run", discipline: "tri", featured: true, tags: ["70.3", "honu", "heat", "consistency"], resultSource: IM703, body: `Four Junes in the lava for Jay: [6:48](/races/honu-70-3-2023), [5:26](/races/honu-70-3-2024), [5:44](/races/honu-70-3-2025), 5:54:48. Three for Michelle: [6:40](/races/honu-70-3-2024), [6:44](/races/honu-70-3-2025), 6:59:03. The swim was the full distance again, and the wind on the road to Hawi was whatever it decided to be that morning.

Twelfth and fourteenth in the age groups. Not the fastest of the four for either of us, and after the [2025 season](/races/ironman-california-2025) we weren't expecting it to be. We were expecting to be on the start line at Waikoloa at first light, and we were. This one's about showing up. The next one is [Northern California](/races/northern-california-70-3-2026) in August.` },
  { slug: "northern-california-70-3-2026", ev: "2026 IRONMAN 70.3 Northern California", title: "IRONMAN 70.3 Northern California 2026: ninth and tenth", deck: "August 2026, the newest page on the site. Jay 5:37:38 and ninth in the 50-54s. Michelle 7:03:02 and tenth in the 45-49s.", date: "2026-08-16", event: "IRONMAN 70.3 Northern California", location: "Northern California", distance: "1.2 mi swim / 56 mi bike / 13.1 mi run", discipline: "tri", tags: ["70.3", "travel", "race week"], resultSource: "https://labs-v2.competitor.com/results/event/", body: `The most recent race in the log, three weeks before we rebuilt this site. The official result is on the card. The write-up is coming, along with the video, once we've slept.

What the card says: fifty-minute swims for both of us, which means no river current this time, and a run where Jay went 1:46, his fastest 70.3 run on this site. Ninth and tenth in the age groups. A mainland August that was, for once, cooler than home.` },
];
let made = 0;
for (const p of pages) {
  const r = byEvent[p.ev];
  if (!r) { console.log("no results for", p.ev); }
  const jay = r && clean(r.athletes.jay), mich = r && clean(r.athletes.michelle);
  const data = { title: p.title, deck: p.deck, date: p.date };
  if (p.datePrecision) data.datePrecision = p.datePrecision;
  Object.assign(data, { event: p.event, location: p.location, distance: p.distance, discipline: p.discipline });
  data.athletes = jay && mich ? "Both" : jay ? "Jay" : "Michelle";
  const parts = []; if (jay) parts.push(`Jay ${jay.time}`); if (mich) parts.push(`Michelle ${mich.time}`);
  data.result = parts.join(" · ");
  if (p.series) data.series = p.series;
  if (p.featured) data.featured = true;
  data.tags = p.tags;
  data.results = {}; if (jay) data.results.jay = jay; if (mich) data.results.michelle = mich;
  data.resultSource = p.resultSource || r.url;
  const path = `content/races/${p.slug}.md`;
  if (fs.existsSync(path)) { console.log("exists, skipping", p.slug); continue; }
  fs.writeFileSync(path, matter.stringify(p.body.trim() + "\n", data)); made++;
}
console.log("created", made, "pages");
