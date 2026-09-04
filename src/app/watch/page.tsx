import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import YouTube from "@/components/YouTube";
import { VIDEOS, videosByYear, MONTH_NAMES, type Video } from "@/lib/videos";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watch",
  description: "Every Racing Through Midlife video by season: the 2023 weekly vlog, race recaps, and year-in-review films. The channel is the camera. The site is the written log.",
};

function Row({ v }: { v: Video }) {
  const href = v.race ? `/races/${v.race}` : v.note ? `/notes/${v.note}` : undefined;
  return (
    <li className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[9rem_1fr] gap-4 py-3 items-center">
      <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch on YouTube: ${v.title}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt="" loading="lazy" className="aspect-video w-full object-cover rounded-sm bg-swash" />
      </a>
      <div className="min-w-0">
        <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="display text-lg sm:text-xl leading-tight text-ink hover:text-brand block">
          {v.title}
        </a>
        <p className="mt-1 mono text-[0.68rem] uppercase tracking-wider text-mute flex flex-wrap gap-x-3">
          <span className={v.kind === "race" ? "text-buoy" : ""}>{v.kind === "race" ? "Race recap" : v.kind === "review" ? "Year in review" : v.kind === "intro" ? "Introduction" : "Training week"}</span>
          {href ? (
            <Link href={href} className="text-brand underline underline-offset-2 normal-case tracking-normal">
              {v.race ? "Read the report" : "Read the field note"} →
            </Link>
          ) : null}
        </p>
      </div>
    </li>
  );
}

export default function WatchPage() {
  const years = videosByYear();
  const latest = VIDEOS[0];

  return (
    <>
      <PageHeader
        eyebrow={`Watch · ${VIDEOS.length} videos`}
        title="The channel is the camera"
        deck="The site is for the sentences that should still be here in three years. The videos are for the rest: the bike rack at 4:45 a.m., the finish chute, the blooper reel. Every video, by season."
      >
        <p className="mt-6">
          <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="mono text-xs text-brand underline underline-offset-4 hover:text-buoy">
            Subscribe on YouTube ↗
          </a>
        </p>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="mb-16">
          <p className="eyebrow buoy">Latest</p>
          <div className="mt-3 max-w-3xl">
            <YouTube id={latest.id} title={latest.title} />
          </div>
        </section>

        <nav aria-label="Jump to season" className="mb-10 flex flex-wrap gap-2">
          {years.map((y) => (
            <a key={y.year} href={`#v${y.year}`} className="mono text-xs border border-line px-3 py-1.5 hover:border-ink hover:bg-foam">
              {y.year} <span className="text-mute">· {y.videos.length}</span>
            </a>
          ))}
        </nav>

        {years.map((y) => {
          const isWeekly = y.year === 2023;
          const groups: { label: string; videos: Video[] }[] = [];
          if (isWeekly) {
            const byMonth = new Map<number, Video[]>();
            for (const v of y.videos) {
              const m = v.month ?? 0;
              if (!byMonth.has(m)) byMonth.set(m, []);
              byMonth.get(m)!.push(v);
            }
            for (const [m, vids] of [...byMonth.entries()].sort((a, b) => b[0] - a[0])) {
              groups.push({ label: m ? MONTH_NAMES[m - 1] : "Start", videos: vids });
            }
          } else {
            groups.push({ label: "", videos: y.videos });
          }
          return (
            <section key={y.year} id={`v${y.year}`} className="mb-16 scroll-mt-8">
              <div className="flex items-baseline gap-4">
                <h2 className="display text-5xl">{y.year}</h2>
                <span className="mono text-xs text-mute">
                  {isWeekly ? "the weekly vlog season, one episode a week" : `${y.videos.length} ${y.videos.length === 1 ? "video" : "videos"}`}
                </span>
              </div>
              {groups.map((g) => (
                <div key={g.label || "all"} className="mt-6">
                  {g.label ? <h3 className="eyebrow !text-brand border-b border-line pb-2">{g.label}</h3> : null}
                  <ul className="divide-y divide-line">
                    {g.videos.map((v) => (
                      <Row key={v.id} v={v} />
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </>
  );
}
