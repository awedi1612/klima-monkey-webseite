import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/fade-in";
import { MonkeyCatch } from "@/components/game/monkey-catch";

export const metadata: Metadata = {
  title: "Monkey Catch – das Klima-Monkey Spiel",
  description:
    "Kleine Pause gefällig? Spiel Monkey Catch: Fang Schneeflocken und Kokosnüsse, weich Hitzewellen aus – powered by Klima-Monkey Heilbronn.",
  robots: { index: false, follow: true },
};

export default function SpielPage() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Kleine Pause?"
            title="Monkey Catch"
            description="Unser Klima-Monkey braucht Hilfe beim Kühlbleiben: Schneeflocken, Bananen und Kokosnüsse fangen, Sonne und Hitzewellen ausweichen. 45 Sekunden, so viele Punkte wie möglich."
            align="center"
            className="mx-auto"
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <MonkeyCatch />
        </FadeIn>

        <FadeIn delay={0.15} className="mx-auto mt-14 max-w-lg text-center">
          <p className="text-sm text-foreground-muted">
            Und wenn draußen wirklich die Sonne knallt: Wir sorgen für echte Abkühlung.
          </p>
          <div className="mt-5 flex justify-center">
            <Button href="/kontakt">
              Kostenlos anfragen
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
