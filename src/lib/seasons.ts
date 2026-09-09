/** One record per year. Draft text came from Jay's description on 2026-09-08; the `draft` flag stays true until Jay and Michelle have corrected it. */
export type RaceContext =
  | "peak_build" | "rebuild" | "raced_injured" | "together_on_purpose" | "post_ironman"
  | "training_day" | "travel_race" | "heat_day" | "first_at_distance";

export const CONTEXT_LABEL: Record<RaceContext, string> = {
  peak_build: "Peak build",
  rebuild: "Rebuild year",
  raced_injured: "Raced injured",
  together_on_purpose: "Together on purpose",
  post_ironman: "Weeks after an Ironman",
  training_day: "Training day, not raced",
  travel_race: "Flew for it",
  heat_day: "Heat day",
  first_at_distance: "First time at the distance",
};

export interface Season {
  year: number;
  title: string;
  intent: string;
  whatItCost: string;
  whatWeChanged: string;
  draft?: boolean;
}

export const SEASONS: Season[] = [
  {
    year: 2022,
    title: "The first marathon",
    intent: "Get from an 8-mile fun run to 26.2 for Jay's fiftieth, one distance at a time.",
    whatItCost: "A summer of long runs that started in the dark, and the first real idea of what recovery takes past forty.",
    whatWeChanged: "We stopped treating a race as something you show up to and started treating the long run as the thing you earn it with.",
    draft: true,
  },
  {
    year: 2023,
    title: "The year we filmed every week",
    intent: "Volume, and finding out whether the sport would stick. Twenty-seven races, an Olympic tri, a 70.3, a lap of the island, and the whole readiness series.",
    whatItCost: "Most of a year of 5 a.m. alarms, a rib, and a lot of weekends.",
    whatWeChanged: "The trainers came into the house in October and the weekday bike started actually happening.",
    draft: true,
  },
  {
    year: 2024,
    title: "The build",
    intent: "Fourteen races on healthy bodies, and Michelle's first 70.3.",
    whatItCost: "Less than it should have. This was the year the work paid out: the marathon came down to 3:41 and 4:39.",
    whatWeChanged: "We decided on the full distance, and the training got pointed at one thing.",
    draft: true,
  },
  {
    year: 2025,
    title: "Peak",
    intent: "Two full Ironmans, a 112-mile lap of the island, a pentathlon, and two 70.3s, on bodies that went in healthy.",
    whatItCost: "The bill arrived at the end of it. Michelle ran the December marathon injured, and 5:25:08 together is what that looked like.",
    whatWeChanged: "We stopped adding races and started asking what the next year was for.",
    draft: true,
  },
  {
    year: 2026,
    title: "Recovery and rebuild",
    intent: "Slower times on purpose, on bodies that spent two years at peak volume.",
    whatItCost: "Some pride, in the ledger. Every 2026 time sits next to a faster one from 2025.",
    whatWeChanged: "The volume came down before the body made us bring it down.",
    draft: true,
  },
];

export function seasonFor(year: number | string): Season | undefined {
  return SEASONS.find((s) => s.year === Number(year));
}
