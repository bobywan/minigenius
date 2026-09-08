import Link from "next/link";
import { Card } from "@/components/ui/Card";

type MixAllCardProps = {
  href: string;
  description: string;
};

export function MixAllCard({ href, description }: MixAllCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="justify-center">
        <div className="flex flex-col gap-1 text-center">
          <p className="text-2xl font-display">Tout mélanger</p>
          <p className="text-base text-slate-700 font-body">{description}</p>
        </div>
      </Card>
    </Link>
  );
}
