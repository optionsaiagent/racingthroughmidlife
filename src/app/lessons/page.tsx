import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { lessons } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lessons",
  description: "Do’s and don’ts from midlife triathlon and marathon training in Honolulu.",
};

export default function LessonsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="kicker">Steal this, argue with it</p>
      <h1 className="display mt-3 text-4xl text-asphalt sm:text-6xl">Do’s and don’ts</h1>
      <p className="mt-4 max-w-2xl text-lg text-mist">
        The pile of things we would tell a friend at dinner. Not a protocol.
      </p>
      <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
