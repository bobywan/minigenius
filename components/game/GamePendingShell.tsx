import { BackLink } from "@/components/ui/BackLink";

type GamePendingShellProps = {
  backHref: string;
};

export function GamePendingShell({ backHref }: GamePendingShellProps) {
  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href={backHref} />
      <div className="w-full max-w-md bg-white p-8 rounded-xl min-h-48" />
    </main>
  );
}
