import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Prose from "@/components/Prose";
import { getPage } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jay and Michelle",
  description: "Two Army vets in Honolulu who didn't start racing seriously until midlife, at 42 and 49: who we are, how we got here, and the rules this site keeps.",
};

const TIMELINE = [
  { when: "2005 – 2006", what: "Jay does a few triathlons and doesn't like them." },
  { when: "2014", what: "Jay talks Michelle into the Honolulu Triathlon, then the Tin Man two months later, without really training for either." },
  { when: "Dec 2021", what: "On a Sunday walk, watching the 49th Honolulu Marathon go by, Michelle says we should run it next year for Jay's 50th. We sign up two days later. Longest run in the house at the time: 8.1 miles." },
  { when: "May 2022", what: "Hibiscus Half, the first half marathon for both of us." },
  { when: "Dec 2022", what: "Honolulu Marathon, the 50th birthday race.", href: "/races/honolulu-marathon-for-fifty" },
  { when: "Jan 2023", what: "The weekly vlog starts, one episode a week, all year." , href: "/watch"},
  { when: "Mar 2023", what: "Michelle wins her age group at the Ku'ikahi 10K.", href: "/races/kuikahi-10k-2023" },
  { when: "May 2023", what: "Honolulu Triathlon, raced seriously this time. Hibiscus Half, where Michelle runs 2:12, a PR, with Jay pacing.", href: "/races/hibiscus-half-2023" },
  { when: "Jun 2023", what: "IRONMAN 70.3 Hawaii, Jay's first 70.3.", href: "/races/honu-70-3-2023" },
  { when: "Aug 2023", what: "Dick Evans Memorial: 112 miles around Oahu.", href: "/races/dick-evans-112-2023" },
  { when: "Oct 2023", what: "First ride over the Pali and first ride on Zwift, and the room off the bedroom becomes a gym." , href: "/notes/the-trainers-off-the-bedroom"},
  { when: "Dec 2023", what: "Honolulu Marathon again, 4:00 and 5:37.", href: "/races/honolulu-marathon-2023" },
  { when: "Jun 2024", what: "Michelle's first 70.3 at Honu, and Jay 81 minutes faster than the year before.", href: "/races/honu-70-3-2024" },
  { when: "Sep 2024", what: "Augusta 70.3 canceled by Hurricane Helene two days out. The full Ironman idea starts here.", href: "/seasons/2024" },
  { when: "Dec 2024", what: "Honolulu Marathon on Jay's birthday, the PR year: Jay 3:41, Michelle 4:39.", href: "/races/honolulu-marathon-2024" },
  { when: "Apr 2025", what: "IRONMAN Texas, the full distance, both of us.", href: "/races/ironman-texas-2025" },
  { when: "Oct 2025", what: "IRONMAN California, the second full in one year.", href: "/races/ironman-california-2025" },
  { when: "Dec 2025", what: "Honolulu Marathon, run together, 5:25:08 each.", href: "/races/honolulu-marathon-2025" },
  { when: "2026", what: "Honu for the fourth time, then 70.3 Northern California in August.", href: "/races/honu-70-3-2026" },
];

export default function About() {
  const page = getPage("about");
  return (
    <>
      <PageHeader eyebrow="About" title={page.title} deck={page.deck} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative aspect-[3/2] sm:aspect-[21/9] w-full overflow-hidden rounded-sm mb-12">
          <Image src="/images/bikes-rack.jpg" alt="Two triathlon bikes on a rack at dawn" fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
        </div>
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div>
            <Prose>{page.body}</Prose>
          </div>
          <aside className="space-y-10">
            <section>
              <p className="eyebrow">The timeline</p>
              <p className="mt-1 text-sm text-ink-soft">Year by year, with what each one was for and what it cost, on <Link href="/seasons" className="text-brand underline">the seasons page</Link>.</p>
              <ol className="mt-3 border-l-2 border-line">
                {TIMELINE.map((t) => (
                  <li key={t.when + t.what} className="relative pl-5 pb-5">
                    <span className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-buoy" aria-hidden="true" />
                    <span className="mono text-xs text-brand">{t.when}</span>
                    {t.href ? (
                      <Link href={t.href} className="block text-[0.98rem] leading-snug hover:text-brand">{t.what}</Link>
                    ) : (
                      <span className="block text-[0.98rem] leading-snug">{t.what}</span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
            <section className="bg-swash p-5">
              <p className="eyebrow">Reach us</p>
              <p className="mt-2 text-sm">
                <a href={`mailto:${SITE.email}`} className="text-brand underline">{SITE.email}</a>
                <br />
                <a href={SITE.youtube} className="text-brand underline" target="_blank" rel="noopener noreferrer">youtube.com/@racingthroughmidlife</a>
              </p>
              <p className="mt-3 text-sm text-ink-soft">Race photos, official times, and &quot;we did this too&quot; notes are all welcome. Coaching requests and medical questions get a polite no.</p>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
