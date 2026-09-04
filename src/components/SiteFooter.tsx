import Link from "next/link";
import { SITE } from "@/lib/site";

const COLS = [
  {
    title: "The log",
    links: [
      { href: "/start-here", label: "Start here" },
      { href: "/races", label: "Race reports" },
      { href: "/notes", label: "Field notes" },
      { href: "/lessons", label: "Do's and don'ts" },
      { href: "/calendar", label: "Oahu race calendar" },
    ],
  },
  {
    title: "The camera",
    links: [
      { href: "/watch", label: "Watch the weekly videos" },
      { href: SITE.youtube, label: "YouTube channel", external: true },
    ],
  },
  {
    title: "Us",
    links: [
      { href: "/about", label: "Jay and Michelle" },
      { href: "/contact", label: "Contact" },
      { href: "/feed.xml", label: "RSS feed" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-salt">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="display text-3xl leading-none text-foam">{SITE.tagline}</p>
          <p className="mt-5 text-sm leading-relaxed text-salt/70">{SITE.disclaimer}</p>
          <p className="mt-4 mono text-xs text-salt/60">
            Official times only. If a result’s missing, we didn’t have it. Send it and we’ll put it up.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="eyebrow !text-dawn">{c.title}</p>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  {"external" in l && l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-salt/85 hover:text-foam hover:underline">
                      {l.label} ↗
                    </a>
                  ) : (
                    <Link href={l.href} className="text-salt/85 hover:text-foam hover:underline">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-salt/15">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex flex-wrap gap-x-6 gap-y-2 justify-between mono text-xs text-salt/55">
          <span>© {new Date().getFullYear()} Jay and Michelle Miller. Racing Through Midlife.</span>
          <span>Honolulu, Hawaii. Written before sunrise, mostly.</span>
        </div>
      </div>
    </footer>
  );
}
