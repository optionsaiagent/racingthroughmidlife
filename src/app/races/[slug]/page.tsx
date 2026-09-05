import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import YouTube from "@/components/YouTube";
import Disclaimer from "@/components/Disclaimer";
import { MiniList } from "@/components/Cards";
import { ResultCell } from "@/components/Ledger";
import ResultsCard from "@/components/ResultsCard";
import { getRace, getRaces, getNotes, getLessons, fmtDate, related, readingTime } from "@/lib/content";
import { CALENDAR } from "@/lib/calendar";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getRaces().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const race = getRace(slug);
  if (!race) return {};
  return {
    title: race.title,
    description: race.deck,
    openGraph: {
      type: "article",
      title: race.title,
      description: race.deck,
      images: race.video ? [{ url: `https://i.ytimg.com/vi/${race.video}/hqdefault.jpg` }] : undefined,
    },
  };
}

export default async function RacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const race = getRace(slug);
  if (!race) notFound();

  const all = getRaces().filter((r) => !r.essay);
  const idx = all.findIndex((r) => r.slug === race.slug);
  const newer = idx > 0 ? all[idx - 1] : undefined;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
  const cal = CALENDAR.find((c) => c.races.includes(race.slug));
  const notes = related(race, getNotes());
  const lessons = related(race, getLessons());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: race.title,
    description: race.deck,
    datePublished: race.date,
    author: [{ "@type": "Person", name: "Jay Miller" }, { "@type": "Person", name: "Michelle Miller" }],
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/races/${race.slug}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 sm:pt-16">
        <p className="eyebrow">
          <Link href="/races" className="hover:text-brand">Race reports</Link> · {race.date.slice(0, 4)}
          {race.series ? ` · ${race.series}` : ""}
          {race.author ? ` · by ${race.author}` : ""}
        </p>
        <h1 className="display text-5xl sm:text-7xl mt-3 max-w-4xl">{race.title}</h1>
        <p className="mt-6 max-w-2xl text-xl sm:text-2xl leading-snug text-ink-soft">{race.deck}</p>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div>
          {race.video ? <YouTube id={race.video} title={race.title} /> : null}
          <div className="mt-10">
            <Prose>{race.body}</Prose>
          </div>

          {!race.result && !race.essay ? (
            <p className="mt-10 mono text-xs text-mute border border-dashed border-line p-4 max-w-[66ch]">
              There&apos;s no official time on this page because we don&apos;t have one in front of us, and we&apos;re not going to make one up.
              If you&apos;ve got the official result, <Link href="/contact" className="text-brand underline">send it</Link> and it goes here.
            </p>
          ) : null}

          <nav aria-label="Other race reports" className="mt-14 grid sm:grid-cols-2 gap-4 border-t border-line pt-6">
            <div>
              {older ? (
                <Link href={`/races/${older.slug}`} className="group block">
                  <span className="eyebrow">← Earlier</span>
                  <span className="display text-2xl block mt-1 text-ink group-hover:text-brand">{older.title}</span>
                </Link>
              ) : null}
            </div>
            <div className="sm:text-right">
              {newer ? (
                <Link href={`/races/${newer.slug}`} className="group block">
                  <span className="eyebrow">Later →</span>
                  <span className="display text-2xl block mt-1 text-ink group-hover:text-brand">{newer.title}</span>
                </Link>
              ) : null}
            </div>
          </nav>
          <Disclaimer className="mt-12 max-w-[66ch]" />
        </div>

        <aside className="lg:sticky lg:top-6 self-start space-y-8">
          <dl className="bg-foam border border-line">
            {[
              ["Event", race.event],
              ["Date", fmtDate(race.date, race.datePrecision, true) + (race.datePrecision && race.datePrecision !== "day" ? " (approx.)" : "")],
              ["Where", race.location],
              ["Distance", race.distance],
              ["Who", race.athletes ?? "—"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[5rem_1fr] gap-3 px-4 py-2.5 border-b border-line last:border-b-0">
                <dt className="eyebrow pt-0.5">{k}</dt>
                <dd className="text-sm">{v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[5rem_1fr] gap-3 px-4 py-2.5 bg-swash">
              <dt className="eyebrow pt-0.5">Result</dt>
              <dd className="text-sm">
                <ResultCell race={race} />
              </dd>
            </div>
          </dl>

          {race.results ? <ResultsCard results={race.results} source={race.resultSource} /> : null}

          <p className="mono text-[0.7rem] text-mute">{readingTime(race.body)} min read</p>

          {cal ? (
            <div>
              <p className="eyebrow">On the calendar</p>
              <Link href="/calendar" className="group block mt-2">
                <span className="display text-xl text-ink group-hover:text-brand">{cal.name}</span>
                <span className="block text-sm text-ink-soft">{cal.when} · {cal.where}</span>
              </Link>
            </div>
          ) : null}

          <MiniList items={notes} base="/notes" title="The week around it" />
          <MiniList items={lessons} base="/lessons" title="What we'd tell a friend" />
        </aside>
      </div>
    </article>
  );
}
