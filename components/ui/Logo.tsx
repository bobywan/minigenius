interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const sizeClasses = {
  small: "text-2xl",
  medium: "text-4xl",
  large: "text-5xl",
};

export function Logo({ className = "", size = "medium" }: LogoProps) {
  return (
    <h1
      className={["font-display text-white drop-shadow-lg", sizeClasses[size], className].join(" ")}
    >
      Mini<span className="text-emerald-500">Genius</span>
    </h1>
  );
}
