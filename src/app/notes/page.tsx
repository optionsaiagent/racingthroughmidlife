import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { notes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Field notes",
  description: "Weekly log from Honolulu: heat, shoes, two paces, one house.",
};

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="kicker">The week around the race</p>
      <h1 className="display mt-3 text-4xl text-asphalt sm:text-6xl">Field notes</h1>
      <p className="mt-4 max-w-2xl text-lg text-mist">
        Not a training plan. What the week actually looked like. Add one every Sunday if we did the work.
      </p>
      <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
