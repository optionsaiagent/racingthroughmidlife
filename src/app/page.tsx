import Image from "next/image";
import Link from "next/link";
import Ledger from "@/components/Ledger";
import YouTube from "@/components/YouTube";
import Disclaimer from "@/components/Disclaimer";
import { MiniList } from "@/components/Cards";
import { getRaces, getNotes, getLessons, fmtDate, readingTime } from "@/lib/content";
import { VIDEOS } from "@/lib/videos";
import { SITE } from "@/lib/site";

const LADDER = [
  { year: "2014", what: "Honolulu Triathlon, Tin Man", note: "Not training. The bug had not landed." },
  { year: "2022", what: "First half marathon. First marathon, for Jay's 50th", note: "The long run became real, so the race did." },
  { year: "2023", what: "Olympic, Honu 70.3, 112 miles around Oahu, Honolulu Marathon", note: "The season we filmed every week." },
  { year: "2025", what: "The full distance", note: "A season you have to fund with sleep." },
];

export default function Home() {
  const races = getRaces().filter((r) => !r.essay);
  const notes = getNotes();
  const lessons = getLessons();
  const latestNote = notes[0];
  const latestVideo = VIDEOS[0];
  const recaps = VIDEOS.filter((v) => v.kind === "race" && v.id !== latestVideo.id)
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 4);

  return (
    <>
      {/* Hero: the swim start, before the sun. */}
      <section className="relative bg-ink text-foam overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Orange swim buoys in flat water at dawn, Honolulu"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-28 sm:pt-44 pb-12 sm:pb-16">
          <p className="eyebrow !text-dawn">Honolulu · age-group racing · the written log</p>
          <h1 className="display text-[3.6rem] leading-[0.92] sm:text-8xl mt-4 max-w-4xl text-foam">
            We didn&apos;t start racing until our fifties.
          </h1>
          <p className="mt-7 max-w-xl text-lg sm:text-xl leading-snug text-salt/85">
            Two Honolulu age-groupers, an 8-mile fun run, and eventually a full Ironman. This is the log we kept along the way
            &mdash; the training that actually stuck, the mistakes we won&apos;t repeat, and what race week really looks like when
            you&apos;re doing this with a midlife body.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/start-here"
              className="inline-flex items-center gap-2 bg-buoy text-foam px-5 py-3 mono text-xs uppercase tracking-widest hover:bg-dawn hover:text-ink transition-colors"
            >
              Start here if you are 45 and up
            </Link>
            <Link
              href="/races"
              className="inline-flex items-center gap-2 border border-salt/50 text-foam px-5 py-3 mono text-xs uppercase tracking-widest hover:border-foam hover:bg-foam/10 transition-colors"
            >
              Read the race reports
            </Link>
          </div>
        </div>
      </section>

      {/* Orientation strip */}
      <section className="border-b border-line bg-foam">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
          {[
            { href: "/races", k: "Race reports", v: "One page per race. Written so the day does not live only inside a thumbnail." },
            { href: "/notes", k: "Field notes", v: "The week between races. Heat, salt, dawn, the trainer, and whose day it is." },
            { href: "/lessons", k: "Do's and don'ts", v: "What we would tell a friend at dinner. Not a protocol. Argue with it." },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="group py-6 sm:px-6 first:pl-0 last:pr-0">
              <span className="display text-2xl text-ink group-hover:text-brand transition-colors">{c.k} →</span>
              <span className="block mt-1 text-sm text-ink-soft">{c.v}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ledger */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="eyebrow">The ledger</p>
            <h2 className="display text-4xl sm:text-5xl mt-2">Recent races</h2>
          </div>
          <p className="mono text-xs text-mute max-w-xs">
            Official results only. A blank is a blank, not a guess.
          </p>
        </div>
        <div className="mt-8">
          <Ledger races={races.slice(0, 7)} />
        </div>
        <Link href="/races" className="inline-block mt-5 mono text-xs text-brand hover:text-buoy underline underline-offset-4">
          Every race since 2014, by year →
        </Link>
      </section>

      {/* Latest note + lessons */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        {latestNote ? (
          <div>
            <p className="eyebrow buoy">Latest field note</p>
            <Link href={`/notes/${latestNote.slug}`} className="group block mt-3">
              <h2 className="display text-4xl sm:text-6xl text-ink group-hover:text-brand transition-colors">{latestNote.title}</h2>
              <p className="mt-4 text-xl text-ink-soft max-w-2xl leading-snug">{latestNote.deck}</p>
              <p className="mt-4 mono text-xs text-mute">
                {fmtDate(latestNote.date, latestNote.datePrecision)} · {readingTime(latestNote.body)} min read
              </p>
            </Link>
            <div className="mt-8">
              <MiniList items={notes.slice(1, 4)} base="/notes" title="More notes" cta={{ href: "/notes", label: "All field notes" }} />
            </div>
          </div>
        ) : null}
        <div className="lg:border-l lg:border-line lg:pl-10">
          <MiniList items={lessons.slice(0, 5)} base="/lessons" title="Do's and don'ts" cta={{ href: "/lessons", label: "All lessons" }} />
          <div className="mt-10 bg-swash p-6">
            <p className="eyebrow">In their words</p>
            <blockquote className="display text-3xl leading-tight mt-3">Honolulu does not care about your FTP. The dew point does.</blockquote>
            <Link href="/notes/heat-is-the-fourth-sport" className="inline-block mt-4 mono text-xs text-brand hover:text-buoy underline underline-offset-4">
              Heat is the fourth sport →
            </Link>
          </div>
        </div>
      </section>

      {/* Watch */}
      <section className="mt-20 bg-foam border-y border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">The camera</p>
            <h2 className="display text-4xl sm:text-5xl mt-2">Latest video</h2>
            <div className="mt-6">
              <YouTube id={latestVideo.id} title={latestVideo.title} />
            </div>
            <p className="mt-4 text-sm text-ink-soft max-w-xl">
              The channel is the camera. The site is the written log. Weekly videos, race recaps, and the occasional blooper reel at{" "}
              <a href={SITE.youtube} className="text-brand underline" target="_blank" rel="noopener noreferrer">
                youtube.com/@racingthroughmidlife
              </a>
              .
            </p>
          </div>
          <div>
            <p className="eyebrow">Most-watched recaps</p>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {recaps.map((v) => (
                <li key={v.id}>
                  <Link href={v.race ? `/races/${v.race}` : "/watch"} className="group flex gap-4 py-3 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt="" loading="lazy" className="w-24 aspect-video object-cover rounded-sm bg-swash shrink-0" />
                    <span>
                      <span className="display text-lg leading-tight text-ink group-hover:text-brand transition-colors">{v.title}</span>
                      <span className="block mono text-[0.68rem] text-mute mt-0.5">{v.year} · report + video</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/watch" className="inline-block mt-4 mono text-xs text-brand hover:text-buoy underline underline-offset-4">
              All {VIDEOS.length} videos, by season →
            </Link>
          </div>
        </div>
      </section>

      {/* Ladder */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-20">
        <p className="eyebrow">How we got here</p>
        <h2 className="display text-4xl sm:text-5xl mt-2 max-w-2xl">Nobody skipped a rung. That is the whole point.</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {LADDER.map((l) => (
            <li key={l.year} className="border-t-2 border-ink pt-4">
              <span className="mono text-sm text-brand">{l.year}</span>
              <span className="display text-2xl block mt-2 leading-tight">{l.what}</span>
              <span className="block mt-2 text-sm text-ink-soft">{l.note}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link href="/about" className="mono text-xs text-brand hover:text-buoy underline underline-offset-4">The longer version →</Link>
          <Link href="/calendar" className="mono text-xs text-brand hover:text-buoy underline underline-offset-4">The Oahu race calendar we build a year around →</Link>
        </div>
        <Disclaimer className="mt-16" />
      </section>
    </>
  );
}
