import { Lock } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import type { MathModule, Stars } from "@/lib/types";
import { MODULE_ICONS, MODULE_LABELS } from "@/lib/types";

const MODULE_DESCRIPTIONS: Record<MathModule, string> = {
  addition: "Additionner des nombres",
  soustraction: "Soustraire des nombres",
  multiplication: "Multiplier des nombres",
  division: "Diviser des nombres",
};

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
      <Card>
        <span className="text-4xl shrink-0">{MODULE_ICONS[module]}</span>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-2xl font-display">{MODULE_LABELS[module]}</p>
          <p className="text-lg text-slate-700 font-body">{MODULE_DESCRIPTIONS[module]}</p>
        </div>
        <StarRating stars={clampedStars} size="sm" />
      </Card>
    </Link>
  );
}
