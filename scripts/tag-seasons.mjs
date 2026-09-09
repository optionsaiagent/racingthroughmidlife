import fs from "node:fs";
import matter from "gray-matter";
const tags = {
  // 2026: rebuild
  "bosetti-sunrise-10k-2026": ["rebuild", "post_ironman"],
  "kailua-10-miler-2026": ["rebuild"],
  "honu-70-3-2026": ["rebuild", "travel_race", "heat_day"],
  "northern-california-70-3-2026": ["rebuild", "travel_race"],
  "waikiki-roughwater-swim-2026": ["rebuild"],
  // 2025: peak
  "bosetti-sunrise-10k-2025": ["peak_build"],
  "kailua-10-miler-2025": ["peak_build"],
  "windward-half-2025": ["peak_build"],
  "ironman-texas-2025": ["peak_build", "first_at_distance", "travel_race"],
  "honu-70-3-2025": ["peak_build", "post_ironman", "travel_race", "heat_day"],
  "oahu-pentathlon-2025": ["peak_build", "together_on_purpose"],
  "dick-evans-112-2025": ["peak_build", "first_at_distance"],
  "waikiki-roughwater-swim-2025": ["peak_build", "together_on_purpose"],
  "augusta-70-3-2025": ["peak_build", "travel_race"],
  "ironman-california-2025": ["peak_build", "travel_race"],
  "kaiwi-coast-fun-run-2025": ["post_ironman", "together_on_purpose", "training_day"],
  "honolulu-marathon-2025": ["raced_injured", "together_on_purpose", "post_ironman"],
  // 2024: build
  "bosetti-sunrise-10k-2024": ["training_day"],
  "kailua-10-miler-2024": ["peak_build"],
  "windward-half-2024": ["peak_build"],
  "hapalua-half-2024": ["peak_build", "heat_day"],
  "honolulu-triathlon-2024": ["peak_build"],
  "honu-70-3-2024": ["first_at_distance", "travel_race", "heat_day"],
  "cholos-waimea-bay-2024": ["training_day"],
  "kaena-point-10-mile-2024": ["together_on_purpose", "heat_day"],
  "kailua-shark-chase-2024": ["training_day", "together_on_purpose"],
  "norman-tamanaha-15k-2024": ["training_day"],
  "dick-evans-112-2024": ["heat_day"],
  "val-nolasco-half-2024": ["training_day"],
  "kaiwi-coast-fun-run-2024": ["training_day", "together_on_purpose"],
  "honolulu-marathon-2024": ["peak_build"],
  // 2023: volume
  "bosetti-sunrise-10k-2023": ["training_day"],
  "kailua-10-miler-2023": ["training_day"],
  "kings-runner-10k-2023": ["training_day"],
  "kuikahi-10k-2023": ["raced_injured"],
  "windward-half-2023": ["training_day", "heat_day"],
  "hapalua-half-2023": ["heat_day"],
  "haleiwa-metric-century-2023": ["training_day", "first_at_distance"],
  "honolulu-triathlon-2014-and-again": ["first_at_distance"],
  "hibiscus-half-2023": ["together_on_purpose"],
  "honu-70-3-2023": ["first_at_distance", "travel_race", "heat_day"],
  "kailua-shark-chase-2023": ["post_ironman", "training_day"],
  "lanikai-8k-2023": ["post_ironman"],
  "na-wahine-kane-sprint-2023": ["training_day"],
  "norman-tamanaha-15k-2023": ["training_day", "heat_day"],
  "dick-evans-112-2023": ["first_at_distance", "heat_day"],
  "runners-hi-20k-2023": ["training_day", "heat_day"],
  "waikiki-2-4-mile-swim-2023": ["first_at_distance"],
  "honolulu-century-ride-2023": ["training_day"],
  "hybrid-design-25k-2023": ["training_day"],
  "tantalus-10-mile-2023": ["training_day"],
  "boca-hawaii-30k-2023": ["training_day"],
  "val-nolasco-half-2023": ["training_day"],
  "kaiwi-coast-fun-run-2023": ["training_day", "together_on_purpose"],
  "turtle-bay-triathlon-2023": ["training_day"],
  "honolulu-marathon-2023": ["peak_build"],
  // 2022: first marathon
  "hibiscus-half-2022": ["first_at_distance"],
  "norman-tamanaha-15k-2022": ["first_at_distance", "training_day"],
  "runners-hi-20k-2022": ["first_at_distance", "training_day"],
  "hybrid-design-25k-2022": ["first_at_distance"],
  "boca-hawaii-30k-2022": ["first_at_distance"],
  "val-nolasco-half-2022": ["training_day"],
  "kaiwi-coast-fun-run-2022": ["together_on_purpose", "training_day"],
  "honolulu-marathon-for-fifty": ["first_at_distance"],
  "tinman-triathlon-2014": ["first_at_distance"],
};
const notes = {
  "honolulu-marathon-2025": "Six weeks after IRONMAN California. Michelle went in injured, and we ran the whole thing together at the pace that allowed, which is what 5:25:08 is.",
  "honu-70-3-2025": "Thirty-five days after IRONMAN Texas.",
  "bosetti-sunrise-10k-2026": "Two weeks after the marathon, in a year where the volume came down on purpose.",
  "kailua-10-miler-2026": "Rebuild year. The 1:13 from 2025 was run at the top of a build; this wasn't.",
  "honu-70-3-2026": "Rebuild year, after two fulls in 2025. Not the fastest of the four and not meant to be.",
  "northern-california-70-3-2026": "Rebuild year, and the first mainland race after it.",
  "waikiki-roughwater-swim-2026": "A current the organizers said would make 4 km feel like 8. About 80 swimmers got pulled or missed the cutoff.",
  "kuikahi-10k-2023": "Four weeks after Michelle hurt her ribs in a fall off the bike.",
  "honolulu-marathon-2024": "Top of the 2024 build. Both marathon PRs.",
};
let n = 0;
for (const [slug, ctx] of Object.entries(tags)) {
  const p = `content/races/${slug}.md`;
  if (!fs.existsSync(p)) { console.log("missing", slug); continue; }
  const f = matter.read(p);
  f.data.context = ctx;
  if (notes[slug]) f.data.contextNote = notes[slug];
  fs.writeFileSync(p, matter.stringify(f.content, f.data)); n++;
}
console.log("tagged", n);
