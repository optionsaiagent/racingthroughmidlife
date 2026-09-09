import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import { getSeasonStories, getSeasonStory, getRaces, readingTime } from "@/lib/content";
import { seasonFor } from "@/lib/seasons";
import Ledger from "@/components/Ledger";

export function generateStaticParams() {
  return getSeasonStories().map((s) => ({ year: String(s.year) }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const { year } = await params;
  const s = getSeasonStory(year);
  if (!s) return {};
  return { title: s.title, description: s.deck };
}

export default async function SeasonPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const story = getSeasonStory(year);
  if (!story) notFound();
  const season = seasonFor(year);
  const races = getRaces().filter((r) => !r.essay && r.date.startsWith(year)).sort((a, b) => (a.date < b.date ? -1 : 1));
  return (
    <article className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 sm:pt-16">
      <header>
        <p className="eyebrow">
          <Link href="/seasons" className="hover:text-brand">The seasons</Link> · {year}
          {story.author ? ` · by ${story.author}` : ""} · {readingTime(story.body)} min read
        </p>
        <h1 className="display text-5xl sm:text-7xl mt-3 max-w-4xl">{story.title}</h1>
        <p className="mt-6 max-w-2xl text-xl sm:text-2xl leading-snug text-ink-soft">{story.deck}</p>
      </header>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div>
          <Prose>{story.body}</Prose>
          <section className="mt-14">
            <p className="eyebrow">The {year} races</p>
            <div className="mt-3">
              <Ledger races={races} showYear={false} />
            </div>
          </section>
        </div>
        <aside className="lg:sticky lg:top-6 self-start space-y-6">
          {season ? (
            <dl className="bg-foam border border-line px-4 py-3 space-y-3">
              <div><dt className="eyebrow">What it was for</dt><dd className="mt-1 text-sm leading-snug">{season.intent}</dd></div>
              <div><dt className="eyebrow">What it cost</dt><dd className="mt-1 text-sm leading-snug">{season.whatItCost}</dd></div>
              <div><dt className="eyebrow">What we changed</dt><dd className="mt-1 text-sm leading-snug">{season.whatWeChanged}</dd></div>
            </dl>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
