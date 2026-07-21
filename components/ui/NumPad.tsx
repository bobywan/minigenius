"use client";

import { motion } from "framer-motion";

interface NumPadProps {
  value: string;
  onChange: (value: string) => void;
  onValidate: () => void;
  disabled?: boolean;
}

const KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "⌫", "0", "✓"] as const;

export function NumPad({ value, onChange, onValidate, disabled = false }: NumPadProps) {
  function handleKey(key: string) {
    if (disabled) return;
    if (key === "⌫") {
      onChange(value.slice(0, -1));
    } else if (key === "✓") {
      if (value.length > 0) onValidate();
    } else {
      if (value.length < 4) onChange(value + key);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
      {KEYS.map((key) => {
        const isValidate = key === "✓";
        const isDelete = key === "⌫";
        return (
          <motion.button
            key={key}
            type="button"
            style={{ textShadow: "var(--text-shadow-solid)" }}
            whileTap={{ y: 4, boxShadow: "0 1px 0 #0f0826" }}
            onClick={() => handleKey(key)}
            disabled={disabled || (isValidate && value.length === 0)}
            aria-label={isValidate ? "Valider" : isDelete ? "Effacer" : key}
            className={[
              "rounded-[var(--radius-btn)] font-body font-bold text-3xl",
              "min-h-[68px] select-none",
              "transition-colors duration-100",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              isValidate
                ? "bg-success-500 text-neutral-900 border-2 border-success-400 shadow-[var(--shadow-success)]"
                : isDelete
                  ? "bg-error-500 text-white border-2 border-error-400 shadow-[var(--shadow-error)]"
                  : "bg-neutral-900/80 hover:bg-neutral-900/95 text-white border-2 border-white/30 shadow-[var(--shadow-btn)]",
            ].join(" ")}
          >
            {key}
          </motion.button>
        );
      })}
    </div>
  );
}
