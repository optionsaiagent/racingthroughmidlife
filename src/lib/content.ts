export type Kind = "race" | "note" | "lesson";

export type Post = {
  slug: string;
  kind: Kind;
  title: string;
  date: string;
  dek: string;
  image: string;
  youtube?: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "honu-70-3-2023",
    kind: "race",
    title: "Honu 70.3: the first time the distance was the point",
    date: "2023-06-03",
    dek: "Jay, Kona, 1.2 miles of ocean, 56 miles of lava, 13.1 in the heat. He had not wanted this race. He finished it.",
    image: "/images/honu-lava.jpg",
    youtube: "55K7xS6oXRQ",
    body: [
      "Jay had done triathlons before. 2005, 2006 — he did not like them. In 2014 he talked Michelle into the Honolulu Triathlon and, two months later, the Tin Man. They were not serious yet. The bug had not landed.",
      "Honu was different. IRONMAN 70.3 Hawaii: 1.2 miles of ocean off Waikoloa, 56 miles on the bike toward Hawi and back with about 2,400 feet of climbing, then 13.1 miles of running in Big Island heat. He spent the week before the race asking himself why he had signed up. He had never really wanted this one.",
      "The honest answer was the year before. Michelle had watched the 2021 Honolulu Marathon and said, for his 50th, they should go do it. He had never wanted a marathon either. The longest thing they had run was the Great Aloha Run, 8.2 miles from Aloha Tower. Twenty-six miles felt like a different sport. They trained anyway. Once that door opened, Honu was the next door.",
      "Friends signed up too. That matters more than people admit. Suffering together is a logistics problem and a morale problem, and you want both solved.",
      "He finished. We are not going to dress that up as a Kona qualifying story. It was a first 70.3 on a hard island, after a year of taking the work seriously. The lesson we keep: the race you are nervous about is often the one that was always going to be next, once you stopped pretending you were still the 2014 version of yourselves.",
      "Full recap is on the channel. This page is so the day does not live only inside a YouTube thumbnail.",
    ],
  },
  {
    slug: "hibiscus-half-2023",
    kind: "race",
    title: "Hibiscus Half: sit on the easy pace",
    date: "2023-05-28",
    dek: "Michelle ran 2:12. Jay sat on an easy pace for him and pushed her to a PR. A chicken joined at the top of Diamond Head.",
    image: "/images/honolulu-run.jpg",
    youtube: "WAFS28Qakuc",
    body: [
      "Hibiscus 2022 was our first half marathon. Hibiscus 2023 was the first time we had raced a half together since. Ed ran with us. At the top of Diamond Head a chicken joined the field, which is the most Honolulu sentence we will write this year.",
      "Michelle set a personal record: 2 hours 12 minutes. Jay felt good taking a pace that was easy for him and holding it so she could stay on it. That is not a coaching cue from a book. That is what it looks like when two people in the same house train at two different engines and still want to be on the same course.",
      "If you only remember one thing from this site, remember that. Couples training is not matching watts. It is knowing whose day it is.",
      "The same week we were still chewing on the Honolulu Triathlon — how it felt against 2014, when we were not serious and had not caught the bug. Honu was sitting on the calendar. The Asics Gel Nimbus 24s had a few weeks on them. The shoes Jay planned to take to the half and to the 70.3 were New Balance Fresh Foam X 1080 v12. We mention shoes we actually ran in. We do not mention shoes we saw in an ad.",
    ],
  },
  {
    slug: "honolulu-triathlon-2014-and-again",
    kind: "race",
    title: "Honolulu Triathlon, twice: 2014 and the year we meant it",
    date: "2023-05-21",
    dek: "Same island, same three sports, two completely different athletes. The 2014 version of us was not training. The later version was.",
    image: "/images/hero.jpg",
    youtube: "WAFS28Qakuc",
    body: [
      "The Honolulu Triathlon is the local Olympic-distance day: ocean, bike, run, Ala Moana, the city watching. We did it in 2014. We were not really training. We had not decided this was a life, just a weekend.",
      "When we came back to it years later, the useful comparison was not a Strava trophy. It was how much of the week before the race we had already paid for. Sleep. Brick sessions in humidity. Food that did not fall apart at mile 18 of the bike. Showing up as people who had already suffered, not as people hoping the course would be gentle.",
      "Olympic distance is where a lot of Honolulu athletes live. It is also where you find out whether you actually like triathlon or you just like the idea of a Saturday with a timing chip. In 2014 we were not sure. Later, we were sure enough to put Honu and a marathon on the same year.",
      "If you are standing on that beach for the first time: the swim is the part that feels like a different planet. The bike is where Honolulu traffic and heat start arguing with you. The run is a negotiation with whatever you ate. None of that is a medical protocol. It is just the day.",
    ],
  },
  {
    slug: "honolulu-marathon-for-fifty",
    kind: "race",
    title: "The marathon Jay never wanted, for a 50th he did",
    date: "2022-12-11",
    dek: "Michelle watched the 2021 Honolulu Marathon and said they should go do it for his birthday. He had never liked running. They trained anyway.",
    image: "/images/honolulu-run.jpg",
    body: [
      "Jay had never wanted to run a marathon. He did not really like running. Maybe he did not know if he could finish. The longest run in the house was the Great Aloha Run, 8.2 miles. Twenty-six miles was a number that belonged to other people.",
      "Michelle watched the 2021 Honolulu Marathon and made it a 50th-birthday problem. That is the whole origin story of this site, if you strip it down. One person in the marriage was willing to say the distance out loud. The other person was willing to train once it was on the calendar.",
      "They took it seriously. That sentence is doing a lot of work. Serious, for us, meant the long run actually happened. It meant showing up in humidity when the week already had a job in it. It meant the first half at Hibiscus the same year, so 13.1 was a known country before 26.2.",
      "We are not posting a fabricated gun time. If you have the official result, send it and we will put the number on this page. The thing that belongs here either way is the decision: midlife is not a sports car. For us it was a marathon we had spent decades not wanting, and then a triathlon calendar we still have not gotten off.",
    ],
  },
  {
    slug: "going-the-full-distance",
    kind: "race",
    title: "Going the full distance",
    date: "2024-10-01",
    dek: "Olympic, half iron, marathon, full Ironman. The week around 140.6 is the part nobody puts on the highlight reel.",
    image: "/images/finish.jpg",
    body: [
      "We have now gone the full distance. 2.4, 112, 26.2. We are not going to invent splits we do not have in front of us, and we are not going to turn a finish into a brand. The useful writing is what the week actually looks like when 140.6 is on the calendar.",
      "Training for a full Ironman in Honolulu is a heat problem, a marriage problem, and a calendar problem. The swim is the ocean you already live next to, which is a gift until it is chop. The bike is hours you have to steal from a workday. The run is whatever is left after you have already been a person for twelve hours.",
      "What we would tell a friend who is thinking about it: do the Olympic. Do a 70.3 on a hard course. Do a standalone marathon so you know what 26.2 feels like when you are not already cooked. Then decide. The full distance is not a personality. It is a season you have to fund with sleep.",
      "If you want the official race, date, and time on this page, we will add them. Until then this stands as the honest version: we did it, it cost a season, and we would still rather write down the do’s and don’ts than sell you a plan.",
    ],
  },
  {
    slug: "two-paces-one-house",
    kind: "note",
    title: "Field note: two paces, one house",
    date: "2023-05-29",
    dek: "How we actually train together when the engines do not match.",
    image: "/images/bikes-rack.jpg",
    body: [
      "Most couples-training advice is a lie told with a smile. You will not hold the same wattage. You will not want the same long-run pace. One of you will be ready to talk at mile eight and the other will be conducting a private argument with a hamstring.",
      "What works in this house: the person whose race it is sets the pace. The other person sits on it, even if it feels easy, especially if it feels easy. Hibiscus 2023 was Michelle’s day. Jay’s job was not a Strava segment.",
      "The other thing that works: separate sessions on weekdays, shared long work on weekends, and a kitchen that does not become a second race. If dinner is a negotiation about macros, you have already lost the week.",
      "We will keep writing this down as the season changes. The rule stays. Whose day is it.",
    ],
  },
  {
    slug: "heat-is-the-fourth-sport",
    kind: "note",
    title: "Field note: heat is the fourth sport",
    date: "2023-06-10",
    dek: "Honolulu does not care about your FTP. The dew point does.",
    image: "/images/swim.jpg",
    body: [
      "If you train here, you already know. If you are flying in for a race, you do not. Honolulu humidity is not a vibe. It is a fourth discipline. It changes what you can eat, when you can run, and how honest your easy pace is.",
      "We do not sell electrolytes. We do drink water and we do take salt when the day is stupid. We do not start long runs at noon to prove toughness. Dawn is not aesthetic. Dawn is the only temperature that lets the work happen.",
      "Honu in June is a clinic in this. The lava does not shade you. The run does not cool you. Whatever you practiced in a garage fan is a rumor.",
      "Do: shift the long stuff earlier. Don’t: copy a mainland plan and add a thumbs-up emoji. The island will bill you for it on the run.",
    ],
  },
  {
    slug: "the-shoe-you-trained-in",
    kind: "note",
    title: "Field note: the shoe you trained in",
    date: "2023-05-20",
    dek: "Nimbus 24s for a few weeks. 1080 v12s for the half and for Honu. Nothing from an endcap we had not run in.",
    image: "/images/bikes-rack.jpg",
    body: [
      "Jay spent May in Asics Gel Nimbus 24s, then lined up New Balance Fresh Foam X 1080 v12s for Hibiscus and for Honu. That is the whole gear review: what had miles on it, and what was going to the start line.",
      "We use affiliate links on the channel when we actually used the thing. We are not a shoe account. If a later note says a pair failed, it failed. If this note is silent on carbon plates, it is because we were not racing in a science experiment that week.",
      "Do: put the race shoe on a long run before the race. Don’t: trust a drop that your calf has not met.",
    ],
  },
  {
    slug: "dont-sign-up-before-the-long-run",
    kind: "lesson",
    title: "Don’t sign up before the long run exists",
    date: "2023-01-15",
    dek: "Jay did not want a marathon until Michelle put it on a birthday. The work still had to be real.",
    image: "/images/honolulu-run.jpg",
    body: [
      "The internet will tell you to sign up first so you cannot back out. Sometimes that works. Sometimes it puts a person who has never run 13 miles into a 26.2 they will remember as a medical event.",
      "Our version: the marathon became real when the long run became real. Hibiscus as a first half was the bridge. Honu was the next bridge. The full distance only made sense after those were not theoretical.",
      "Do: pick the next distance that scares you a little and is still in the neighborhood of what you have already suffered. Don’t: skip from a 10K personality to an Ironman because a podcast voice said midlife is a starting line. Midlife is a starting line. It is also a body that bills interest.",
    ],
  },
  {
    slug: "whose-day-is-it",
    kind: "lesson",
    title: "Whose day is it",
    date: "2023-05-30",
    dek: "The only couples-training rule we would defend in public.",
    image: "/images/bikes-rack.jpg",
    body: [
      "If you train with a spouse, you will want this to be fair. Fair will wreck both races. One of you is the engine that day. The other is the governor.",
      "Michelle’s 2:12 at Hibiscus was not a compromise pace. It was her day. Jay sitting on easy was the work.",
      "Apply it to weekends. Apply it to who gets the 5 a.m. ocean and who gets the later bike. Apply it to the week before a race when one of you is tapering and the other still has a build. Say it out loud so it does not become a fight about dishes.",
    ],
  },
  {
    slug: "honolulu-is-not-a-recovery-week",
    kind: "lesson",
    title: "Honolulu is not a recovery week",
    date: "2023-06-12",
    dek: "Heat, salt, and a course that looks pretty in photos.",
    image: "/images/hero.jpg",
    body: [
      "People fly here and treat the island like a taper with pineapple. The ocean is real. The bike can be wind. The run is exposed. Local races — Honolulu Triathlon, Hibiscus, Great Aloha, Honolulu Marathon, Honu on the Big Island — are not participation stickers. They are the calendar we actually use.",
      "Do: arrive early enough to sleep in this humidity. Don’t: test a new breakfast on race morning because it looked tropical. We eat food we have already suffered with. We write that down so you can steal it and argue with it.",
    ],
  },
];

export const videos = [
  {
    id: "55K7xS6oXRQ",
    title: "June Week 1 — IRONMAN 70.3 Honu, Kona",
    dek: "Jay’s first 70.3. Ocean, lava, heat.",
  },
  {
    id: "WAFS28Qakuc",
    title: "May Week 4 — Honolulu Triathlon and Hibiscus Half",
    dek: "2014 versus later. Michelle’s 2:12. A chicken on Diamond Head.",
  },
];

function newest(a: Post, b: Post) {
  return b.date.localeCompare(a.date);
}

export const races = posts.filter((p) => p.kind === "race").sort(newest);
export const notes = posts.filter((p) => p.kind === "note").sort(newest);
export const lessons = posts.filter((p) => p.kind === "lesson").sort(newest);

export function bySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function byKind(kind: Kind) {
  return posts.filter((p) => p.kind === kind);
}
