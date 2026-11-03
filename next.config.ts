import type { NextConfig } from "next";

// Adressen der alten Website (Stand Sitemap 11/2026) auf die passenden neuen Seiten.
// Dauerhafte Weiterleitung (308), damit Google Rankings auf die neue Adresse überträgt.
const alteAdressen: Record<string, string> = {
  "/index.html": "/",
  "/ueber-uns.html": "/ueber-uns",
  "/leistungen.html": "/leistungen",
  "/leistungen/klimaanlagen.html": "/leistungen/klimaanlagen",
  "/leistungen/photovoltaik.html": "/leistungen/photovoltaik",
  "/leistungen/stromspeicher.html": "/leistungen/stromspeicher",
  "/leistungen/finanzierung.html": "/leistungen/finanzierung",
  "/leistungen/foerderung.html": "/leistungen/foerderung",
  "/monkeys/elektro-monkey.html": "/monkeys",
  "/monkeys/tech-monkey.html": "/monkeys",
  "/kontakt.html": "/kontakt",
  "/vielen-dank-fuer-ihre-anfrage.html": "/kontakt",
  "/impressum.html": "/impressum",
  "/datenschutz.html": "/datenschutz",
  "/fachbeitraege-kopie.html": "/leistungen/klimaanlagen",
  "/news-details.html": "/leistungen/klimaanlagen",
  "/news-details/klimaanlage-kaufen-ratgeber.html": "/leistungen/klimaanlagen/klimaanlage-kosten",
  "/news-details/photovoltaik-klimaanlage-kombination.html": "/leistungen/photovoltaik/pv-und-klimaanlage",
  "/news-details/klimaanlage-wartung-heilbronn.html": "/leistungen/wartung-klimaanlagen",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(alteAdressen).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
