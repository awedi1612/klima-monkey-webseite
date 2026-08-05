import { siteConfig } from "@/lib/site-config";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

// Adresstext statt place_id: die Place-ID löst bei diesem Google-Eintrag nur
// auf Stadtteil-Ebene (Rosenberg) auf, nicht auf die exakte Hausnummer.
const QUERY = `${siteConfig.legal.street}, ${siteConfig.legal.zipCity}`;

export function LocationMap() {
  if (!API_KEY) return null;

  const src = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(QUERY)}&zoom=16`;

  return (
    <div className="overflow-hidden rounded-3xl border border-border">
      <iframe
        src={src}
        title="Standort Klima-Monkey"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full grayscale-[15%] sm:h-96"
      />
    </div>
  );
}
