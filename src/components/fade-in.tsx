"use client";

import { motion } from "framer-motion";

// sofort: für den Kopfbereich ganz oben. Der Inhalt steht direkt im HTML und blendet per CSS ein,
// statt unsichtbar zu warten, bis JavaScript geladen ist (sonst erscheint der wichtigste Inhalt erst nach ~3 s).
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
  if (sofort) {
    return (
      <div
        className={className ? `einblenden ${className}` : "einblenden"}
        style={delay ? { animationDelay: `${delay}s` } : undefined}
      >
        {children}
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
