import type { WeekTraining } from "@/lib/content";
import { fmtDate } from "@/lib/content";

export default function TrainingCard({ training }: { training: WeekTraining }) {
  const people = (["jay", "michelle"] as const).filter((k) => training[k]);
  if (!people.length) return null;
  return (
    <section className="bg-foam border border-line">
      <div className="px-4 pt-3 pb-2 border-b border-line">
        <p className="eyebrow">The week on Strava</p>
        <p className="mono text-[0.68rem] text-mute mt-1">
          {fmtDate(training.from)} to {fmtDate(training.to)}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-1 divide-y lg:divide-y divide-line">
        {people.map((k) => {
          const w = training[k]!;
          return (
            <div key={k} className="px-4 py-3">
              <p className="display text-xl mb-1">{k === "jay" ? "Jay" : "Michelle"}</p>
              <dl>
                {w.totals.map((t) => (
                  <div key={t.sport} className="flex justify-between gap-3 py-1 border-b border-line/60 last:border-b-0">
                    <dt className="text-sm">
                      {t.sport} <span className="mono text-[0.68rem] text-mute">×{t.count}</span>
                    </dt>
                    <dd className="mono text-sm text-right">
                      {t.miles ? `${t.miles} mi · ` : ""}
                      {t.time}
                    </dd>
                  </div>
                ))}
              </dl>
              {w.longest?.length ? (
                <div className="mt-3">
                  <p className="eyebrow !text-[0.62rem]">Longest</p>
                  <ul className="mt-1 space-y-1">
                    {w.longest.map((s) => (
                      <li key={s.date + s.name} className="text-sm leading-snug">
                        <span className="mono text-[0.68rem] text-mute mr-2">{s.date.slice(5)}</span>
                        {s.name}
                        <span className="mono text-[0.68rem] text-mute"> · {s.miles ? `${s.miles} mi, ` : ""}{s.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="px-4 py-2 border-t border-line mono text-[0.68rem] text-mute">From our watches, via Strava. Training, not results.</p>
    </section>
  );
}
