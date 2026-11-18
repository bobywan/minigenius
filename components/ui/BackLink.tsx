import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BackLinkProps {
  href: string;
  label?: string;
}

export function BackLink({ href, label = "Retour" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="self-start inline-flex min-h-11 items-center gap-1 rounded-full border border-line bg-surface py-2 pr-4 pl-2 font-display font-semibold text-ink-2 transition duration-150 hover:bg-surface-2 hover:text-ink"
    >
      <ChevronLeft size={20} aria-hidden="true" />
      {label.replace(/^←\s*/, "")}
    </Link>
  );
}
