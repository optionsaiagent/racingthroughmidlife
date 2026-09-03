import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write Jay and Michelle. Honolulu. Not coaching intake.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="kicker">Desk</p>
      <h1 className="display mt-3 text-4xl text-asphalt sm:text-6xl">Contact</h1>
      <p className="mt-5 text-lg leading-relaxed text-mist">
        Email{" "}
        <a className="text-sunrise underline underline-offset-4" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        . Race photos, official times, and “we did this too” notes are welcome. We do not take coaching clients, and we
        do not give medical advice.
      </p>
      <p className="mt-8">
        <a className="btn" href={site.youtube}>
          YouTube channel
        </a>
      </p>
    </article>
  );
}
