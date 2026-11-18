"use client";

import { motion } from "framer-motion";
import { Check, Delete } from "lucide-react";

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
            whileTap={{ scale: 0.97 }}
            onClick={() => handleKey(key)}
            disabled={disabled || (isValidate && value.length === 0)}
            aria-label={isValidate ? "Valider" : isDelete ? "Effacer" : key}
            className={[
              "grid place-items-center rounded-[var(--radius-btn)] font-display font-semibold text-3xl",
              "min-h-16 select-none transition-colors duration-150",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              isValidate
                ? "bg-success text-white shadow-card hover:bg-success-ink"
                : isDelete
                  ? "bg-surface-2 text-danger-ink hover:bg-danger-soft"
                  : "bg-surface text-ink border border-line shadow-card hover:bg-surface-2",
            ].join(" ")}
          >
            {isValidate ? (
              <Check size={32} aria-hidden="true" />
            ) : isDelete ? (
              <Delete size={32} aria-hidden="true" />
            ) : (
              key
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
