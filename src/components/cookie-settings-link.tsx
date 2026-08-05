"use client";

import { useCookieConsent } from "@/components/cookie-consent";

export function CookieSettingsLink() {
  const { openSettings } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className="hover:text-brand-primary cursor-pointer"
    >
      Cookie-Einstellungen
    </button>
  );
}
