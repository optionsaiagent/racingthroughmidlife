import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import DoDont from "@/components/DoDont";
import Disclaimer from "@/components/Disclaimer";
import { MiniList } from "@/components/Cards";
import { getLesson, getLessons, getNotes, getRaces, fmtDate, related, readingTime } from "@/lib/content";

export function generateStaticParams() {
  return getLessons().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLesson(slug);
  if (!l) return {};
  return { title: l.title, description: l.deck, openGraph: { type: "article", title: l.title, description: l.deck } };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const notes = related(lesson, getNotes());
  const races = related(lesson, getRaces().filter((r) => !r.essay));
  const more = related(lesson, getLessons());

  return (
    <article className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 sm:pt-16">
      <header>
        <p className="eyebrow">
          <Link href="/lessons" className="hover:text-brand">Do&apos;s and don&apos;ts</Link> · {fmtDate(lesson.date, lesson.datePrecision, true)} · {readingTime(lesson.body)} min read
        </p>
        <h1 className="display text-5xl sm:text-7xl mt-3 max-w-4xl">{lesson.title}</h1>
        <p className="mt-6 max-w-2xl text-xl sm:text-2xl leading-snug text-ink-soft">{lesson.deck}</p>
      </header>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div>
          <Prose>{lesson.body}</Prose>
          <div className="max-w-[66ch]">
            <DoDont dos={lesson.dos} donts={lesson.donts} />
          </div>
          <Disclaimer className="mt-12 max-w-[66ch]" />
        </div>
        <aside className="lg:sticky lg:top-6 self-start space-y-8">
          <MiniList items={races} base="/races" title="Where we learned it" />
          <MiniList items={notes} base="/notes" title="Field notes" />
          <MiniList items={more} base="/lessons" title="More lessons" cta={{ href: "/lessons", label: "All do's and don'ts" }} />
        </aside>
      </div>
    </article>
  );
}
