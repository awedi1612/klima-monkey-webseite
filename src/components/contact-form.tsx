"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-brand-primary/30 bg-brand-primary/5 p-8 text-center">
        <CheckCircle2 className="h-9 w-9 text-brand-primary" />
        <h3 className="font-display text-lg font-bold">Vielen Dank für Ihre Nachricht!</h3>
        <p className="text-sm text-foreground-muted">
          Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="E-Mail" name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telefon" name="telefon" type="tel" />
        <Field label="PLZ & Ort" name="ort" placeholder="74072 Heilbronn" />
      </div>
      <div>
        <label htmlFor="interesse" className="mb-1.5 block text-sm font-medium">
          Ich interessiere mich für
        </label>
        <select
          id="interesse"
          name="interesse"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-primary"
        >
          <option>Klimaanlagen</option>
          <option>Vermietung (Container)</option>
          <option>Dezentrale Lüftung</option>
          <option>Photovoltaik</option>
          <option>Stromspeicher</option>
          <option>Finanzierung</option>
          <option>Förderung</option>
          <option>Sonstiges</option>
        </select>
      </div>
      <div>
        <label htmlFor="nachricht" className="mb-1.5 block text-sm font-medium">
          Ihre Nachricht
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={4}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-primary"
          placeholder="Erzählen Sie uns kurz von Ihrem Anliegen ..."
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-foreground-muted">
        <input type="checkbox" required className="mt-0.5 accent-[var(--brand-primary)]" />
        Ich habe die{" "}
        <a href="/datenschutz" className="underline hover:text-brand-primary">
          Datenschutzerklärung
        </a>{" "}
        gelesen und stimme der Verarbeitung meiner Daten zu.
      </label>

      <Button type="submit" size="lg" disabled={status === "loading"} className="mt-1 self-start">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Wird gesendet ...
          </>
        ) : (
          <>
            Nachricht senden
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder
          schreiben Sie uns direkt eine E-Mail.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label} {required && <span className="text-brand-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-primary"
      />
    </div>
  );
}
