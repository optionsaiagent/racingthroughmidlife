import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { EntryList } from "@/components/Cards";
import { getLessons } from "@/lib/content";

export const metadata: Metadata = {
  title: "Do's and don'ts",
  description: "The stuff we'd tell a friend over dinner about starting endurance sport after 45. Steal it, argue with it.",
};

export default function LessonsPage() {
  const lessons = getLessons();
  return (
    <>
      <PageHeader
        eyebrow={`Lessons · ${lessons.length} entries`}
        title="Steal this, argue with it"
        deck="The stuff we'd tell a friend over dinner. Every one of these came out of a specific week, a specific race, or a specific mistake. None of it's a protocol."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <EntryList items={lessons} base="/lessons" kind="Lesson" />
      </div>
    </>
  );
}
