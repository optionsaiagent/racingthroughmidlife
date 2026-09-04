import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/Prose";
import YouTube from "@/components/YouTube";
import Disclaimer from "@/components/Disclaimer";
import { MiniList } from "@/components/Cards";
import { getNote, getNotes, getLessons, getRaces, fmtDate, related, readingTime } from "@/lib/content";
import { VIDEOS } from "@/lib/videos";

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return { title: note.title, description: note.deck, openGraph: { type: "article", title: note.title, description: note.deck } };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const videos = VIDEOS.filter((v) => v.note === note.slug);
  const moreNotes = related(note, getNotes());
  const lessons = related(note, getLessons());
  const races = related(note, getRaces().filter((r) => !r.essay));

  return (
    <article className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 sm:pt-16">
      <header>
        <p className="eyebrow">
          <Link href="/notes" className="hover:text-brand">Field note</Link> · {fmtDate(note.date, note.datePrecision, true)}
          {note.week ? ` · ${note.week}` : ""} · {readingTime(note.body)} min read
        </p>
        <h1 className="display text-5xl sm:text-7xl mt-3 max-w-4xl">{note.title}</h1>
        <p className="mt-6 max-w-2xl text-xl sm:text-2xl leading-snug text-ink-soft">{note.deck}</p>
      </header>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div>
          {note.video ? <YouTube id={note.video} title={note.title} className="mb-10" /> : null}
          <Prose>{note.body}</Prose>
          {videos.length ? (
            <section className="mt-12 max-w-[66ch]">
              <p className="eyebrow">The weeks on camera</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {videos.map((v) => (
                  <li key={v.id} className="py-3">
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="display text-xl text-ink hover:text-brand">
                      {v.title} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <Disclaimer className="mt-12 max-w-[66ch]" />
        </div>
        <aside className="lg:sticky lg:top-6 self-start space-y-8">
          {note.tags?.length ? (
            <p className="mono text-[0.7rem] uppercase tracking-wider text-mute">{note.tags.join(" · ")}</p>
          ) : null}
          <MiniList items={races} base="/races" title="Races this touches" />
          <MiniList items={lessons} base="/lessons" title="Related do's and don'ts" />
          <MiniList items={moreNotes} base="/notes" title="More field notes" cta={{ href: "/notes", label: "All field notes" }} />
        </aside>
      </div>
    </article>
  );
}
