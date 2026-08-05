import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Newsletter bestätigt",
  robots: { index: false, follow: true },
};

export default function NewsletterBestaetigtPage() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Anmeldung bestätigt!
        </h1>
        <p className="mt-4 max-w-md text-balance text-foreground-muted">
          Danke – Ihre Newsletter-Anmeldung ist jetzt bestätigt. Sie erhalten
          künftig gelegentlich Neuigkeiten von Klima-Monkey.
        </p>
        <div className="mt-8">
          <Button href="/">Zurück zur Startseite</Button>
        </div>
      </Container>
    </section>
  );
}
