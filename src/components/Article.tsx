import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content";

const PARENT: Record<Post["kind"], { href: string; label: string }> = {
  race: { href: "/races", label: "Races" },
  note: { href: "/notes", label: "Field notes" },
  lesson: { href: "/lessons", label: "Lessons" },
};

export function Article({ post }: { post: Post }) {
  const parent = PARENT[post.kind];
  return (
    <article>
      <header className="bg-asphalt text-foam">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-2 lg:items-center lg:py-16">
          <div>
            <p className="kicker text-sunrise">
              <Link href={parent.href} className="hover:text-foam">
                {parent.label}
              </Link>
            </p>
            <h1 className="display mt-4 text-4xl sm:text-5xl">{post.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foam/80">{post.dek}</p>
            <p className="mt-4 text-sm text-salt">{post.date}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src={post.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" priority />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-5 py-12">
        {post.body.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-ink/90 [&:not(:first-child)]:mt-5">
            {p}
          </p>
        ))}
        {post.youtube ? (
          <p className="mt-10">
            <a className="btn" href={`https://www.youtube.com/watch?v=${post.youtube}`}>
              Watch on YouTube
            </a>
          </p>
        ) : null}
      </div>
    </article>
  );
}
