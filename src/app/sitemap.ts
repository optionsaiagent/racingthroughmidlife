import type { MetadataRoute } from "next";
import { getRaces, getNotes, getLessons } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const stat = ["", "/start-here", "/races", "/calendar", "/notes", "/lessons", "/watch", "/about", "/contact"].map((p) => ({
    url: `${SITE.url}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const races = getRaces().map((r) => ({ url: `${SITE.url}/races/${r.slug}`, lastModified: r.date, priority: 0.8 }));
  const notes = getNotes().map((r) => ({ url: `${SITE.url}/notes/${r.slug}`, lastModified: r.date, priority: 0.6 }));
  const lessons = getLessons().map((r) => ({ url: `${SITE.url}/lessons/${r.slug}`, lastModified: r.date, priority: 0.6 }));
  return [...stat, ...races, ...notes, ...lessons];
}
