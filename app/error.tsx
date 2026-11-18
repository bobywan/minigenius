"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="font-display font-semibold text-3xl text-ink">
        Oups, une erreur est survenue
      </h1>
      <p className="text-lg text-ink-2">Quelque chose s'est mal passé. Essaie encore !</p>
      <Button size="lg" onClick={reset}>
        Réessayer
      </Button>
    </main>
  );
}
