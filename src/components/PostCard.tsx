import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content";

const HREF: Record<Post["kind"], string> = {
  race: "/races",
  note: "/notes",
  lesson: "/lessons",
};

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`${HREF[post.kind]}/${post.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-ocean">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 30vw, 100vw"
        />
      </div>
      <p className="kicker mt-4">
        {post.kind === "race" ? "Race" : post.kind === "note" ? "Field note" : "Lesson"}
      </p>
      <p className="display mt-2 text-2xl text-asphalt group-hover:text-sunrise">{post.title}</p>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist">{post.dek}</p>
    </Link>
  );
}
