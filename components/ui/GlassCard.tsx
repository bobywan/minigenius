import type { ReactNode } from "react";

type CardVariant = "default" | "brand" | "accent" | "success" | "error" | "yellow";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
}

const variantMap: Record<CardVariant, string> = {
  default: "bg-gradient-to-br from-white/25 to-white/10 border-white",
  brand: "bg-gradient-to-br from-[#e040fb] to-[#ff4eb8] border-white",
  accent: "bg-gradient-to-br from-[#ff6d00] to-[#ffaa4d] border-white",
  success: "bg-gradient-to-br from-[#00c853] to-[#1de9b6] border-white",
  error: "bg-gradient-to-br from-[#ff4757] to-[#ff6b6b] border-white",
  yellow: "bg-gradient-to-br from-[#ffd600] to-[#ffe566] border-white",
};

export function GlassCard({ children, className = "", variant = "default" }: GlassCardProps) {
  return (
    <div
      className={[
        "rounded-[var(--radius-card)]",
        "border-2",
        "transition-all duration-200",
        "drop-shadow-lg",
        variantMap[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
