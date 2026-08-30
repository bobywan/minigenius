import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={[
        "flex flex-row items-center gap-4",
        "rounded-[var(--radius-card)]",
        "p-4",
        "bg-white",
        "text-sky-800",
        "transition-all duration-200",
        "hover:scale-[1.02]",
        "hover:shadow-[0_8px_0_0]",
        "hover:shadow-emerald-500",
        "hover:translate-y-[-4px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
