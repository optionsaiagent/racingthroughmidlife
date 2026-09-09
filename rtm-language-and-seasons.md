# Racing Through Midlife, spec 2: language cleanup and the season arc

Companion to `rtm-site-improvements.md`. Two workstreams, independent of each other, both safe to run before the results data layer lands.

---

# Part 1: Language cleanup pass

## 1.1 Em dashes and en dashes

**Rule:** no em dash or en dash used as punctuation anywhere in prose. Commas, periods, colons, or a restructured sentence instead. En dashes remain legal inside numeric ranges rendered by components (date ranges, split ranges), so scope the rule to prose fields only.

**Known instances:** the homepage hero body copy uses one. There will be more in field notes and lessons. Do not hand-hunt them.

**Build a lint step:**

- Script that walks every prose field in content source (frontmatter `description`, `dek`, `summary`, plus body markdown) and flags `—`, `–`, and the ` - ` spaced-hyphen pattern.
- Wire it into the build as a warning first, then a hard failure once the backlog is clean.
- Same script flags smart-quote inconsistency, which the site currently has: the disclaimer renders `two people’s notes` with a curly apostrophe while adjacent copy uses straight ones.

**Replacement guidance, in priority order:**

1. Split into two sentences. This is usually the best fix and it suits the voice, which is already built on short declaratives.
2. Comma, when the clause is genuinely subordinate.
3. Colon, when what follows is a list or a definition.
4. Parentheses only as a last resort. They lower the temperature of a sentence and this site's power comes from flat, unhedged statements.

Worked example from the hero:

> Current: the log we kept along the way — the training that actually stuck, the mistakes we won't repeat, and what race week really looks like
>
> Rewrite: the log we kept along the way. The training that actually stuck, the mistakes we won't repeat, and what race week really looks like

## 1.2 Signature phrase inventory

These are repeated close to verbatim across multiple pages. Each one is good. None survives a third appearance.

| Phrase | Seen on | Keep it on |
|---|---|---|
| rung / ladder / didn't skip a rung | home, start-here, races index, Texas report, and more | `/start-here` only, as the organizing metaphor |
| paid for in sleep / a season we paid for in sleep | home, start-here, races index, Texas report | the `sleep-funds-the-season` lesson only |
| the part nobody puts on the highlight reel | home, Texas report, race-week lesson | the `race-week-is-a-logistics-problem` lesson only |
| we aren't a coaching business or a clinic | three times per page, every page | once, in the footer |
| what we'd tell you over dinner | home, start-here | `/lessons` landing only |

**Rule going forward:** a signature phrase is used once per page, and once as its canonical home across the site. Everywhere else, link to the canonical page instead of restating the line. This is strictly better anyway, because it moves internal link equity toward the lessons.

**Build a second lint rule:** maintain the phrase list in a config file, flag any page containing more than one instance, and flag any page using a phrase whose canonical home is elsewhere.

## 1.3 Sentence rhythm in card summaries

Nearly every card and dek runs the same shape: flat statement, comma, wry qualifier. Forty of those in sequence stops registering as voice and starts registering as a template.

Not a find-and-replace job. It's an editorial pass over the card summaries only, with a target mix per index page:

- roughly half in the current shape, since it works
- a quarter as short fragments or bare numbers ("Four miles. Two seconds apart.")
- a quarter as a concrete detail with no commentary attached

The body prose does not need this treatment. It varies fine already.

---

# Part 2: The season arc

## 2.1 The problem

The site is a log of individual days and it has no concept of a season, a block, or a body under load. So the 2026 numbers read as decline when they are a deliberate rebuild, and the 2025 Honolulu Marathon reads as a bad day when it was a hard day run injured.

Without this, the progression charts in spec 1 will actively lie about what happened.

## 2.2 Data model additions

Add to each race record:

- `season_id`, foreign key to a new seasons collection
- `context`: enum, multi-select. Proposed values: `peak_build`, `rebuild`, `raced_injured`, `together_on_purpose`, `post_ironman`, `training_day`, `travel_race`, `heat_day`, `first_at_distance`
- `context_note`: one or two sentences, optional, shown on hover or beneath the chart point

Add a seasons collection, one record per year:

- `year`, `title`, `intent`, `what_it_cost`, `what_we_changed`

Draft entries from what you've described, for you and Michelle to correct:

- **2023, the year we filmed every week.** Twenty-seven races. Intent was volume and finding out whether the sport stuck.
- **2024, the build.** Fourteen races on healthy bodies. Marathon down to 3:41 and 4:39.
- **2025, peak.** Two full Ironmans, a 112-mile lap of the island, a pentathlon, two 70.3s. Healthy going in, and the bill arrived at the end of it. Michelle ran the December marathon injured, which is what the 5:25:08 is.
- **2026, recovery and rebuild.** Slower times on purpose. Rebuilding on bodies that spent two years at peak volume.

## 2.3 Rendering

- **Chart points carry their flag.** A point tagged `raced_injured` or `rebuild` renders visually distinct with the `context_note` attached. No unannotated progression chart ships.
- **Season header on `/races` year sections.** The year heading currently reads "2025, 12 races." It should carry the season `title` and `intent` beneath it, so the list of times has a frame before the reader starts comparing.
- **A season summary block on race reports** from years with a strong arc, linking to the season page.
- **`/seasons` page**, or a section on `/about`, telling the four-year arc end to end. Build, peak, cost, rebuild.

## 2.4 The content that should come out of this

The rebuild year is the most useful thing you can write for a 40-plus audience, and it is the thing this niche is worst at. Everyone documents the build. Almost nobody documents the bill or the year spent paying it.

Candidate pieces, all of them the kind of thing that ranks and gets shared:

- **A lesson: what two years at peak volume cost us.** Concrete, retrospective, not prescriptive. What you noticed, when you noticed it, what you changed.
- **A lesson: racing injured, and how we decided to.** December 2025 is the case study. This is a decision midlife athletes face constantly and there is very little honest writing on it. Keep it descriptive, what you two decided and why, with the existing not-medical-advice framing intact.
- **A field note series: the rebuild.** What a deliberately slower year actually looks like week to week. This is a natural spine for the 2026 Sunday notes.
- **A reframe of the 2026 race reports.** Each one currently reads as a slower repeat of a race you've done before. With a season frame, each becomes a data point in a story about coming back, which is a far better read.

One caution on the injury writing. The value is in the decision and the aftermath, not in the diagnosis. Keep it to what you two did and what it cost, and keep the "talk to your own doctor" line close to it. The site's credibility comes from staying inside what you actually know.

## 2.5 Backfill order

1. Seed the four season records
2. Tag the 2025 and 2026 races, which is where the misreading risk is concentrated
3. Tag 2022 to 2024
4. Build the chart annotation rendering
5. Then, and only then, ship `/progress`
