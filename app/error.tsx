"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-display text-3xl text-white">Oups, une erreur est survenue</h1>
      <p className="text-white/90">Quelque chose s'est mal passé. Essaie encore !</p>
      <button
        type="button"
        onClick={reset}
        className="min-h-[56px] rounded-[var(--radius-btn)] border-2 border-emerald-400 bg-emerald-500 px-8 font-bold text-xl text-white shadow-[0_4px_0_#059669] active:translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Réessayer
      </button>
    </main>
  );
}
