"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { subjectFromPath } from "@/lib/subjects";

export function TopBar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const subject = subjectFromPath(pathname);
  const Icon = subject?.icon;

  return (
    <nav
      aria-label="Navigation principale"
      className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur lg:px-8"
    >
      <Link
        href="/"
        aria-label="Accueil"
        className="inline-flex min-h-12 items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink"
      >
        <span
          aria-hidden="true"
          className="grid size-8 place-items-center rounded-lg bg-brand text-white"
        >
          <Sparkles size={18} />
        </span>
        <span>
          Mini<span className="text-brand">Genius</span>
        </span>
      </Link>

      {subject && Icon && (
        <Link
          href={subject.href}
          className={`theme-${subject.id} inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-soft px-4 font-display font-semibold text-accent-ink`}
        >
          <Icon size={18} aria-hidden="true" />
          {subject.label}
        </Link>
      )}
    </nav>
  );
}
