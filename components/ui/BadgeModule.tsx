import { Lock } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
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
        <GlassCard className="p-3 flex flex-col items-center gap-2">
          <span className="text-4xl font-display text-white/60">{MODULE_ICONS[module]}</span>
          <p className="text-base font-display text-white/60">{MODULE_LABELS[module]}</p>
          <StarRating stars={0} />
        </GlassCard>
        <div className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-card)]">
          <Lock size={32} className="text-white/80" />
        </div>
      </div>
    );
  }

  return (
    <Link href={href} className="group">
      <GlassCard className="p-3 flex flex-col items-center gap-2 cursor-pointer group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-200">
        <span className="text-4xl font-display leading-none">{MODULE_ICONS[module]}</span>
        <p className="text-base font-display text-white">{MODULE_LABELS[module]}</p>
        <StarRating stars={clampedStars} />
      </GlassCard>
    </Link>
  );
}
