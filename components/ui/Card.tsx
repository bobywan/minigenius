import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  disabled?: boolean;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
}

const paddingMap = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({
  children,
  backgroundColor = "bg-surface",
  textColor = "text-ink",
  className = "",
  disabled = false,
  padding = "md",
  hover = true,
}: CardProps) {
  const interactive = hover && !disabled;

  return (
    <div
      className={[
        "flex flex-row items-center gap-4",
        "rounded-[var(--radius-card)] border border-line shadow-card",
        paddingMap[padding],
        backgroundColor,
        textColor,
        "transition duration-150",
        interactive && "hover:-translate-y-0.5 hover:shadow-card-hover hover:border-accent/40",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
