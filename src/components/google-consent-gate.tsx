"use client";

import { MapPin } from "lucide-react";
import { useCookieConsent } from "@/components/cookie-consent";
import { Button } from "@/components/ui/button";

export function GoogleConsentGate({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  const { hasGoogleConsent, acceptAll } = useCookieConsent();

  if (hasGoogleConsent) return <>{children}</>;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-background-soft p-10 text-center ${className ?? ""}`}
    >
      <MapPin className="h-8 w-8 text-brand-link" />
      <p className="max-w-sm text-sm text-foreground-muted">
        {label} wird von Google bereitgestellt. Zum Anzeigen müssen Sie
        Google-Diensten in unseren Cookie-Einstellungen zustimmen.
      </p>
      <Button onClick={acceptAll} size="md">
        Google-Dienste laden
      </Button>
    </div>
  );
}
