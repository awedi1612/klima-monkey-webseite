"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star, PenLine, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/fade-in";

const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const REVIEW_LINK = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

type GoogleReview = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
};

type PlaceResult = {
  rating: number;
  user_ratings_total: number;
  reviews?: GoogleReview[];
};

declare global {
  interface Window {
    google?: typeof google;
    __kmReviewsInit?: () => void;
  }
}

function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating.toFixed(1)} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${i <= Math.round(rating) ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-border text-border"}`}
        />
      ))}
    </div>
  );
}

export function GoogleReviews() {
  const [place, setPlace] = useState<PlaceResult | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const dummyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!API_KEY || !PLACE_ID) {
      setStatus("error");
      return;
    }

    function init() {
      if (!window.google || !dummyRef.current) return;
      const service = new window.google.maps.places.PlacesService(dummyRef.current);
      service.getDetails(
        { placeId: PLACE_ID, fields: ["rating", "user_ratings_total", "reviews"], language: "de" },
        (result, resultStatus) => {
          if (resultStatus === "OK" && result) {
            setPlace(result as PlaceResult);
            setStatus("ready");
          } else {
            setStatus("error");
          }
        }
      );
    }

    if (window.google?.maps?.places) {
      init();
      return;
    }

    window.__kmReviewsInit = init;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=__kmReviewsInit&language=de`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      delete window.__kmReviewsInit;
    };
  }, []);

  if (status === "error") return null;

  return (
    <div>
      <div ref={dummyRef} className="hidden" />

      {status === "loading" && (
        <div className="flex items-center justify-center gap-3 py-16 text-foreground-muted">
          <Loader2 className="h-5 w-5 animate-spin" />
          Bewertungen werden geladen ...
        </div>
      )}

      {status === "ready" && place && (
        <>
          <FadeIn className="mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-background-card px-5 py-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <GoogleLogo />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-bold">
                    {place.rating.toFixed(1)}
                  </span>
                  <Stars rating={place.rating} size="h-4 w-4" />
                </div>
                <p className="text-xs text-foreground-muted">
                  {place.user_ratings_total} Google-Bewertungen
                </p>
              </div>
            </div>
            <a
              href={REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-brand-dark transition-colors hover:bg-brand-primary-hover"
            >
              <PenLine className="h-3.5 w-3.5" />
              Jetzt bewerten
            </a>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(place.reviews ?? []).slice(0, 6).map((review, index) => (
              <FadeIn key={review.author_name + index} delay={index * 0.05}>
                <ReviewCard review={review} />
              </FadeIn>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const TEXT_LIMIT = 110;

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > TEXT_LIMIT;
  const displayText =
    expanded || !isLong ? review.text : review.text.slice(0, TEXT_LIMIT).trimEnd() + "…";

  return (
    <div className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-background-card p-4">
      <div className="flex items-center gap-2.5">
        {review.profile_photo_url ? (
          <Image
            src={review.profile_photo_url}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="h-8 w-8 shrink-0 rounded-full bg-background-soft" />
        )}
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold">{review.author_name}</div>
          <div className="text-[11px] text-foreground-muted">
            {review.relative_time_description}
          </div>
        </div>
      </div>
      <Stars rating={review.rating} size="h-3.5 w-3.5" />
      <p className="text-xs leading-relaxed text-foreground-muted">
        {displayText}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="ml-1 font-semibold text-brand-primary cursor-pointer"
          >
            {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
          </button>
        )}
      </p>
      <div className="mt-auto flex items-center gap-1.5 border-t border-border pt-2 text-[11px] text-foreground-muted">
        <GoogleLogo small />
        Bewertet auf Google
      </div>
    </div>
  );
}

function GoogleLogo({ small }: { small?: boolean }) {
  const size = small ? 14 : 34;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
