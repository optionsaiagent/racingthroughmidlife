"use client";

import { useState } from "react";

/** Lite embed: a thumbnail until clicked, then the real player. No third-party script until the reader asks for it. */
export default function YouTube({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  const [play, setPlay] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-sm bg-ink ${className}`}>
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group absolute inset-0 h-full w-full text-left"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <span className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-4">
            <span className="text-foam">
              <span className="eyebrow !text-dawn block">Watch</span>
              <span className="display text-xl sm:text-2xl block text-foam">{title}</span>
            </span>
            <span className="shrink-0 grid place-items-center h-12 w-12 rounded-full bg-buoy text-foam transition group-hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
