interface PageTitleProps {
  children: string;
  size?: "4xl" | "5xl" | "6xl";
}

export function PageTitle({ children, size = "4xl" }: PageTitleProps) {
  const [first, ...rest] = children;
  return (
    <h1 className={`text-${size} font-display text-white`}>
      <span className="text-yellow-500">{first}</span>
      {rest.join("")}
    </h1>
  );
}
