import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page introuvable",
  description: "Cette page n'existe pas.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <p className="font-display font-semibold text-7xl text-brand">404</p>
      <h1 className="font-display font-semibold text-3xl text-ink">Page introuvable</h1>
      <p className="text-lg text-ink-2">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-14 items-center justify-center rounded-[var(--radius-btn)] bg-brand px-8 font-display font-semibold text-lg text-white shadow-sm transition duration-150 hover:bg-brand-strong active:scale-[0.98]"
      >
        Retour à l'accueil
      </Link>
    </main>
  );
}
