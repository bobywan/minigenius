import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={[
        "rounded-[var(--radius-card)]",
        "border-2 border-white",
        "bg-gradient-to-br from-[#e040fb] to-[#ff4eb8]",
        "transition-all duration-200",
        "drop-shadow-lg",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
