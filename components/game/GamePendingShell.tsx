import { BackLink } from "@/components/ui/BackLink";

type GamePendingShellProps = {
  backHref: string;
};

export function GamePendingShell({ backHref }: GamePendingShellProps) {
  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href={backHref} />
      <div className="w-full max-w-md bg-surface border border-line shadow-card p-8 rounded-[var(--radius-card)] min-h-48" />
    </main>
  );
}
