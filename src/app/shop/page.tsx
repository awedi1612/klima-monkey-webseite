import type { Metadata } from "next";
import { ArrowRight, Bell } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { UnderConstruction } from "@/components/under-construction";

export const metadata: Metadata = {
  title: "Shop – kommt bald",
  description: "Der Klima-Monkey Shop ist noch im Bau. Bald gibt es hier Klimaanlagen-Zubehör direkt online.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="flex flex-col items-center text-center">
        <UnderConstruction />

        <h1 className="mt-10 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Unser Shop ist im Bau
        </h1>
        <p className="mt-5 max-w-md text-balance leading-relaxed text-foreground-muted">
          Unsere Monkeys hämmern, schrauben und klettern gerade fleißig –
          bald gibt es hier Klimaanlagen-Zubehör, Ersatzteile und mehr direkt
          zum Bestellen. Bis dahin sind wir persönlich für Sie da.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/kontakt" size="lg">
            Kostenlos anfragen
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/spiel" variant="secondary" size="lg">
            Kleine Pause? Spiel Monkey Catch
          </Button>
        </div>

        <p className="mt-8 flex items-center gap-2 text-xs text-foreground-muted">
          <Bell className="h-3.5 w-3.5" />
          Tragen Sie sich für den Newsletter ein, um als Erste:r vom Start zu erfahren.
        </p>
      </Container>
    </section>
  );
}
