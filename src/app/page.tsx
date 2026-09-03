import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { lessons, notes, races } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const latestNote = notes[0];
  const nextRace = races[0];

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-asphalt">
        <Image
          src="/images/hero.jpg"
          alt="Dawn swim start, Honolulu"
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/50 to-asphalt/25" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28">
          <p className="kicker text-sunrise">Honolulu · Jay and Michelle Miller</p>
          <h1 className="display mt-4 max-w-3xl text-4xl text-foam sm:text-6xl">{site.tagline}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foam/85">
            We started late. Olympic distance, halves, marathons, 70.3, full Ironman. This is the written log — what
            worked, what we would not do again, and the week around the race.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/races" className="btn">
              Race reports
            </Link>
            <Link
              href="/notes"
              className="inline-flex min-h-12 items-center border border-foam/30 px-5 text-[0.75rem] font-bold tracking-[0.12em] text-foam uppercase"
            >
              Field notes
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2">
        <div>
          <p className="kicker">This season</p>
          <h2 className="display mt-3 text-3xl text-asphalt">What we just learned</h2>
          <p className="mt-4 text-mist">{latestNote.dek}</p>
          <Link href={`/notes/${latestNote.slug}`} className="mt-6 inline-block text-sm text-sunrise underline underline-offset-4">
            {latestNote.title}
          </Link>
        </div>
        <div>
          <p className="kicker">On the calendar</p>
          <h2 className="display mt-3 text-3xl text-asphalt">The race we keep writing about</h2>
          <p className="mt-4 text-mist">{nextRace.dek}</p>
          <Link href={`/races/${nextRace.slug}`} className="mt-6 inline-block text-sm text-sunrise underline underline-offset-4">
            {nextRace.title}
          </Link>
        </div>
      </section>

      <section className="bg-asphalt text-foam">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker text-sunrise">The house</p>
            <h2 className="display mt-3 text-4xl">Two engines. One kitchen. One calendar.</h2>
            <p className="mt-4 max-w-lg text-foam/80">
              Michelle talked Jay into a marathon for his 50th. He sat on an easy pace so she could PR a half. That is
              the whole project: age-group racing as a couple in Hawaii, without turning it into a coaching funnel.
            </p>
            <Link href="/about" className="btn mt-8">
              About Jay and Michelle
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/bikes-rack.jpg"
              alt="Two triathlon bikes on a rack at dawn"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker">Archive</p>
            <h2 className="display mt-3 text-4xl text-asphalt">Race reports</h2>
          </div>
          <Link href="/races" className="hidden text-sm text-sunrise underline underline-offset-4 sm:inline">
            All races
          </Link>
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {races.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="kicker">Do’s and don’ts</p>
          <h2 className="display mt-3 text-4xl text-asphalt">Lessons we would tell a friend</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {lessons.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
