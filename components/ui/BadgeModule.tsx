import { NavCard } from "@/components/ui/NavCard";
import type { MathModule } from "@/lib/types";
import { MODULE_ICONS, MODULE_LABELS } from "@/lib/types";

const MODULE_DESCRIPTIONS: Record<MathModule, string> = {
  addition: "Additionner des nombres",
  soustraction: "Soustraire des nombres",
  multiplication: "Multiplier des nombres",
  division: "Diviser des nombres",
};

type BadgeModuleProps = {
  module: MathModule;
  href: string;
};

export function BadgeModule({ module, href }: BadgeModuleProps) {
  return (
    <NavCard
      href={href}
      icon={MODULE_ICONS[module]}
      title={MODULE_LABELS[module]}
      description={MODULE_DESCRIPTIONS[module]}
    />
  );
}
