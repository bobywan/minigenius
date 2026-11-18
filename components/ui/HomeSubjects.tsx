"use client";

import { Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { NavCard } from "@/components/ui/NavCard";
import { subjectStars, useProgressStore } from "@/lib/store/progressStore";
import { SUBJECTS } from "@/lib/subjects";

export function HomeSubjects() {
  const progress = useProgressStore((s) => s.progress);
  const lastPlayed = useProgressStore((s) => s.lastPlayed);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const last = mounted ? lastPlayed : undefined;
  const lastSubject = SUBJECTS.find((s) => s.id === last?.subject);

  return (
    <div className="flex w-full flex-col gap-4">
      {last && lastSubject && (
        <NavCard
          prominent
          href={last.href}
          className={`theme-${lastSubject.id}`}
          icon={<Play size={28} />}
          title={`Continuer : ${last.label}`}
          description={lastSubject.label}
        />
      )}

      <section className="grid w-full gap-4 lg:grid-cols-2">
        {SUBJECTS.map(({ id, icon: Icon, label, description, href }) => {
          const stars = mounted && id !== "mini-jeux" ? subjectStars(progress, id) : 0;
          return (
            <NavCard
              key={id}
              href={href}
              className={`theme-${id}`}
              icon={<Icon size={28} />}
              title={label}
              description={description}
              meta={
                stars > 0 ? (
                  <span
                    role="img"
                    aria-label={`${stars} étoiles gagnées`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-star-soft px-3 py-1 font-display font-semibold text-ink"
                  >
                    <Star size={18} aria-hidden="true" className="fill-star text-star" />
                    {stars}
                  </span>
                ) : null
              }
            />
          );
        })}
      </section>
    </div>
  );
}
