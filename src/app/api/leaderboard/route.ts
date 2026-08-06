import { NextResponse } from "next/server";

type LeaderboardEntry = { name: string; score: number };

export async function GET() {
  const webhookUrl = process.env.N8N_LEADERBOARD_FETCH_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ entries: [] });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, { cache: "no-store" });

    if (!webhookResponse.ok) {
      const body = await webhookResponse.text().catch(() => "");
      console.error(
        `Bestenliste-Webhook antwortete mit ${webhookResponse.status}:`,
        body.slice(0, 500)
      );
      return NextResponse.json({ entries: [] });
    }

    const data = await webhookResponse.json();
    const raw = Array.isArray(data) ? data : Array.isArray(data.entries) ? data.entries : [];

    const filtered: LeaderboardEntry[] = raw.filter(
      (e: unknown): e is LeaderboardEntry =>
        !!e &&
        typeof e === "object" &&
        typeof (e as LeaderboardEntry).name === "string" &&
        typeof (e as LeaderboardEntry).score === "number"
    );
    const entries = filtered.sort((a, b) => b.score - a.score).slice(0, 10);

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Bestenliste-Webhook nicht erreichbar:", error);
    return NextResponse.json({ entries: [] });
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  const name = typeof data.name === "string" ? data.name.trim().slice(0, 24) : "";
  const score = Number(data.score);

  if (!name || !Number.isInteger(score) || score < 0 || score > 2000) {
    return NextResponse.json({ error: "Ungültiger Name oder Punktestand." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_LEADERBOARD_SUBMIT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("Bestenliste-Eintrag (kein Webhook konfiguriert):", name, score);
    return NextResponse.json({ ok: true });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score, source: "website" }),
    });

    if (!webhookResponse.ok) {
      const body = await webhookResponse.text().catch(() => "");
      console.error(
        `Bestenliste-Submit-Webhook antwortete mit ${webhookResponse.status}:`,
        body.slice(0, 500)
      );
      return NextResponse.json({ error: "Der Bestenlisten-Dienst hat die Anfrage abgelehnt." }, { status: 502 });
    }
  } catch (error) {
    console.error("Bestenliste-Submit-Webhook nicht erreichbar:", error);
    return NextResponse.json(
      { error: "Der Bestenlisten-Dienst ist aktuell nicht erreichbar." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
