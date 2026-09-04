import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Disclaimer from "@/components/Disclaimer";
import { CALENDAR } from "@/lib/calendar";
import { getRaces } from "@/lib/content";
import { MONTH_NAMES } from "@/lib/videos";

export const metadata: Metadata = {
  title: "The Oahu race calendar",
  description: "The Honolulu and Oahu race calendar as two age-groupers have actually raced it: month by month, with the Marathon Readiness Series, the local triathlons, the century rides, and our take on each.",
};

const DISC: Record<string, string> = { run: "Run", tri: "Tri", bike: "Bike", swim: "Swim", trail: "Trail" };

export default function CalendarPage() {
  const races = getRaces();
  const byMonth = MONTH_NAMES.map((name, i) => ({ name, events: CALENDAR.filter((e) => e.month === i + 1) }));

  return (
    <>
      <PageHeader
        eyebrow="The backbone"
        title="A year on Oahu, with bibs on"
        deck="This is the local calendar as we have actually raced it. The Honolulu Marathon sits at the end of the year and the whole running calendar leans toward it. The triathlons cluster in late spring and fall. Dates drift, so confirm with the organizer before you plan a season around one."
      >
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 mono text-xs text-mute">
          <span><span className="text-brand">■</span> Marathon Readiness Series, five races Aug to Nov</span>
          <span><span className="text-buoy">■</span> Off-island, but we fly for it</span>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ol className="divide-y divide-line border-y border-line">
          {byMonth.map((m, i) => (
            <li key={m.name} id={m.name.toLowerCase()} className="grid gap-4 md:grid-cols-[10rem_1fr] py-8">
              <div>
                <span className="mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display text-4xl leading-none">{m.name}</h2>
                {i === 8 ? <p className="mt-2 text-sm text-ink-soft">Hottest stretch of the year. Everything below is a heat race.</p> : null}
              </div>
              <ul className="grid gap-6 sm:grid-cols-2">
                {m.events.map((e) => {
                  const ours = e.races.map((s) => races.find((r) => r.slug === s)).filter(Boolean);
                  return (
                    <li key={e.name} className={`border-l-2 pl-4 ${e.series ? "border-brand" : e.offIsland ? "border-buoy" : "border-line"}`}>
                      <p className="display text-2xl leading-tight">{e.name}</p>
                      <p className="mono text-[0.7rem] uppercase tracking-wider text-mute mt-1">
                        {DISC[e.discipline]} · {e.distance} · {e.when}
                      </p>
                      <p className="text-sm text-ink-soft mt-0.5">{e.where}{e.series ? ` · ${e.series}` : ""}</p>
                      <p className="mt-2 text-[0.98rem] leading-snug">{e.take}</p>
                      {ours.length ? (
                        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                          {ours.map((r) => (
                            <Link key={r!.slug} href={`/races/${r!.slug}`} className="mono text-xs text-brand underline underline-offset-4 hover:text-buoy">
                              Our {r!.date.slice(0, 4)} report →
                            </Link>
                          ))}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-8 mono text-xs text-mute max-w-2xl">
          We have not raced everything on this island. This is the part we have. If we did not do it, it is not here. Missing your favorite? <Link href="/contact" className="text-brand underline">Tell us</Link> and we will consider it, which is different from promising to race it.
        </p>
        <Disclaimer className="mt-10" />
      </div>
    </>
  );
}
