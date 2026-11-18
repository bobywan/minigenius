import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const sizeClasses = {
  small: { text: "text-2xl", tile: "size-9 rounded-xl", icon: 20 },
  medium: { text: "text-4xl", tile: "size-12 rounded-2xl", icon: 26 },
  large: { text: "text-5xl", tile: "size-16 rounded-[1.25rem]", icon: 34 },
};

export function Logo({ className = "", size = "medium" }: LogoProps) {
  const s = sizeClasses[size];

  return (
    <h1
      className={[
        "inline-flex items-center justify-center gap-3 font-display font-semibold tracking-tight text-ink",
        s.text,
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "grid shrink-0 place-items-center bg-brand text-white shadow-card",
          s.tile,
        ].join(" ")}
      >
        <Sparkles size={s.icon} />
      </span>
      <span>
        Mini<span className="text-brand">Genius</span>
      </span>
    </h1>
  );
}
