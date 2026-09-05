import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");

export type Athletes = "Jay" | "Michelle" | "Both";
export type Discipline = "run" | "tri" | "bike" | "swim" | "trail" | "multi";

export interface AthleteResult {
  time: string;
  agegroup?: string;
  agrank?: string | number;
  place?: string | number;
  genderRank?: string | number;
  pace?: string;
  swim?: string;
  t1?: string;
  bike?: string;
  t2?: string;
  run?: string;
  run1?: string;
  run2?: string;
  splits?: Record<string, string>;
  bib?: string | number;
}

export interface Base {
  slug: string;
  title: string;
  deck: string;
  date: string; // ISO date; precision below says how much of it to trust
  datePrecision?: "day" | "month" | "year";
  tags?: string[];
  video?: string; // YouTube ID
  image?: string;
  imageAlt?: string;
  author?: "Jay" | "Michelle" | "Both";
  body: string;
}

export interface Race extends Base {
  event: string;
  location: string;
  distance: string;
  discipline: Discipline;
  athletes?: Athletes;
  result?: string; // official only; never estimated. Short form for the ledger.
  results?: Partial<Record<"jay" | "michelle", AthleteResult>>; // structured official results
  resultSource?: string; // where the official result lives
  featured?: boolean;
  calendar?: string; // key into calendar entries
  series?: string;
  essay?: boolean; // not a race day; a piece that lives under /races for URL continuity
}

export interface Note extends Base {
  week?: string; // e.g. "2023 · Feb, week 3"
}

export interface Lesson extends Base {
  dos?: string[];
  donts?: string[];
}

function readDir<T extends Base>(dir: string): T[] {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  const files = fs.readdirSync(full).filter((f) => f.endsWith(".md"));
  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(full, file), "utf8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, "");
    return { ...(data as Omit<T, "slug" | "body">), slug, body: content.trim() } as T;
  });
  return items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getRaces(): Race[] {
  return readDir<Race>("races");
}
export function getRace(slug: string): Race | undefined {
  return getRaces().find((r) => r.slug === slug);
}
export function getNotes(): Note[] {
  return readDir<Note>("notes");
}
export function getNote(slug: string): Note | undefined {
  return getNotes().find((r) => r.slug === slug);
}
export function getLessons(): Lesson[] {
  return readDir<Lesson>("lessons");
}
export function getLesson(slug: string): Lesson | undefined {
  return getLessons().find((r) => r.slug === slug);
}

export function racesByYear(races: Race[]): { year: string; races: Race[] }[] {
  const map = new Map<string, Race[]>();
  for (const r of races) {
    const y = r.date.slice(0, 4);
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(r);
  }
  return [...map.entries()].map(([year, races]) => ({ year, races }));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function fmtDate(iso: string, precision: Base["datePrecision"] = "day", long = false): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = long ? MONTHS_LONG : MONTHS;
  if (precision === "year") return String(y);
  if (precision === "month") return `${months[m - 1]} ${y}`;
  return long ? `${months[m - 1]} ${d}, ${y}` : `${months[m - 1]} ${d}, ${y}`;
}

/** Ledger date: fixed width, mono. Month-precision dates show the month only. */
export function ledgerDate(iso: string, precision: Base["datePrecision"] = "day"): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (precision === "year") return `${y}`;
  if (precision === "month") return `${y} ${MONTHS[m - 1]}`;
  return `${y} ${MONTHS[m - 1]} ${String(d).padStart(2, "0")}`;
}

export function readingTime(body: string): number {
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}

/** Notes and lessons that share a tag with the given item. */
export function related<T extends Base>(item: Base, pool: T[], limit = 3): T[] {
  const tags = new Set(item.tags ?? []);
  return pool
    .filter((p) => p.slug !== item.slug)
    .map((p) => ({ p, score: (p.tags ?? []).filter((t) => tags.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export interface Page extends Base {
  [key: string]: unknown;
}
export function getPage(slug: string): Page {
  const raw = fs.readFileSync(path.join(ROOT, "pages", `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  return { ...(data as Omit<Page, "slug" | "body">), slug, body: content.trim() } as Page;
}
