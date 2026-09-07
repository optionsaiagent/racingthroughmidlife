import type { WeekTraining, TrainingDay } from "@/lib/content";
import { fmtDate } from "@/lib/content";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function dow(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return DOW[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}

function Day({ day }: { day: TrainingDay }) {
  return (
    <li className="grid grid-cols-[2.4rem_1fr] gap-2 py-1.5 border-b border-line/60 last:border-b-0">
      <span className="mono text-[0.7rem] text-mute pt-0.5">{dow(day.date)}</span>
      <ul className="space-y-0.5">
        {day.sessions.map((s, i) => (
          <li key={i} className="text-sm leading-snug">
            <span className="mono text-[0.68rem] uppercase tracking-wider text-brand mr-1.5">{s.sport}</span>
            {s.name}
            <span className="mono text-[0.68rem] text-mute"> · {s.miles ? `${s.miles} mi, ` : ""}{s.time}</span>
            {s.brick ? <span className="mono text-[0.62rem] uppercase tracking-wider text-buoy ml-1.5">brick</span> : null}
          </li>
        ))}
      </ul>
    </li>
  );
}

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
              {w.days?.length ? (
                <ol className="list-none m-0 p-0">
                  {w.days.map((d) => (
                    <Day key={d.date} day={d} />
                  ))}
                </ol>
              ) : null}
              <p className="mt-2 mono text-[0.68rem] text-mute leading-relaxed">
                {w.totals.map((t) => `${t.sport} ×${t.count}${t.miles ? `, ${t.miles} mi` : ""}, ${t.time}`).join(" · ")}
              </p>
            </div>
          );
        })}
      </div>
      <p className="px-4 py-2 border-t border-line mono text-[0.68rem] text-mute">
        From our watches, via Strava. A brick is a run straight off the bike. Training, not results.
      </p>
    </section>
  );
}
