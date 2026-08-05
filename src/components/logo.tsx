"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Dunkles Theme -> weiße Schrift, helles Theme -> graue Schrift
  const src =
    mounted && resolvedTheme === "dark"
      ? "/images/logo-white-text.svg"
      : "/images/logo-gray-text.svg";

  return (
    <Link href="/" className={className} aria-label="Klima-Monkey Startseite">
      <Image
        src={src}
        alt="Klima-Monkey"
        width={180}
        height={44}
        priority
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  );
}
