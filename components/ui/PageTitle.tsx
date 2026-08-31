type PageTitleProps = {
  children: string;
  size?: "4xl" | "5xl" | "6xl";
};

const SIZE_CLASS = {
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
} as const;

export function PageTitle({ children, size = "4xl" }: PageTitleProps) {
  return (
    <h1 className={`${SIZE_CLASS[size]} font-display text-white first-letter:text-emerald-500`}>
      {children}
    </h1>
  );
}
