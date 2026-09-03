import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { races } from "@/lib/content";

export const metadata: Metadata = {
  title: "Race reports",
  description: "Honolulu Triathlon, Hibiscus Half, Honu 70.3, marathon, full Ironman. Written down.",
};

export default function RacesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="kicker">The days that count</p>
      <h1 className="display mt-3 text-4xl text-asphalt sm:text-6xl">Race reports</h1>
      <p className="mt-4 max-w-2xl text-lg text-mist">
        Local Honolulu races and the ones we flew a plane for. We do not invent splits.
      </p>
      <ul className="mt-12 grid gap-10 sm:grid-cols-2">
        {races.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
