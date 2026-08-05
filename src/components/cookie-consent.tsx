"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

type Consent = "all" | "necessary";

type ConsentRecord = {
  value: Consent;
  version: number;
  timestamp: string;
};

const STORAGE_KEY = "km-cookie-consent";
// Bump when the set of cookie categories/purposes changes, to re-prompt existing visitors.
const CONSENT_VERSION = 1;
// Re-ask after 12 months even without a version change, per DSK-Empfehlung.
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

function readStoredConsent(): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (
      (parsed.value !== "all" && parsed.value !== "necessary") ||
      typeof parsed.timestamp !== "string" ||
      parsed.version !== CONSENT_VERSION
    ) {
      return null;
    }
    if (Date.now() - new Date(parsed.timestamp).getTime() > CONSENT_MAX_AGE_MS) {
      return null;
    }
    return parsed as ConsentRecord;
  } catch {
    return null;
  }
}

type ConsentContextValue = {
  consent: Consent | null;
  consentTimestamp: string | null;
  hasGoogleConsent: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [consentTimestamp, setConsentTimestamp] = useState<string | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = readStoredConsent();
    if (stored) {
      setConsent(stored.value);
      setConsentTimestamp(stored.timestamp);
    } else {
      setBannerOpen(true);
    }
  }, []);

  const persist = useCallback((value: Consent) => {
    const record: ConsentRecord = {
      value,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    setConsent(value);
    setConsentTimestamp(record.timestamp);
    setBannerOpen(false);
  }, []);

  const value: ConsentContextValue = {
    consent,
    consentTimestamp,
    hasGoogleConsent: consent === "all",
    acceptAll: () => persist("all"),
    acceptNecessary: () => persist("necessary"),
    openSettings: () => setBannerOpen(true),
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {mounted && (
        <AnimatePresence>
          {bannerOpen && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background-card/98 backdrop-blur"
              role="dialog"
              aria-label="Cookie-Einstellungen"
            >
              <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div className="flex items-start gap-3">
                  <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <p className="text-sm text-foreground-muted">
                    Wir nutzen technisch notwendige Funktionen sowie optional{" "}
                    <strong className="text-foreground">Google-Dienste</strong> (Standortkarte &amp;
                    Google-Bewertungen), die eigene Cookies setzen. Details in unserer{" "}
                    <a href="/datenschutz" className="text-brand-primary underline">
                      Datenschutzerklärung
                    </a>
                    .
                  </p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <Button variant="secondary" onClick={() => persist("necessary")}>
                    Nur notwendige
                  </Button>
                  <Button onClick={() => persist("all")}>Alle akzeptieren</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </ConsentContext.Provider>
  );
}
