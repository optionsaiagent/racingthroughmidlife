import fs from "node:fs";
import matter from "gray-matter";
const results = JSON.parse(fs.readFileSync("content/results.json", "utf8"));
const byEvent = Object.fromEntries(results.map((r) => [r.event, r]));
const map = {
  "honolulu-marathon-for-fifty": "Honolulu Marathon 2022",
  "kailua-10-miler-2023": "2023 Kailua Ten-Miler and 5K",
  "kings-runner-10k-2023": "King's Runner 10K 2023",
  "windward-half-2023": "2023 Windward Half Marathon and 5K",
  "hapalua-half-2023": "Hapalua Half Marathon 2023",
  "honolulu-triathlon-2014-and-again": "Honolulu Triathlon 2023 (Olympic)",
  "hibiscus-half-2023": "Hibiscus Half Marathon 2023",
  "honu-70-3-2023": "2023 IRONMAN 70.3 Hawaii",
  "lanikai-8k-2023": "2023 Lanikai 8K",
  "na-wahine-kane-sprint-2023": "Na Wahine & Kane Sprint Triathlon 2023 (Kane)",
  "norman-tamanaha-15k-2023": "2023 Tamanaha 15K",
  "runners-hi-20k-2023": "2023 Runner’s HI 20K",
  "hybrid-design-25k-2023": "2023 Hybrid Design 25K",
  "tantalus-10-mile-2023": "2023 Tantalus 10-Mile Challenge",
  "boca-hawaii-30k-2023": "2023 Boca Hawaii 30K",
  "val-nolasco-half-2023": "2023 Val Nolasco Half Marathon",
  "kaiwi-coast-fun-run-2023": "2023 Kaiwi Coast Run and Walk",
  "turtle-bay-triathlon-2023": "Turtle Bay Triathlon 2023 (run-bike-run)",
  "honolulu-marathon-2023": "Honolulu Marathon 2023",
  "bosetti-sunrise-10k-2024": "2024 Bosetti 10K",
  "kaena-point-10-mile-2024": "HURT Kaena Point Firecracker 2024",
  "ironman-texas-2025": "2025 IRONMAN Texas",
};
function clean(a) {
  if (!a) return undefined;
  const out = { time: a.time };
  const put = (k, v) => { if (v !== undefined && v !== null && v !== "" && v !== "None") out[k] = v; };
  put("agegroup", a.agegroup); put("agrank", a.agrank); put("place", a.place); put("genderRank", a.gender_rank);
  put("pace", a.pace); put("swim", a.swim); put("t1", a.t1); put("bike", a.bike); put("t2", a.t2); put("run", a.run);
  put("run1", a.run1); put("run2", a.run2); if (a.splits) out.splits = a.splits; put("bib", a.bib);
  return out;
}
let n = 0;
for (const [slug, ev] of Object.entries(map)) {
  const r = byEvent[ev]; if (!r) { console.log("MISSING", ev); continue; }
  const p = `content/races/${slug}.md`; const f = matter.read(p);
  const jay = clean(r.athletes.jay), mich = clean(r.athletes.michelle);
  const parts = []; if (jay) parts.push(`Jay ${jay.time}`); if (mich) parts.push(`Michelle ${mich.time}`);
  f.data.result = parts.join(" · ");
  f.data.athletes = jay && mich ? "Both" : jay ? "Jay" : "Michelle";
  f.data.results = {}; if (jay) f.data.results.jay = jay; if (mich) f.data.results.michelle = mich;
  if (r.url) f.data.resultSource = r.url;
  if (r.date && /^\d{4}-\d{2}-\d{2}$/.test(r.date)) { f.data.date = r.date; delete f.data.datePrecision; }
  fs.writeFileSync(p, matter.stringify(f.content, f.data)); n++;
}
console.log("updated", n, "race pages");
