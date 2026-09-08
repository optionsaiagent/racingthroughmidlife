import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Prose from "@/components/Prose";
import Disclaimer from "@/components/Disclaimer";
import { getPage, getRaces, getLessons } from "@/lib/content";
import { MiniList } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Start here, if you are 40 and up",
  description: "How a 42-year-old and a 49-year-old went from an 8-mile fun run to a full Ironman without a coach, in order, with dates, so you can see the ladder we climbed before you pick your own next rung.",
};

const RUNGS = [
  { rung: "8.15 miles", what: "Great Aloha Run", note: "For years this was the longest either of us had run, and there's nothing wrong with staying here a while.", href: "/races/great-aloha-run-2023" },
  { rung: "13.1 miles", what: "Hibiscus Half, May 2022", note: "Our first half, and the day the marathon stopped being hypothetical.", href: "/races/hibiscus-half-2022" },
  { rung: "26.2 miles", what: "Honolulu Marathon, December 2022", note: "For Jay's 50th. He'd never wanted one, but Michelle put it on a birthday and that was that.", href: "/races/honolulu-marathon-for-fifty" },
  { rung: "Olympic tri", what: "Honolulu Triathlon, May 2023", note: "The same race we'd done in 2014, this time with training, and where you find out whether you like the sport or just the idea of it.", href: "/races/honolulu-triathlon-2014-and-again" },
  { rung: "70.3", what: "IRONMAN 70.3 Hawaii, June 2023", note: "A hard course on purpose, on the theory that if Jay could get through a half in the lava he could get through one anywhere.", href: "/races/honu-70-3-2023" },
  { rung: "112 miles", what: "Dick Evans, August 2023", note: "A lap of Oahu, the same ride the first Ironman used in 1978, which meant doing the bike leg on its own before a swim and a marathon got attached to it.", href: "/races/dick-evans-112-2023" },
  { rung: "2.4 miles", what: "Waikiki Roughwater Swim, September 2023", note: "The 1978 Ironman swim on its own, with no bike waiting afterward. Jay 1:50:49, Michelle 2:02:27.", href: "/races/waikiki-2-4-mile-swim-2023" },
  { rung: "140.6", what: "IRONMAN Texas, April 2025", note: "Only after every rung above was done. It was a season we paid for in sleep, and then we did it again in October.", href: "/races/ironman-texas-2025" },
];

export default function StartHere() {
  const page = getPage("start-here");
  const lessons = getLessons().slice(0, 6);
  const firsts = getRaces().filter((r) => ["great-aloha-run-2023", "hibiscus-half-2022", "honolulu-triathlon-2014-and-again"].includes(r.slug));

  return (
    <>
      <PageHeader eyebrow="Start here" title={page.title} deck={page.deck} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div>
          <section className="mb-14">
            <p className="eyebrow">The ladder, in the order we climbed it</p>
            <ol className="mt-4 border-t border-ink">
              {RUNGS.map((r, i) => (
                <li key={r.rung} className="grid grid-cols-[2rem_7.5rem_1fr] sm:grid-cols-[2.5rem_9rem_1fr] gap-3 py-4 border-b border-line items-baseline">
                  <span className="mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-2xl text-brand leading-none">{r.rung}</span>
                  <span>
                    <Link href={r.href} className="display text-xl leading-tight text-ink hover:text-brand">{r.what}</Link>
                    <span className="block text-sm text-ink-soft mt-0.5">{r.note}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 mono text-xs text-mute">Nine years from rung one to rung seven, and most of them were spent on rung one.</p>
          </section>
          <Prose>{page.body}</Prose>
          <Disclaimer className="mt-12 max-w-[66ch]" />
        </div>
        <aside className="lg:sticky lg:top-6 self-start space-y-8">
          <MiniList items={firsts} base="/races" title="The first races" />
          <MiniList items={lessons} base="/lessons" title="Do's and don'ts" cta={{ href: "/lessons", label: "All of them" }} />
          <div className="bg-swash p-5">
            <p className="eyebrow">What this is not</p>
            <p className="mt-2 text-sm leading-snug">
              This is two people writing down what they did, in a place that&apos;s probably hotter than wherever you live, and none of it is a plan, a clinic, or medical advice.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
