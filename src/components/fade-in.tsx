"use client";

import { useEffect, useRef } from "react";

// Blendet Inhalt ein, sobald er beim Scrollen in den Sichtbereich kommt (CSS-Übergang, Klassen in globals.css).
// sofort: für den Kopfbereich ganz oben. Der Inhalt steht direkt im HTML und blendet per CSS-Animation ein,
// statt unsichtbar zu warten, bis JavaScript geladen ist.
export function FadeIn({
  children,
  delay = 0,
  className,
  sofort = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  sofort?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (sofort || !el) return;
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        if (eintraege.some((e) => e.isIntersecting)) {
          el.classList.add("ist-sichtbar");
          beobachter.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, [sofort]);

  const art = sofort ? "einblenden" : "beim-scrollen";
  const stil = delay ? (sofort ? { animationDelay: `${delay}s` } : { transitionDelay: `${delay}s` }) : undefined;

  return (
    <div ref={ref} className={className ? `${art} ${className}` : art} style={stil}>
      {children}
    </div>
  );
}
