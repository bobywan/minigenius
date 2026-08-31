import Link from "next/link";
import { Card } from "@/components/ui/Card";
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
    <Link href={href} className="group">
      <Card>
        <span className="text-4xl shrink-0">{MODULE_ICONS[module]}</span>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-2xl font-display">{MODULE_LABELS[module]}</p>
          <p className="text-lg text-slate-700 font-body">{MODULE_DESCRIPTIONS[module]}</p>
        </div>
      </Card>
    </Link>
  );
}
