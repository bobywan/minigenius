import type { ReactNode } from "react";

interface PageSubtitleProps {
  children: ReactNode;
}

export function PageSubtitle({ children }: PageSubtitleProps) {
  return <p className="text-ink-2 text-lg font-body">{children}</p>;
}
