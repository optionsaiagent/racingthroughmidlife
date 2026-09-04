import raw from "../../content/videos.json";

export type VideoKind = "race" | "training" | "review" | "intro";
export interface Video {
  id: string;
  title: string;
  year: number;
  month?: number; // 1-12 where known from the title convention
  kind: VideoKind;
  race?: string; // slug of the race report, if one exists
  note?: string; // slug of a field note, if one exists
  views?: number;
}

export const VIDEOS: Video[] = raw as Video[];

export function videosByYear(): { year: number; videos: Video[] }[] {
  const map = new Map<number, Video[]>();
  for (const v of VIDEOS) {
    if (!map.has(v.year)) map.set(v.year, []);
    map.get(v.year)!.push(v);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]).map(([year, videos]) => ({ year, videos }));
}

export function getVideo(id: string): Video | undefined {
  return VIDEOS.find((v) => v.id === id);
}

export function topVideos(n = 6): Video[] {
  return [...VIDEOS].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, n);
}

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
