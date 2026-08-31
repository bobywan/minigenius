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
            whileTap={{
              y: 4,
              boxShadow: isValidate
                ? "0 1px 0 #059669"
                : isDelete
                  ? "0 1px 0 #b91c1c"
                  : "0 1px 0 #0c4a6e",
            }}
            onClick={() => handleKey(key)}
            disabled={disabled || (isValidate && value.length === 0)}
            aria-label={isValidate ? "Valider" : isDelete ? "Effacer" : key}
            className={[
              "rounded-[var(--radius-btn)] font-body font-bold text-3xl",
              "min-h-[68px] select-none",
              "transition-colors duration-100",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              isValidate
                ? "bg-emerald-500 text-white border-2 border-emerald-400 shadow-[0_4px_0_#059669] hover:bg-emerald-400"
                : isDelete
                  ? "bg-red-500 text-white border-2 border-red-400 shadow-[0_4px_0_#b91c1c] hover:bg-red-400"
                  : "bg-sky-800 text-white border-2 border-sky-700 shadow-[0_4px_0_#0c4a6e] hover:bg-sky-700",
            ].join(" ")}
          >
            {key}
          </motion.button>
        );
      })}
    </div>
  );
}
