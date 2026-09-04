import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { EntryList } from "@/components/Cards";
import { getNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Field notes",
  description: "Not a training plan. What the week actually looked like, written down on Sundays when we did the work. Heat, 4:30 alarms, the trainer, and whose day it is.",
};

export default function NotesPage() {
  const notes = getNotes();
  const tags = [...new Set(notes.flatMap((n) => n.tags ?? []))].sort();
  return (
    <>
      <PageHeader
        eyebrow={`Field notes · ${notes.length} entries`}
        title="What the week actually looked like"
        deck="Not a training plan. The weeks between races, written down on Sundays when we did the work. If one of these reads like advice, it's the kind you'd get from a friend, not a coach."
      >
        <p className="mt-6 mono text-xs text-mute">Themes: {tags.join(" · ")}</p>
      </PageHeader>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <EntryList items={notes} base="/notes" kind="Field note" />
      </div>
    </>
  );
}
