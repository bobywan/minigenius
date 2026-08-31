import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}

const variantMap: Record<Variant, string> = {
  primary:
    "bg-emerald-500 text-white border-2 border-emerald-400 shadow-[0_5px_0_#059669] hover:bg-emerald-400 active:translate-y-[4px] active:shadow-[0_1px_0_#059669]",
  secondary:
    "bg-amber-500 text-white border-2 border-amber-400 shadow-[0_5px_0_#d97706] hover:bg-amber-400 active:translate-y-[4px] active:shadow-[0_1px_0_#d97706]",
  ghost:
    "bg-white text-sky-800 border-2 border-sky-200 shadow-[0_5px_0_#0c4a6e] hover:bg-sky-50 active:translate-y-[4px] active:shadow-[0_1px_0_#0c4a6e]",
};

const sizeMap: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const BASE_CLS =
  "rounded-[var(--radius-btn)] font-display font-bold transition-all duration-100 cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

export function buttonCls(variant: Variant = "primary", size: Size = "md"): string {
  return [BASE_CLS, variantMap[variant], sizeMap[size]].join(" ");
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
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
