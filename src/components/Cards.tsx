import Link from "next/link";
import { type Base, fmtDate, readingTime } from "@/lib/content";

export function EntryList({ items, base, kind }: { items: Base[]; base: string; kind: string }) {
  return (
    <ul className="list-none m-0 p-0 divide-y divide-line border-y border-line">
      {items.map((n) => (
        <li key={n.slug}>
          <Link href={`${base}/${n.slug}`} className="group grid gap-1 sm:grid-cols-[8rem_1fr] py-6">
            <span className="mono text-xs text-mute pt-2">{fmtDate(n.date, n.datePrecision)}</span>
            <span>
              <span className="display text-3xl leading-none text-ink group-hover:text-brand transition-colors">{n.title}</span>
              <span className="block mt-2 text-ink-soft max-w-2xl">{n.deck}</span>
              <span className="block mt-2 mono text-[0.7rem] uppercase tracking-wider text-mute">
                {kind} · {readingTime(n.body)} min read
                {n.tags?.length ? ` · ${n.tags.join(", ")}` : ""}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function MiniList({ items, base, title, cta }: { items: Base[]; base: string; title: string; cta?: { href: string; label: string } }) {
  if (!items.length) return null;
  return (
    <section>
      <p className="eyebrow">{title}</p>
      <ul className="mt-3 list-none m-0 p-0 divide-y divide-line border-y border-line">
        {items.map((n) => (
          <li key={n.slug}>
            <Link href={`${base}/${n.slug}`} className="group block py-3">
              <span className="display text-xl leading-tight text-ink group-hover:text-brand transition-colors">{n.title}</span>
              <span className="block text-sm text-ink-soft mt-0.5 line-clamp-2">{n.deck}</span>
            </Link>
          </li>
        ))}
      </ul>
      {cta ? (
        <Link href={cta.href} className="inline-block mt-3 mono text-xs text-brand hover:text-buoy underline underline-offset-4">
          {cta.label} →
        </Link>
      ) : null}
    </section>
  );
}
