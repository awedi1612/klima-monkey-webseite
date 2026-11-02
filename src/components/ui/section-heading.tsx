import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-base font-semibold text-brand-link sm:text-lg">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-balance text-lg leading-relaxed text-foreground-muted sm:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
