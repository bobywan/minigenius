import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type NavCardProps = {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function NavCard({ href, icon, title, description, className = "" }: NavCardProps) {
  return (
    <Link href={href} className={`group ${className}`}>
      <Card>
        <span
          aria-hidden="true"
          className="grid size-14 shrink-0 place-items-center rounded-[var(--radius-tile)] bg-accent-soft font-display text-3xl text-accent-ink"
        >
          {icon}
        </span>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-2xl font-display text-ink">{title}</p>
          <p className="text-lg text-ink-2 font-body">{description}</p>
        </div>
        <ChevronRight
          size={24}
          aria-hidden="true"
          className="shrink-0 text-ink-3 transition-transform duration-150 group-hover:translate-x-1"
        />
      </Card>
    </Link>
  );
}
