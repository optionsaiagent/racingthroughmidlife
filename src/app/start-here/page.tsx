import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Prose from "@/components/Prose";
import Disclaimer from "@/components/Disclaimer";
import { getPage, getRaces, getLessons } from "@/lib/content";
import { MiniList } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Start here, if you are 45 and up",
  description: "How two people in their fifties went from an 8-mile fun run to a full Ironman without a coach, in order, with dates. Not a plan. A ladder you can look at.",
};

const RUNGS = [
  { rung: "8.15 miles", what: "Great Aloha Run", note: "For years this was the longest either of us had run. Nothing wrong with staying here a while.", href: "/races/great-aloha-run-2023" },
  { rung: "13.1 miles", what: "Hibiscus Half, May 2022", note: "Our first half. The day this happened, the marathon stopped being hypothetical.", href: "/races/hibiscus-half-2022" },
  { rung: "26.2 miles", what: "Honolulu Marathon, December 2022", note: "For Jay's 50th. He'd never wanted one. Michelle put it on a birthday and that was that.", href: "/races/honolulu-marathon-for-fifty" },
  { rung: "Olympic tri", what: "Honolulu Triathlon, May 2023", note: "Same race we'd done in 2014, this time with training. Where you find out if you like the sport or just the idea of it.", href: "/races/honolulu-triathlon-2014-and-again" },
  { rung: "70.3", what: "IRONMAN 70.3 Hawaii, June 2023", note: "A hard course on purpose. If Jay could get through a half in the lava, he could get through one anywhere.", href: "/races/honu-70-3-2023" },
  { rung: "112 miles", what: "Dick Evans, August 2023", note: "The Ironman bike distance on its own, before we stuck a swim and a marathon on either side of it.", href: "/races/dick-evans-112-2023" },
  { rung: "140.6", what: "The full distance", note: "Only after every rung above was done. A season you pay for in sleep.", href: "/races/going-the-full-distance" },
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
            <p className="mt-4 mono text-xs text-mute">Nine years from rung one to rung seven, most of them spent on rung one.</p>
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
              Not a plan, not a clinic, not medical advice. Two people writing down what they did, in a place that&apos;s hotter than wherever you live.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
