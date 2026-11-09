import { Star } from "lucide-react";
import { GoogleIcon } from "@/components/social-icons";
import { getGoogleRating, googleReviewsUrl } from "@/lib/google-rating";

// Gesamtnote aus Google, serverseitig geladen. Ohne Daten wird nichts angezeigt.
export async function GoogleRatingBadge({ className = "" }: { className?: string }) {
  const data = await getGoogleRating();
  if (!data) return null;

  const note = data.rating.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div className={className}>
    <a
      href={googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background-card px-3 py-2.5 sm:gap-3 sm:px-4 transition-colors hover:border-brand-primary"
    >
      <GoogleIcon className="h-6 w-6 shrink-0" />
      <span className="font-display text-xl font-semibold leading-none">{note}</span>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i <= Math.round(data.rating) ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-border text-border"}`}
          />
        ))}
      </span>
      <span className="whitespace-nowrap text-sm text-foreground-muted">
        <span className="sr-only">{note} von 5 Sternen, </span>
        {data.count} Google-Bewertungen
      </span>
    </a>
    </div>
  );
}
