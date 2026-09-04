import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach Jay and Michelle. Race photos, official times, and 'we did this too' notes welcome. No coaching, no medical questions.",
};

export default function Contact() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Got the official time? Send it. We'll put it up." deck="One email address, read by two people, usually after a workout and before the coffee's gone." />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid gap-10 md:grid-cols-2 max-w-4xl">
        <div className="bg-foam border border-line p-6">
          <p className="eyebrow">Email</p>
          <a href={`mailto:${SITE.email}`} className="display text-3xl text-brand hover:text-buoy break-all block mt-2">{SITE.email}</a>
          <p className="mt-4 text-sm text-ink-soft">
            We answer anything that&apos;s a person writing to a person. If it&apos;s a pitch for electrolytes, we won&apos;t.
          </p>
        </div>
        <div className="bg-foam border border-line p-6">
          <p className="eyebrow">YouTube</p>
          <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="display text-3xl text-brand hover:text-buoy block mt-2">@racingthroughmidlife ↗</a>
          <p className="mt-4 text-sm text-ink-soft">Comments on a video are a fine way to ask about that week.</p>
        </div>
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-6 pt-4">
          <div>
            <p className="eyebrow !text-brand">Yes, please</p>
            <ul className="mt-2 text-[0.98rem] space-y-1.5">
              <li>Official results for any race on the site, with a link to the timing page.</li>
              <li>Race photos, especially the unflattering ones.</li>
              <li>“We did this too” notes from other age-groupers, here or anywhere hot.</li>
              <li>A race we should add to <a href="/calendar" className="text-brand underline">the calendar</a>.</li>
              <li>Corrections. If we got a date or a course wrong, tell us.</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow !text-buoy">Polite no</p>
            <ul className="mt-2 text-[0.98rem] space-y-1.5">
              <li>Coaching. We don&apos;t coach and we&apos;re not going to start.</li>
              <li>Medical questions. We don&apos;t know your labs.</li>
              <li>Sponsorships, affiliate offers, gear to review.</li>
              <li>Anything about mortgages. Jay has a day job and a separate site for it. This isn&apos;t that.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
