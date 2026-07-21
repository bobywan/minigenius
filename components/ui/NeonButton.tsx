import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "brand" | "accent" | "success" | "yellow" | "ghost";
type Size = "sm" | "md" | "lg";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}

const variantMap: Record<Variant, string> = {
  brand:
    "bg-brand-500 text-white border-2 border-brand-400 shadow-[var(--shadow-brand)] hover:bg-brand-400 active:translate-y-[4px] active:shadow-[0_1px_0_#8b1a5a]",
  accent:
    "bg-accent-500 text-white border-2 border-accent-400 shadow-[var(--shadow-accent)] hover:bg-accent-400 active:translate-y-[4px] active:shadow-[0_1px_0_#8b4a00]",
  success:
    "bg-success-500 text-neutral-900 border-2 border-success-400 shadow-[var(--shadow-success)] hover:bg-success-400 active:translate-y-[4px] active:shadow-[0_1px_0_#1a6b3a]",
  yellow:
    "bg-yellow-500 text-neutral-900 border-2 border-yellow-400 shadow-[0_5px_0_#7a5c00] hover:bg-yellow-400 active:translate-y-[4px] active:shadow-[0_1px_0_#7a5c00]",
  ghost:
    "bg-bg-card text-neutral-100 border-2 border-white/20 shadow-[var(--shadow-btn)] hover:bg-bg-card-hover active:translate-y-[4px] active:shadow-[0_1px_0_#0f0826]",
};

const sizeMap: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const BASE_CLS =
  "rounded-[var(--radius-btn)] font-display font-bold transition-all duration-100 cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

export function neonBtnCls(variant: Variant = "brand", size: Size = "md"): string {
  return [BASE_CLS, variantMap[variant], sizeMap[size]].join(" ");
}

export function NeonButton({
  children,
  variant = "brand",
  size = "md",
  className = "",
  ...props
}: NeonButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={[BASE_CLS, variantMap[variant], sizeMap[size], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
