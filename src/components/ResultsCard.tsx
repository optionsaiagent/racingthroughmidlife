import type { AthleteResult } from "@/lib/content";

const LEGS: [keyof AthleteResult, string][] = [
  ["swim", "Swim"],
  ["t1", "T1"],
  ["bike", "Bike"],
  ["t2", "T2"],
  ["run", "Run"],
  ["run1", "Run 1"],
  ["run2", "Run 2"],
];

function Row({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex justify-between gap-3 py-1 border-b border-line/60 last:border-b-0">
      <dt className="mono text-[0.68rem] uppercase tracking-wider text-mute pt-0.5">{label}</dt>
      <dd className="mono text-sm text-right">{value}</dd>
    </div>
  );
}

export default function ResultsCard({
  results,
  source,
}: {
  results: Partial<Record<"jay" | "michelle", AthleteResult>>;
  source?: string;
}) {
  const entries = (["jay", "michelle"] as const).filter((k) => results[k]);
  if (!entries.length) return null;
  return (
    <section className="bg-foam border border-line">
      <p className="eyebrow px-4 pt-3">Official results</p>
      <div className={`grid ${entries.length > 1 ? "sm:grid-cols-2 lg:grid-cols-1" : ""} divide-y lg:divide-y divide-line`}>
        {entries.map((k) => {
          const r = results[k]!;
          const legs = LEGS.filter(([key]) => r[key]);
          return (
            <dl key={k} className="px-4 py-3">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <span className="display text-xl">{k === "jay" ? "Jay" : "Michelle"}</span>
                <span className="mono text-lg">{r.time}</span>
              </div>
              <Row label="Age group" value={r.agegroup} />
              <Row label="AG place" value={r.agrank} />
              <Row label="Gender place" value={r.genderRank} />
              <Row label="Overall" value={r.place} />
              <Row label="Pace" value={r.pace} />
              {legs.map(([key, label]) => (
                <Row key={key} label={label} value={r[key] as string} />
              ))}
              {r.splits
                ? Object.entries(r.splits).map(([k2, v]) => <Row key={k2} label={k2} value={v} />)
                : null}
              <Row label="Bib" value={r.bib} />
            </dl>
          );
        })}
      </div>
      {source ? (
        <p className="px-4 py-2 border-t border-line mono text-[0.68rem] text-mute">
          Source:{" "}
          <a href={source} target="_blank" rel="noopener noreferrer" className="text-brand underline">
            official timing
          </a>
        </p>
      ) : null}
    </section>
  );
}
