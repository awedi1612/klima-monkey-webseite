import { NextResponse } from "next/server";
import { MAX_DATEI_BYTES, stellen } from "@/lib/stellen";

// Bewerbungen gehen wie die Anfragen serverseitig an n8n (eigener Webhook, gleicher Header-Token).
// n8n schickt sie per Mail an info@klima-monkey.de, der Lebenslauf hängt als Datei an.
const WEBHOOK =
  process.env.N8N_BEWERBUNG_WEBHOOK_URL ?? "https://friends.dyndns.info:8443/webhook/website-bewerbung";
const WEBHOOK_TOKEN = process.env.N8N_ANFRAGE_TOKEN ?? "";

const GRENZE = 3;
const FENSTER_MS = 10 * 60 * 1000;
const versuche = new Map<string, number[]>();

function zuViele(ip: string): boolean {
  const jetzt = Date.now();
  const liste = (versuche.get(ip) ?? []).filter((t) => jetzt - t < FENSTER_MS);
  liste.push(jetzt);
  versuche.set(ip, liste);
  if (versuche.size > 5000) {
    for (const [schluessel, zeiten] of versuche) {
      if (zeiten.every((t) => jetzt - t >= FENSTER_MS)) versuche.delete(schluessel);
    }
  }
  return liste.length > GRENZE;
}

const FELDER: Record<string, number> = {
  stelle: 200, name: 200, email: 200, telefon: 50, ort: 200, eintritt: 100, quelle: 100, nachricht: 4000,
};

const fehler = (text: string, status = 400) => NextResponse.json({ error: text }, { status });

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "?";
  if (zuViele(ip)) return fehler("Zu viele Bewerbungen in kurzer Zeit. Bitte versuch es später noch mal oder ruf uns an.", 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fehler("Ungültige Anfrage.");
  }

  if (form.get("website")) return NextResponse.json({ ok: true }); // Honigtopf
  if (form.get("datenschutz") !== "eingewilligt") return fehler("Bitte stimme der Datenschutzerklärung zu.");

  const daten = Object.fromEntries(
    Object.entries(FELDER).map(([feld, laenge]) => [feld, String(form.get(feld) ?? "").trim().slice(0, laenge)])
  );
  if (!daten.name || !daten.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(daten.email) || !daten.telefon) {
    return fehler("Name, E-Mail und Telefonnummer sind erforderlich.");
  }
  const erlaubt = [...stellen.map((s) => s.titel), "Initiativbewerbung"];
  if (!erlaubt.includes(daten.stelle)) daten.stelle = "Initiativbewerbung";

  const weiter = new FormData();
  for (const [feld, wert] of Object.entries(daten)) weiter.append(feld, wert);
  weiter.append("eingang", new Date().toISOString());

  const datei = form.get("lebenslauf");
  if (datei instanceof File && datei.size > 0) {
    if (datei.size > MAX_DATEI_BYTES) return fehler("Der Lebenslauf ist zu groß (höchstens 4 MB).", 413);
    const bytes = new Uint8Array(await datei.arrayBuffer());
    const istPdf = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46; // %PDF
    if (!istPdf) return fehler("Bitte lade den Lebenslauf als PDF hoch.");
    const sicher = daten.name.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 60) || "bewerbung";
    weiter.append("lebenslauf", new Blob([bytes], { type: "application/pdf" }), `Lebenslauf-${sicher}.pdf`);
  }

  try {
    const antwort = await fetch(WEBHOOK, {
      method: "POST",
      headers: WEBHOOK_TOKEN ? { "X-Webhook-Token": WEBHOOK_TOKEN } : {},
      body: weiter,
      signal: AbortSignal.timeout(20000),
    });
    if (!antwort.ok) {
      console.error(`Bewerbungs-Webhook antwortete mit ${antwort.status}`);
      return fehler("Die Bewerbung konnte nicht übermittelt werden.", 502);
    }
  } catch (error) {
    console.error("Bewerbungs-Webhook nicht erreichbar:", error);
    return fehler("Die Bewerbung konnte nicht übermittelt werden.", 502);
  }

  return NextResponse.json({ ok: true });
}
