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
  story?: boolean; // a full narrative exists at content/seasons/<year>.md
}

export const SEASONS: Season[] = [
  {
    year: 2022,
    title: "The year of discovery: the first marathon, for a fiftieth",
    intent: "One and done. Train enough to actually run the Honolulu Marathon three days after Jay's 50th birthday, enjoy it, and not be wrecked for two weeks afterward like the friends who'd done it before us.",
    whatItCost: "A whole year of training, starting from a lifetime of hating running and never having gone past 8.1 miles. It also cost us keto, because once the runs went past nine miles we found out you need carbs.",
    whatWeChanged: "Somewhere in the spring we stopped dreading the run and started dreading missing it. Two weeks after the marathon we put it back on the calendar for 2023, and Jay signed up for the Hawaii 70.3 on his own because Michelle told him he was crazy.",
    story: true,
  },
  {
    year: 2023,
    title: "The year of expansion",
    intent: "Race a whole bunch of everything and see if the fitness could go to another level: 10Ks, 10-milers, halves, a metric century, an Olympic tri, and Jay's first 70.3 in the lava with two friends who signed up the minute he told them.",
    whatItCost: "A year of 5 a.m. alarms, a rib, a marathon that missed four hours by 35 seconds, and a marathon Michelle ran on a twisted ankle. The bike broke Jay at Honu, and fixing that cost two bikes and two trainers.",
    whatWeChanged: "We started filming every week. Salt tablets went into the pockets. The bikes moved into the room off the bedroom on Labor Day weekend, and around Christmas we bought a training app and let it tell us what to do.",
    story: true,
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
