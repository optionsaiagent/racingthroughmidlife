import { getRaces, getNotes, getLessons } from "@/lib/content";
import { SITE } from "@/lib/site";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const items = [
    ...getRaces().map((r) => ({ ...r, path: `/races/${r.slug}`, kind: "Race report" })),
    ...getNotes().map((r) => ({ ...r, path: `/notes/${r.slug}`, kind: "Field note" })),
    ...getLessons().map((r) => ({ ...r, path: `/lessons/${r.slug}`, kind: "Lesson" })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 40);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(SITE.name)}</title>
<link>${SITE.url}</link>
<atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
<description>${esc(SITE.description)}</description>
<language>en-us</language>
${items
  .map(
    (i) => `<item>
<title>${esc(`${i.kind}: ${i.title}`)}</title>
<link>${SITE.url}${i.path}</link>
<guid isPermaLink="true">${SITE.url}${i.path}</guid>
<pubDate>${new Date(i.date).toUTCString()}</pubDate>
<description>${esc(i.deck)}</description>
</item>`
  )
  .join("\n")}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
