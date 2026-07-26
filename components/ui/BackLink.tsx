import Link from "next/link";
import { neonBtnCls } from "@/components/ui/NeonButton";

interface BackLinkProps {
  href: string;
  label?: string;
}

export function BackLink({ href, label = "← Retour" }: BackLinkProps) {
  return (
    <Link href={href} className={neonBtnCls("ghost", "sm")}>
      {label}
    </Link>
  );
}
