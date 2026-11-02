import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="max-w-2xl text-center">
        <p className="text-base font-semibold text-brand-link sm:text-lg">Fehler 404</p>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Diese Seite gibt es nicht
        </h1>
        <p className="mt-5 text-lg text-foreground-muted">
          Vielleicht wurde sie verschoben. Auf der Startseite finden Sie alles Wichtige.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" size="lg">
            Zur Startseite
          </Button>
        </div>
      </Container>
    </section>
  );
}
