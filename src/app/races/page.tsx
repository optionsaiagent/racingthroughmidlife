import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Ledger from "@/components/Ledger";
import { getRaces, racesByYear } from "@/lib/content";
import { seasonFor } from "@/lib/seasons";

export const metadata: Metadata = {
  title: "Race reports",
  description: "One page per race from 2014 to now, the local Honolulu races and the ones we flew for, with official times only because we don't make up splits.",
};

export default function RacesPage() {
  const all = getRaces();
  const essays = all.filter((r) => r.essay);
  const years = racesByYear(all.filter((r) => !r.essay));
  const total = all.filter((r) => !r.essay).length;

  return (
    <>
      <PageHeader
        eyebrow={`Race reports · ${total} entries`}
        title="The days that count"
        deck="Local Honolulu races and the ones we got on a plane for, one page each. We don't make up splits, so if a result is blank we don't have the official one yet."
      >
        <nav aria-label="Jump to year" className="mt-8 flex flex-wrap gap-2">
          {years.map((y) => (
            <a key={y.year} href={`#y${y.year}`} className="mono text-xs border border-line px-3 py-1.5 hover:border-ink hover:bg-foam">
              {y.year} <span className="text-mute">· {y.races.length}</span>
            </a>
          ))}
          <Link href="/calendar" className="mono text-xs border border-brand text-brand px-3 py-1.5 hover:bg-brand hover:text-foam">
            The Oahu calendar →
          </Link>
          <Link href="/seasons" className="mono text-xs border border-brand text-brand px-3 py-1.5 hover:bg-brand hover:text-foam">
            The seasons →
          </Link>
        </nav>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-10">
        {essays.length ? (
          <section className="mb-14 bg-foam border border-line p-6 sm:p-8">
            <p className="eyebrow">The road to 140.6</p>
            {essays.map((e) => (
              <Link key={e.slug} href={`/races/${e.slug}`} className="group block mt-3">
                <span className="display text-3xl sm:text-4xl text-ink group-hover:text-brand transition-colors">{e.title}</span>
                <span className="block mt-2 text-ink-soft max-w-2xl">{e.deck}</span>
              </Link>
            ))}
          </section>
        ) : null}

        {years.map((y) => (
          <section key={y.year} id={`y${y.year}`} className="mb-14 scroll-mt-8">
            <div className="flex items-baseline gap-4">
              <h2 className="display text-5xl">{y.year}</h2>
              <span className="mono text-xs text-mute">{y.races.length} {y.races.length === 1 ? "race" : "races"}</span>
            </div>
            {seasonFor(y.year) ? (
              <p className="mt-2 mb-5 max-w-2xl text-ink-soft">
                <span className="display text-xl text-ink mr-2">{seasonFor(y.year)!.title}.</span>
                {seasonFor(y.year)!.intent}{" "}
                <Link href={`/seasons#s${y.year}`} className="mono text-xs text-brand underline underline-offset-4 hover:text-buoy">The season →</Link>
              </p>
            ) : (
              <div className="mb-4" />
            )}
            <Ledger races={y.races} showYear={false} />
          </section>
        ))}
      </div>
    </>
  );
}
