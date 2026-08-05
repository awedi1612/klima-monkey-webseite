import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.email || typeof data.email !== "string" || !data.email.includes("@")) {
    return NextResponse.json({ error: "Gültige E-Mail-Adresse erforderlich." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_NEWSLETTER_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("Newsletter-Anmeldung (kein Webhook konfiguriert):", data.email);
    return NextResponse.json({ ok: true });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, source: "website" }),
    });

    if (!webhookResponse.ok) {
      const body = await webhookResponse.text().catch(() => "");
      console.error(
        `Newsletter-Webhook antwortete mit ${webhookResponse.status}:`,
        body.slice(0, 500)
      );
      return NextResponse.json(
        { error: "Der Anmeldedienst hat die Anfrage abgelehnt." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Newsletter-Webhook nicht erreichbar:", error);
    return NextResponse.json(
      { error: "Der Anmeldedienst ist aktuell nicht erreichbar." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
