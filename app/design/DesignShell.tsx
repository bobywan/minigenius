"use client";

import { ArrowUp } from "lucide-react";
import { createContext, type ReactNode, useContext, useState } from "react";
import { Button } from "@/components/ui/Button";

export type DeviceMode = "mobile" | "tablet" | "desktop";

const DEVICE_MODES = [
  { id: "mobile" as const, label: "Mobile" },
  { id: "tablet" as const, label: "Tablette" },
  { id: "desktop" as const, label: "Desktop" },
];

const WIDTHS: Record<DeviceMode, number> = {
  mobile: 375,
  tablet: 768,
  desktop: 1000,
};

const PILL =
  "min-h-12 inline-flex items-center text-sm font-body font-semibold rounded-full px-4 cursor-pointer border";

type DeviceContextValue = {
  mode: DeviceMode;
  setMode: (mode: DeviceMode) => void;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

type DesignShellProps = {
  children: ReactNode;
};

export function DesignShell({ children }: DesignShellProps) {
  const [mode, setMode] = useState<DeviceMode>("tablet");

  return (
    <DeviceContext.Provider value={{ mode, setMode }}>
      <div className="min-h-screen mx-auto w-full max-w-full" style={{ maxWidth: WIDTHS[mode] }}>
        {children}
      </div>
      <Button
        variant="primary"
        size="sm"
        className="fixed bottom-4 right-4 z-50 rounded-full px-3"
        aria-label="Retour en haut"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={20} aria-hidden />
      </Button>
    </DeviceContext.Provider>
  );
}

export function DevicePills() {
  const ctx = useContext(DeviceContext);
  if (!ctx) return null;

  return (
    <nav aria-label="Largeur d'aperçu" className="flex flex-wrap justify-center gap-3 mt-2">
      {DEVICE_MODES.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => ctx.setMode(item.id)}
          className={[
            PILL,
            ctx.mode === item.id
              ? "bg-brand-soft border-brand text-brand-strong"
              : "bg-surface border-line text-ink hover:bg-brand-soft",
          ].join(" ")}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
