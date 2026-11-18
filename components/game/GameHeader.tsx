"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { PageTitle } from "@/components/ui/PageTitle";
import { ProgressDots } from "@/components/ui/ProgressDots";
import type { DotState } from "@/lib/hooks/useSeriesGame";
import { useProgressStore } from "@/lib/store/progressStore";
import { subjectFromPath } from "@/lib/subjects";

interface GameHeaderProps {
  title: string;
  exitHref: string;
  states: DotState[];
  current: number;
  total: number;
  right?: ReactNode;
}

const CLOSE_CLS =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition duration-150 hover:bg-surface-2 hover:text-ink";

export function GameHeader({ title, exitHref, states, current, total, right }: GameHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const setLastPlayed = useProgressStore((s) => s.setLastPlayed);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inProgress = states.some((s) => s !== "idle");

  useEffect(() => {
    const subject = subjectFromPath(pathname);
    if (subject) setLastPlayed({ href: pathname, label: title, subject: subject.id });
  }, [pathname, title, setLastPlayed]);

  return (
    <header className="grid w-full gap-4 text-center">
      <div className="flex items-center gap-3">
        {inProgress ? (
          <button
            type="button"
            aria-label="Quitter la série"
            className={CLOSE_CLS}
            onClick={() => dialogRef.current?.showModal()}
          >
            <X size={24} aria-hidden="true" />
          </button>
        ) : (
          <Link href={exitHref} aria-label="Quitter la série" className={CLOSE_CLS}>
            <X size={24} aria-hidden="true" />
          </Link>
        )}

        <div className="flex flex-1 flex-col items-center gap-2">
          <ProgressDots total={total} states={states} current={current} />
          <p className="font-display font-bold text-ink-2">
            Question {current + 1} / {total}
          </p>
        </div>

        <div className="flex size-12 shrink-0 items-center justify-center">{right}</div>
      </div>

      <PageTitle>{title}</PageTitle>

      <dialog
        ref={dialogRef}
        aria-labelledby="quit-title"
        className="m-auto w-[min(92vw,24rem)] rounded-[var(--radius-card)] border border-line bg-surface p-6 text-ink shadow-pop backdrop:bg-ink/40"
      >
        <h2 id="quit-title" className="font-display text-2xl font-semibold">
          Quitter la série ?
        </h2>
        <p className="mt-2 font-body text-lg text-ink-2">Ta progression sera perdue.</p>
        <div className="mt-6 grid gap-3">
          <Button size="lg" onClick={() => dialogRef.current?.close()}>
            Continuer
          </Button>
          <Button variant="ghost" size="lg" onClick={() => router.push(exitHref)}>
            Quitter
          </Button>
        </div>
      </dialog>
    </header>
  );
}
