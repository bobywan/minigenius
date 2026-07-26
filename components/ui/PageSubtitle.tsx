import type { ReactNode } from "react";

interface PageSubtitleProps {
  children: ReactNode;
}

export function PageSubtitle({ children }: PageSubtitleProps) {
  return <p className="text-white font-display text-xl drop-shadow-lg">{children}</p>;
}
