"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-foam border-b border-line">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-ink focus:text-foam focus:px-3 focus:py-2 mono text-xs"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
          <Link href="/" className="flex items-center gap-3" aria-label="Racing Through Midlife, home">
            <Image
              src="/images/logo.png"
              alt="Racing Through Midlife"
              width={2960}
              height={672}
              priority
              className="h-9 sm:h-11 w-auto max-w-[min(300px,62vw)] object-contain object-left"
            />
          </Link>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
            {NAV.map((n) => {
              const active = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`eyebrow !text-[0.74rem] pb-1 border-b-2 transition-colors ${
                    active ? "border-buoy !text-ink" : "border-transparent hover:!text-brand"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="md:hidden eyebrow !text-ink border border-line px-3 py-2 rounded-sm"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Primary mobile" className="md:hidden pb-4 grid gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="display text-2xl py-2 border-t border-line hover:text-brand"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
