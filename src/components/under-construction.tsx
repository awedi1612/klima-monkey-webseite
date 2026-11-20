"use client";

const stripes =
  "repeating-linear-gradient(135deg, #f5c518 0, #f5c518 22px, #171b12 22px, #171b12 44px)";

const floaters = [
  { emoji: "🔧", top: "8%", left: "10%", delay: 0 },
  { emoji: "🪛", top: "18%", left: "82%", delay: 0.3 },
  { emoji: "🧰", top: "78%", left: "14%", delay: 0.6 },
  { emoji: "🐒", top: "72%", left: "80%", delay: 0.2 },
];

export function UnderConstruction() {
  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-border bg-background-card">
      <div className="h-3 w-full" style={{ backgroundImage: stripes }} />

      <div className="relative flex flex-col items-center gap-6 px-8 py-14 sm:py-16">
        {floaters.map((f) => (
          <span
            key={f.emoji + f.top}
            aria-hidden="true"
            className="wackeln-schweben absolute text-2xl sm:text-3xl"
            style={{ top: f.top, left: f.left, animationDelay: `${f.delay}s` }}
          >
            {f.emoji}
          </span>
        ))}

        <div className="wackeln text-7xl sm:text-8xl">🐒</div>
        <span className="-mt-4 text-3xl sm:text-4xl">🚧</span>

        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-foreground-muted">
            <span>Baufortschritt</span>
            <span>82&nbsp;%*</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-background-soft">
            <div
              className="balken-fuellen h-full rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary"
              style={{ width: "82%" }}
            />
          </div>
          <p className="mt-2 text-[11px] text-foreground-muted">
            *Monkey-Schätzung, keine Garantie 🙈
          </p>
        </div>
      </div>

      <div className="h-3 w-full" style={{ backgroundImage: stripes }} />
    </div>
  );
}
