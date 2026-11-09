// Gesamtnote und Anzahl der Google-Bewertungen, serverseitig abgerufen (Places API, New).
// Läuft auf dem Server, Besucherdaten gehen nicht an Google – daher ohne Cookie-Zustimmung zeigbar.
// Braucht einen eigenen Server-Schlüssel ohne Referrer-Beschränkung: GOOGLE_PLACES_SERVER_KEY.
// Fehlt der Schlüssel oder schlägt der Abruf fehl, liefert die Funktion null und es wird nichts angezeigt.

export type GoogleRating = { rating: number; count: number };

const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "";
const SERVER_KEY = process.env.GOOGLE_PLACES_SERVER_KEY ?? "";

export async function getGoogleRating(): Promise<GoogleRating | null> {
  if (!PLACE_ID || !SERVER_KEY) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: { "X-Goog-Api-Key": SERVER_KEY, "X-Goog-FieldMask": "rating,userRatingCount" },
      next: { revalidate: 86400 }, // einmal am Tag neu abrufen
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { rating?: number; userRatingCount?: number };
    if (typeof data.rating !== "number" || !data.userRatingCount) return null;
    return { rating: data.rating, count: data.userRatingCount };
  } catch {
    return null;
  }
}

export const googleReviewsUrl = `https://search.google.com/local/reviews?placeid=${PLACE_ID}`;
