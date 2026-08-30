import Link from "next/link";

interface BackLinkProps {
  href: string;
  label?: string;
}

export function BackLink({ href, label = "← Retour" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="self-start bg-amber-500 text-white font-bold font-display px-4 py-2 rounded-md"
    >
      {label}
    </Link>
  );
}
