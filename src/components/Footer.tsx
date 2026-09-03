import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-asphalt text-foam">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="display text-2xl">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-foam/70">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2 text-sm text-foam/80">
            <li>
              <Link href="/races">Race reports</Link>
            </li>
            <li>
              <Link href="/notes">Field notes</Link>
            </li>
            <li>
              <Link href="/lessons">Do’s and don’ts</Link>
            </li>
            <li>
              <Link href="/watch">Watch</Link>
            </li>
            <li>
              <Link href="/about">Jay and Michelle</Link>
            </li>
            <li>
              <a href={site.youtube} rel="noreferrer">
                YouTube
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-sm leading-relaxed text-foam/60">
          Age-group racing in Honolulu. Not a coaching business, not a clinic, not medical advice. We write what we
          actually did.
        </p>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto flex max-w-6xl flex-wrap gap-x-4 gap-y-1 px-5 py-5 text-xs text-foam/45">
          <span>
            © {site.authors}. {site.name}.
          </span>
          <Link href="/contact">Contact</Link>
        </p>
      </div>
    </footer>
  );
}
