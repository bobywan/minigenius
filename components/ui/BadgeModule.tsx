import { Lock } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import type { MathModule, Stars } from "@/lib/types";
import { MODULE_ICONS, MODULE_LABELS } from "@/lib/types";

interface BadgeModuleProps {
  module: MathModule;
  href: string;
  totalStars: Stars | number;
  locked?: boolean;
}

export function BadgeModule({ module, href, totalStars, locked = false }: BadgeModuleProps) {
  const clampedStars = Math.min(3, totalStars) as Stars;

  if (locked) {
    return (
      <div className="relative opacity-50 cursor-not-allowed select-none">
        <Card>
          <span className="text-4xl font-display text-white/60">{MODULE_ICONS[module]}</span>
          <p className="text-base font-display text-amber-500/60">{MODULE_LABELS[module]}</p>
          <StarRating stars={0} />
        </Card>
        <div className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-card)]">
          <Lock size={32} className="text-amber-500/80" />
        </div>
      </div>
    );
  }

  return (
    <Link href={href} className="group">
      <Card className="justify-center">
        <div className="flex flex-col items-center gap-1">
          <p className="text-2xl font-display">{MODULE_LABELS[module]}</p>
          <StarRating stars={clampedStars} />
        </div>
      </Card>
    </Link>
  );
}
