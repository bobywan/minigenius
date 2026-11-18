import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}

const variantMap: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand-strong",
  secondary: "bg-brand-soft text-brand-strong hover:bg-brand/15",
  ghost: "bg-surface text-ink border border-line hover:bg-surface-2",
};

const sizeMap: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-8 text-lg",
};

const BASE_CLS =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] font-display font-semibold transition duration-150 cursor-pointer select-none active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

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
