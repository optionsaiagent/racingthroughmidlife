"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const NAV = [
  { href: "/races", label: "Races" },
  { href: "/notes", label: "Field notes" },
  { href: "/lessons", label: "Lessons" },
  { href: "/watch", label: "Watch" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-foam/92 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex min-h-11 shrink items-center" aria-label={site.name}>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={2960}
            height={672}
            priority
            className="h-8 w-auto max-w-[min(240px,58vw)] object-contain object-left sm:h-9 sm:max-w-[280px] lg:h-10 lg:max-w-[320px]"
          />
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className="inline-flex min-h-11 items-center px-3 text-sm text-mist hover:text-sunrise"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex h-3.5 w-4 flex-col justify-between" aria-hidden>
            <span className="block h-px bg-asphalt" />
            <span className="block h-px bg-asphalt" />
            <span className="block h-px bg-asphalt" />
          </span>
        </button>
        {open ? (
          <nav className="absolute inset-x-0 top-full border-b border-line bg-foam lg:hidden" aria-label="Primary">
            <ul className="flex flex-col px-5 py-3">
              {NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex min-h-11 items-center" onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
