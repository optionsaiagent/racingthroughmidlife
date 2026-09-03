import type { Metadata } from "next";
import { videos } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watch",
  description: "Racing Through Midlife on YouTube. Jay and Michelle Miller.",
};

export default function WatchPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="kicker">The camera</p>
      <h1 className="display mt-3 text-4xl text-asphalt sm:text-6xl">Watch</h1>
      <p className="mt-4 max-w-2xl text-lg text-mist">
        The weekly videos. The site is for the sentences that should still be here in three years.{" "}
        <a className="text-sunrise underline underline-offset-4" href={site.youtube}>
          Full channel
        </a>
        .
      </p>
      <ul className="mt-12 grid gap-10 lg:grid-cols-2">
        {videos.map((video) => (
          <li key={video.id}>
            <div className="relative aspect-video overflow-hidden bg-asphalt">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="display mt-4 text-2xl text-asphalt">{video.title}</p>
            <p className="mt-2 text-sm text-mist">{video.dek}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
