import { Shuffle } from "lucide-react";
import { NavCard } from "@/components/ui/NavCard";

type MixAllCardProps = {
  href: string;
  description: string;
};

export function MixAllCard({ href, description }: MixAllCardProps) {
  return (
    <NavCard
      href={href}
      icon={<Shuffle size={28} />}
      title="Tout mélanger"
      description={description}
    />
  );
}
