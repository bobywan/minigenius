"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Stars } from "@/lib/types";

interface StarRatingProps {
  stars: Stars;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const sizeMap = { sm: 18, md: 24, lg: 36 };

export function StarRating({ stars, size = "md", animate = false }: StarRatingProps) {
  const sz = sizeMap[size];
  return (
    <div className="flex gap-1 items-center" role="img" aria-label={`${stars} étoile(s) sur 3`}>
      {([1, 2, 3] as Stars[]).map((s) => {
        const filled = s <= stars;
        return animate ? (
          <motion.span
            key={s}
            initial={filled ? { scale: 0, rotate: -30 } : false}
            animate={filled ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: (s - 1) * 0.15, type: "spring", stiffness: 400 }}
          >
            {filled ? (
              <Star size={sz} fill="currentColor" className="text-yellow-400" />
            ) : (
              <Star size={sz} className="text-white/30" />
            )}
          </motion.span>
        ) : (
          <span key={s}>
            {filled ? (
              <Star size={sz} fill="currentColor" className="text-yellow-400" />
            ) : (
              <Star size={sz} className="text-white/30" />
            )}
          </span>
        );
      })}
    </div>
  );
}
