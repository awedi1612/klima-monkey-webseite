# Förderung Klimaanlage – Grundlage für den Förderrechner

Stand der Prüfung: 2026-11-17. Regeln im Code: `src/lib/foerderung.ts`, Oberfläche: `src/components/foerderrechner.tsx`,
eingebunden auf `/leistungen/foerderung#foerderrechner`.

## Kernaussage

Eine Split-/Multisplit-Klimaanlage **mit Heizfunktion** gilt als Luft-Luft-Wärmepumpe und ist als „Anlage zur
Wärmeerzeugung“ in der BEG EM förderfähig (Privat: KfW 458). Reine Kühlgeräte werden in Wohngebäuden nicht gefördert.

Beleg: Technische FAQ BEG EM, Version 8.0 (11/2026), Nr. 8.21/8.22 – „Zu den Luft-Luft-Wärmepumpen zählen auch
Split-Klimaanlagen bzw. Klimaanlagen mit Heizfunktion, die beispielsweise zu einem bestehenden Heizsystem nachgerüstet werden.“

## Regeln (im Original geprüft)

| Regel | Wert | Fundstelle |
|---|---|---|
| Grundförderung Wärmepumpe | 30 %, ab „Quartal 1 2027“ 15 % (+15 % Wertschöpfungs-Bonus bei EU-Herkunft) | Richtlinie BEG EM 8.4.1 c, 8.4.6 |
| Klimageschwindigkeits-Bonus (nur Selbstnutzer, Tausch Öl/Kohle/Gas-Etage/Nachtspeicher, Gas/Biomasse ≥ 20 J., alte Heizung raus) | 16 % bis 31.01.2027, dann 12 / 8 / 4 %, ab 01.08.2028 0 % | 8.4.4 |
| Einkommens-Bonus (nur Selbstnutzer) | 40 % bis 30.000 €, 30 % bis 40.000 €, 10 % bis 50.000 €; Kind < 18: Einkommen −10.000 € | 8.4.5 |
| Deckel | 70 %, 80 % bei Einkommen bis 30.000 € (40.000 € mit Familienzuschlag) | 8.4.1 |
| Höchstgrenze förderfähige Kosten | 28.000 € (1. WE, sinkt ab 01.02.2027 halbjährlich um 750 €), 15.000 € (WE 2–6), 8.000 € (ab 7.); bei Teilmaßnahme anteilig je Wohnung | 8.3.1 a |
| Bestandsgebäude | Bauantrag ≥ 5 Jahre | 3 a |
| Mindestinvestition | 300 € | 5 |
| Ab Q1 2027 ausgeschlossen | Gebäude hat schon Wärmepumpe/Biomasse/Solar o. Ä. mit Inbetriebnahme ab 01.01.2008 | 5.3 |
| Gerät | ηs ≥ 181 % (≤ 12 kW), > 12 kW ηs,h ≥ 150 %; Kombination A++/A+++ laut Label; Außengerät auf BAFA-Liste | TMA 3.4, TFAQ 8.22 |
| 65 % erneuerbar | bivalent parallel: WP ≥ 30 % Heizleistung/Norm-Heizlast, alternativ ≥ 40 % | TFAQ 8.21 |
| Netzdienlich | Schnittstelle § 14a EnWG, iMSys bestellen | TMA 3.4.3 |
| Kältemittel | ab 01.01.2028 nur natürliche (R290, R600a, R1270 …) | TMA 3.4.4 |
| Antragsberechtigt | alle Investoren; Mieter nur mit Information/Bestätigung des Eigentümers | 6.1 |
| Nichtwohngebäude, nur Kühlen | „Kältetechnik zur Raumkühlung“ 15 %, Luft-Luft ≤ 12 kW ηs,c ≥ 241 % | 5.2 d, 8.4.1 b, TMA |

Ablauf KfW 458: BzA (Fachbetrieb) → Vertrag mit aufschiebender/auflösender Bedingung → Antrag „Meine KfW“ vor Beginn →
Umsetzung (36 Monate) → Bestätigung nach Durchführung, Rechnungen unbar, Nachweis Luftvolumenströme → Auszahlung.

## Quellen

- Förderrichtlinie BEG EM (in Kraft 21.07.2026): https://www.ingenieurkammer.de/fileadmin/dokumente/Downloads_PDF/News_Dokumente/20260717_F%C3%B6rderrichtlinie_BEG_EM.pdf
- Technische FAQ BEG EM, Version 8.0 (11/2026): https://www.bafa.de/SharedDocs/Downloads/DE/Energie/beg_liste_technische_faq.pdf
- KfW-Merkblatt 458 (ab 24.09.2026): https://www.kfw.de/PDF/Download-Center/F%C3%B6rderprogramme-(Inlandsf%C3%B6rderung)/PDF-Dokumente/6000005131_M_458.pdf
- KfW-Pressemitteilung 08.07.2026: https://www.kfw.de/%C3%9Cber-die-KfW/Newsroom/Aktuelles/Pressemitteilungen-Details_900928.html

## Offen / unsicher – bei Änderungen nachziehen

- **Genaues Datum „Quartal 1 2027“** ist nicht veröffentlicht; der Rechner nimmt den 01.01.2027 an und kennzeichnet es als „voraussichtlich“. Wertschöpfungs-Bonus (EU-Herkunft) ist noch nicht eingerechnet.
- **§ 35c EStG** (Steuerermäßigung) für Luft-Luft-Geräte nicht belegt → im Rechner bewusst nicht enthalten.
- **§ 35a EStG** (20 % der Arbeitskosten, max. 1.200 €/Jahr) nur als Hinweis „mit Steuerberater klären“.
- Gewerbe: Kälte-Klima-Richtlinie schließt Split/Multisplit aus; EEW/KfW 295 für Komfortklima nicht geprüft. Rechner zeigt dort nur „prüfen“.
- Keine belegte Landes-/Kommunalförderung Baden-Württemberg/Heilbronn gefunden.
- Konkrete Geräte gegen die BAFA-Liste prüfen (für den späteren Angebotsassistenten).
