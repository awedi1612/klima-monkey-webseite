import { NextResponse } from "next/server";

// Anfragen aus dem Funnel und Rückrufwünsche gehen serverseitig an n8n; n8n legt sie in Monkey-Soft an.
// So braucht der Browser keinen Zugriff auf den n8n-Server (kein CORS, Adresse und Besucher-IP bleiben intern).
const WEBHOOK =
  process.env.N8N_ANFRAGE_WEBHOOK_URL ?? "https://friends.dyndns.info:8443/webhook/website-anfrage";

// Nur diese Felder werden weitergegeben (Länge begrenzt)
const FELDER: Record<string, number> = {
  art: 20, anrede: 20, name: 200, email: 200, telefon: 50, strasse: 200, ort: 200, nachricht: 4000,
  bereich: 100, flaeche: 50, zeitplan: 100, hersteller: 100, geraete: 50, letzte_wartung: 100, von_uns: 50,
  anliegen: 100,
};

export async function POST(request: Request) {
  let daten: unknown;
  try {
    daten = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
  if (!daten || typeof daten !== "object") {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
  const d = daten as Record<string, unknown>;

  // Honigtopf ausgefüllt = Bot: freundlich antworten, aber nichts weitergeben
  if (d.website) return NextResponse.json({ ok: true });
  if (d.datenschutz !== "eingewilligt") {
    return NextResponse.json({ error: "Bitte stimmen Sie der Datenschutzerklärung zu." }, { status: 400 });
  }

  const anfrage = Object.fromEntries(
    Object.entries(FELDER).map(([feld, laenge]) => [feld, String(d[feld] ?? "").trim().slice(0, laenge)])
  );
  if (!["klima", "wartung", "sonstiges"].includes(anfrage.art)) anfrage.art = "sonstiges";
  if (!anfrage.name || (!anfrage.email && !anfrage.telefon)) {
    return NextResponse.json({ error: "Name und E-Mail oder Telefonnummer sind erforderlich." }, { status: 400 });
  }

  try {
    const antwort = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...anfrage, datenschutz: "eingewilligt", website: "" }),
      signal: AbortSignal.timeout(15000),
    });
    if (!antwort.ok) {
      console.error(`Anfrage-Webhook antwortete mit ${antwort.status}`);
      return NextResponse.json({ error: "Die Anfrage konnte nicht übermittelt werden." }, { status: 502 });
    }
  } catch (error) {
    console.error("Anfrage-Webhook nicht erreichbar:", error);
    return NextResponse.json({ error: "Die Anfrage konnte nicht übermittelt werden." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
