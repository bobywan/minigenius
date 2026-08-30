interface PageTitleProps {
  children: string;
  size?: "4xl" | "5xl" | "6xl";
}

export function PageTitle({ children, size = "4xl" }: PageTitleProps) {
  return (
    <h1 className={`text-${size} font-display text-white first-letter:text-emerald-500`}>
      {children}
    </h1>
  );
}
