import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.name || !data.email) {
    return NextResponse.json({ error: "Name und E-Mail sind erforderlich." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_KONTAKT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("Kontaktanfrage (kein Webhook konfiguriert):", data);
    return NextResponse.json({ ok: true });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, quelle: "Kontaktformular (Website)" }),
    });

    if (!webhookResponse.ok) {
      const body = await webhookResponse.text().catch(() => "");
      console.error(
        `Kontaktformular-Webhook antwortete mit ${webhookResponse.status}:`,
        body.slice(0, 500)
      );
      return NextResponse.json(
        { error: "Der Nachrichtendienst hat die Anfrage abgelehnt." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Kontaktformular-Webhook nicht erreichbar:", error);
    return NextResponse.json(
      { error: "Der Nachrichtendienst ist aktuell nicht erreichbar." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
