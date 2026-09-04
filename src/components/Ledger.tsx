import Link from "next/link";
import { type Race, ledgerDate } from "@/lib/content";

const DISCIPLINE: Record<string, string> = {
  run: "Run",
  tri: "Tri",
  bike: "Bike",
  swim: "Swim",
  trail: "Trail",
  multi: "Multi",
};

export function ResultCell({ race, short = false }: { race: Race; short?: boolean }) {
  if (race.result) {
    return <span className="mono text-sm text-ink">{race.result}</span>;
  }
  return (
    <span className="mono text-xs text-mute" title="We only publish official results. None on file for this one yet.">
      {short ? "no time on file" : "no official time on file"}
    </span>
  );
}

export default function Ledger({ races, showYear = true }: { races: Race[]; showYear?: boolean }) {
  return (
    <ol className="list-none m-0 p-0">
      {races.map((r) => (
        <li key={r.slug}>
          <Link href={`/races/${r.slug}`} className="ledger-row">
            <span className="mono text-xs text-mute pt-1">
              {showYear
                ? ledgerDate(r.date, r.datePrecision)
                : r.datePrecision === "year"
                  ? "date tbd"
                  : ledgerDate(r.date, r.datePrecision).slice(5)}
            </span>
            <span className="flex items-baseline min-w-0">
              <span className="min-w-0">
                <span className="ledger-title display text-2xl leading-none text-ink transition-colors">{r.title}</span>
                <span className="block mt-1 text-sm text-ink-soft">
                  <span className="mono text-[0.7rem] uppercase tracking-wider text-brand mr-2">{DISCIPLINE[r.discipline]}</span>
                  {r.distance}
                  {r.athletes ? <span className="text-mute"> · {r.athletes}</span> : null}
                </span>
              </span>
              <span className="ledger-leader hidden sm:block" aria-hidden="true" />
            </span>
            <span className="ledger-result text-right sm:pt-1">
              <ResultCell race={r} />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
