import Link from "next/link";
import { MapPin, Mail, Phone, Smartphone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  GoogleIcon,
  ElevenEightEightZeroIcon,
} from "@/components/social-icons";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { navItems, siteConfig } from "@/lib/site-config";

const socialLinks = [
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: siteConfig.social.google, label: "Google", Icon: GoogleIcon },
  { href: siteConfig.social.elf1880, label: "11880", Icon: ElevenEightEightZeroIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-soft">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {siteConfig.tagline} – Ihr Partner für Klimaanlagen, Wärmepumpen und
            Photovoltaik in Heilbronn.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Klima-Monkey auf ${label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-brand-primary hover:text-brand-link"
              >
                <Icon className="h-4 w-auto max-w-6" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold">Navigation</div>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-foreground-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-brand-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold">Leistungen</div>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-foreground-muted">
            {navItems
              .find((i) => i.href === "/leistungen")
              ?.children?.map((child) => (
                <li key={child.href}>
                  <Link href={child.href} className="transition-colors hover:text-brand-link">
                    {child.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold">Kontakt</div>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-foreground-muted">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-link" />
              <span>
                {siteConfig.legal.street}
                <br />
                {siteConfig.legal.zipCity}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-brand-link" />
              <a href={`tel:${siteConfig.legal.phone.replace(/\s+/g, "")}`} className="hover:text-brand-link">
                {siteConfig.legal.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Smartphone className="h-4 w-4 shrink-0 text-brand-link" />
              <a href={`tel:${siteConfig.legal.mobile.replace(/\s+/g, "")}`} className="hover:text-brand-link">
                {siteConfig.legal.mobile}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-brand-link" />
              <a href={`mailto:${siteConfig.legal.email}`} className="hover:text-brand-link">
                {siteConfig.legal.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 pb-24 text-xs text-foreground-muted sm:pb-6 md:flex-row">
          <span>© {year} Klima-Monkey. Alle Rechte vorbehalten.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/spiel" className="hover:text-brand-link">
              🐒 Spiel
            </Link>
            <Link href="/impressum" className="hover:text-brand-link">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-brand-link">
              Datenschutz
            </Link>
            <CookieSettingsLink />
          </div>
        </Container>
      </div>
    </footer>
  );
}
