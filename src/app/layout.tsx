import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { GameFloatButton } from "@/components/game/game-float-button";
import { CookieConsentProvider } from "@/components/cookie-consent";
import { siteConfig } from "@/lib/site-config";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Klimaanlage Heilbronn",
    "Klimatechnik Heilbronn",
    "Wärmepumpe Heilbronn",
    "Photovoltaik Heilbronn",
    "Stromspeicher Heilbronn",
    "Klima-Monkey",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/klimaanlage-hero.jpg",
        width: 1024,
        height: 788,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/klimaanlage-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.legal.phone,
  email: siteConfig.legal.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.legal.street,
    addressLocality: "Heilbronn",
    addressCountry: "DE",
  },
  areaServed: siteConfig.serviceArea.map((city) => ({
    "@type": "City",
    name: city,
  })),
  sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} min-h-full flex flex-col antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CookieConsentProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-brand-dark"
            >
              Zum Inhalt springen
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <GameFloatButton />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
