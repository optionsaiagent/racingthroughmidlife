import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SEASONS } from "@/lib/seasons";
import { getRaces, racesByYear } from "@/lib/content";

export const metadata: Metadata = {
  title: "The seasons",
  description: "Four years of racing as one arc: the first marathon, the year we filmed every week, the build, the peak, and the rebuild. A time only means something next to the season it came from.",
};

export default function SeasonsPage() {
  const years = racesByYear(getRaces().filter((r) => !r.essay));
  return (
    <>
      <PageHeader
        eyebrow="The arc"
        title="A time only means something next to its season"
        deck="The ledger lists days. This page lists years, so a 2026 time can sit next to a 2025 time without reading as decline, and a hard day run injured can read as what it was."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ol className="divide-y divide-line border-y border-line">
          {[...SEASONS].reverse().map((s) => {
            const count = years.find((y) => y.year === String(s.year))?.races.length ?? 0;
            return (
              <li key={s.year} id={`s${s.year}`} className="grid gap-4 md:grid-cols-[10rem_1fr] py-10 scroll-mt-8">
                <div>
                  <span className="display text-5xl leading-none">{s.year}</span>
                  <p className="mono text-xs text-mute mt-2">{count} {count === 1 ? "race" : "races"}</p>
                  {s.draft ? <p className="mono text-[0.65rem] text-buoy mt-2">Draft. Jay and Michelle are still correcting this one.</p> : null}
                </div>
                <div className="max-w-2xl">
                  <h2 className="display text-3xl leading-tight">{s.title}</h2>
                  <dl className="mt-4 space-y-3">
                    <div><dt className="eyebrow">What it was for</dt><dd className="mt-1 text-[1.05rem] leading-snug">{s.intent}</dd></div>
                    <div><dt className="eyebrow">What it cost</dt><dd className="mt-1 text-[1.05rem] leading-snug">{s.whatItCost}</dd></div>
                    <div><dt className="eyebrow">What we changed</dt><dd className="mt-1 text-[1.05rem] leading-snug">{s.whatWeChanged}</dd></div>
                  </dl>
                  <Link href={`/races#y${s.year}`} className="inline-block mt-4 mono text-xs text-brand hover:text-buoy underline underline-offset-4">
                    The {s.year} races →
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
