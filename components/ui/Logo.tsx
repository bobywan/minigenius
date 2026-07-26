interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <h1 className={["text-6xl font-display text-white", className].join(" ")}>
      Mini<span className="text-yellow-500">Genius</span>
    </h1>
  );
}
