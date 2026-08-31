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
  backgroundColor = "bg-white",
  textColor = "text-sky-800",
  className = "",
  disabled = false,
  padding = "md",
  hover = true,
}: CardProps) {
  return (
    <div
      className={[
        "flex flex-row items-center gap-4",
        "rounded-[var(--radius-card)]",
        paddingMap[padding],
        backgroundColor,
        textColor,
        "transition-all duration-200",
        hover && !disabled && "hover:scale-[1.02]",
        hover && !disabled && "hover:shadow-[0_8px_0_0]",
        hover && !disabled && "hover:shadow-emerald-500",
        hover && !disabled && "hover:translate-y-[-4px]",
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
