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
    "bg-pink-500 text-white border-2 border-pink-400 shadow-[var(--shadow-pink)] hover:bg-pink-400 active:translate-y-[4px] active:shadow-[0_1px_0_#8b1a5a]",
  accent:
    "bg-orange-500 text-white border-2 border-orange-400 shadow-[var(--shadow-orange)] hover:bg-orange-400 active:translate-y-[4px] active:shadow-[0_1px_0_#8b4a00]",
  success:
    "bg-green-500 text-neutral-900 border-2 border-green-400 shadow-[var(--shadow-green)] hover:bg-green-400 active:translate-y-[4px] active:shadow-[0_1px_0_#1a6b3a]",
  yellow:
    "bg-yellow-500 text-neutral-900 border-2 border-yellow-400 shadow-[0_5px_0_#7a5c00] hover:bg-yellow-400 active:translate-y-[4px] active:shadow-[0_1px_0_#7a5c00]",
  ghost:
    "bg-purple text-neutral-100 border-2 border-white/20 shadow-[var(--shadow-btn)] hover:bg-purple-light active:translate-y-[4px] active:shadow-[0_1px_0_#0f0826]",
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
