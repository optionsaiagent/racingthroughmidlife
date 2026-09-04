import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-24 pb-16">
      <p className="eyebrow">404</p>
      <h1 className="display text-6xl sm:text-8xl mt-3">Off course.</h1>
      <p className="mt-6 max-w-lg text-xl text-ink-soft">
        That page isn&apos;t on the map. It probably moved when we rebuilt the site, or the link had a typo.
      </p>
      <div className="mt-8 flex flex-wrap gap-6 mono text-xs">
        <Link href="/races" className="text-brand underline underline-offset-4">Race reports</Link>
        <Link href="/notes" className="text-brand underline underline-offset-4">Field notes</Link>
        <Link href="/lessons" className="text-brand underline underline-offset-4">Lessons</Link>
        <Link href="/" className="text-brand underline underline-offset-4">Home</Link>
      </div>
    </div>
  );
}
