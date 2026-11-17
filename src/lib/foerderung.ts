// Förderregeln für Klimaanlagen (Luft-Luft-Wärmepumpen) – reine Logik, keine Oberfläche.
// Wird vom Förderrechner genutzt und soll später vom Angebotsassistenten wiederverwendet werden
// (Kunden-Checkliste, Angaben für die BzA). Quellen und offene Punkte: docs/FOERDERUNG-KLIMAANLAGE.md
//
// Grundlage: Förderrichtlinie BEG EM (in Kraft seit 21.07.2026), KfW-Merkblatt 458 (ab 24.09.2026),
// BAFA/KfW Technische FAQ BEG EM Version 8.0 (11/2026), Nr. 8.21/8.22.

export const REGELSTAND = "November 2026";

export type Nutzung = "wohnen" | "gewerbe";
export type Heizen = "hauptheizung" | "ergaenzung" | "wenig" | "nein";
export type Rolle = "selbstnutzer" | "vermieter" | "mieter";
export type AlteHeizung =
  | "oel"
  | "gas-etage"
  | "nachtspeicher"
  | "gas-alt" // Gas- oder Biomasseheizung, Inbetriebnahme mindestens 20 Jahre her
  | "gas-neu" // Gasheizung jünger als 20 Jahre
  | "erneuerbar-neu" // Wärmepumpe, Pellets, Solar o. Ä., in Betrieb seit 2008 oder später
  | "sonstige";
export type Einkommen = "bis30" | "bis40" | "bis50" | "ueber50" | "keineAngabe";

export type Eingaben = {
  nutzung: Nutzung;
  heizen: Heizen;
  bestandsgebaeude: boolean; // Bauantrag mindestens 5 Jahre alt
  auftragErteilt: boolean; // Vertrag ohne Förder-Vorbehalt unterschrieben oder Arbeiten begonnen
  rolle: Rolle;
  alteHeizung: AlteHeizung;
  alteHeizungRaus: boolean; // alte Heizung wird ausgebaut, Wohnung danach ohne fossile Heizung
  wohnungenGebaeude: number;
  wohnungenBetroffen: number;
  einkommen: Einkommen;
  kindImHaushalt: boolean;
  kosten: number; // brutto in Euro
};

export type Baustein = { name: string; prozent: number; hinweis?: string };

export type Ergebnis = {
  status: "foerderfaehig" | "pruefen" | "nicht";
  programm: string | null;
  bausteine: Baustein[];
  satz: number; // Prozent nach Deckelung (bezogen auf die förderfähigen Kosten)
  deckel: number | null;
  foerderfaehigeKosten: number;
  zuschuss: number;
  gruende: string[]; // warum nicht oder was noch zu prüfen ist
  voraussetzungen: string[]; // was erfüllt sein muss
  unterlagen: string[]; // für Checkliste / BzA
  hinweise: string[];
  alternativen: string[];
};

// ---------- Staffeln nach Datum (Antragstellung) ----------

const Q1_2027 = new Date("2027-01-01T00:00:00"); // „ab Quartal 1 2027“ – genaues Datum noch nicht veröffentlicht

function grundsatzWaermepumpe(stichtag: Date) {
  return stichtag < Q1_2027 ? 30 : 15;
}

const KLIMA_BONUS: [string, number][] = [
  ["2027-02-01", 16],
  ["2027-08-01", 12],
  ["2028-02-01", 8],
  ["2028-08-01", 4],
];
function klimageschwindigkeitsBonus(stichtag: Date) {
  for (const [bis, satz] of KLIMA_BONUS) if (stichtag < new Date(`${bis}T00:00:00`)) return satz;
  return 0;
}

// Höchstgrenze förderfähiger Ausgaben für die erste Wohneinheit: ab 01.02.2027 alle sechs Monate −750 €
function grenzeErsteWohnung(stichtag: Date) {
  const start = new Date("2027-02-01T00:00:00");
  if (stichtag < start) return 28000;
  const monate = (stichtag.getFullYear() - 2027) * 12 + stichtag.getMonth() - 1;
  const stufen = Math.floor(monate / 6) + 1;
  return Math.max(22000, 28000 - stufen * 750);
}

function grenzeGebaeude(wohnungen: number, stichtag: Date) {
  const n = Math.max(1, Math.round(wohnungen));
  return grenzeErsteWohnung(stichtag) + Math.min(n - 1, 5) * 15000 + Math.max(n - 6, 0) * 8000;
}

function einkommensBonus(einkommen: Einkommen, kind: boolean) {
  // Familienzuschlag: Einkommen pauschal −10.000 € → eine Stufe günstiger
  const stufen: Einkommen[] = ["bis30", "bis40", "bis50", "ueber50"];
  if (einkommen === "keineAngabe") return 0;
  let i = stufen.indexOf(einkommen);
  if (kind && i > 0) i -= 1;
  return [40, 30, 10, 0][i];
}

const euro = (n: number) => Math.round(n);

// ---------- Prüfung ----------

const GERAET = [
  "Effizienz: Kombination aus Außen- und Innengerät mindestens A++ (ηs ≥ 181 %, bis 12 kW)",
  "Außengerät steht in der Liste förderfähiger Wärmepumpen des BAFA",
  "Netzdienliche Schnittstelle (steuerbar nach § 14a EnWG) und Bestellung eines intelligenten Messsystems",
  "Heizlastberechnung und Einstellung der Luftmengen durch den Fachbetrieb",
];

export function pruefeFoerderung(e: Eingaben, stichtag = new Date()): Ergebnis {
  const leer: Ergebnis = {
    status: "nicht",
    programm: null,
    bausteine: [],
    satz: 0,
    deckel: null,
    foerderfaehigeKosten: 0,
    zuschuss: 0,
    gruende: [],
    voraussetzungen: [],
    unterlagen: [],
    hinweise: [],
    alternativen: [],
  };
  const ab2027 = stichtag >= Q1_2027;

  if (e.auftragErteilt) {
    return {
      ...leer,
      gruende: [
        "Die Förderung muss vor Beginn des Vorhabens beantragt werden. Ein Auftrag ohne Förder-Vorbehalt oder begonnene Arbeiten schließen den Zuschuss aus.",
      ],
      alternativen: steuerAlternative(e),
    };
  }

  // ----- Gewerbe / Nichtwohngebäude (BAFA) -----
  if (e.nutzung === "gewerbe") {
    const heizt = e.heizen === "hauptheizung" || e.heizen === "ergaenzung";
    const satz = heizt ? grundsatzWaermepumpe(stichtag) : 15;
    const zuschuss = euro((e.kosten * satz) / 100);
    return {
      ...leer,
      status: "pruefen",
      programm: "BAFA – Bundesförderung für effiziente Gebäude, Einzelmaßnahmen (Nichtwohngebäude)",
      bausteine: [
        heizt
          ? { name: "Anlage zur Wärmeerzeugung (Wärmepumpe)", prozent: satz }
          : { name: "Kältetechnik zur Raumkühlung", prozent: 15 },
      ],
      satz,
      foerderfaehigeKosten: euro(e.kosten),
      zuschuss,
      gruende: [
        "Bei Nichtwohngebäuden muss ein Energieeffizienz-Experte eingebunden werden; die Obergrenze richtet sich nach der Fläche.",
      ],
      voraussetzungen: heizt
        ? [...GERAET, "Mindestens 65 % erneuerbare Wärme im beheizten Bereich (bei Ergänzung: Wärmepumpe deckt mindestens 30 % der Heizlast)"]
        : [
            "Kältegerät mit Leistungsregelung, bis 12 kW mit ηs,c ≥ 241 % (über 12 kW: 210 %)",
            "Natürliche Kältemittel werden empfohlen, ab 2030 Pflicht",
          ],
      unterlagen: ["Angebot mit Gerätedaten", "Bestätigung durch Energieeffizienz-Experten", "Angaben zum Unternehmen (Größe, Rechtsform)"],
      hinweise: [
        "Split- und Multisplit-Geräte sind in der Kälte-Klima-Richtlinie ausgeschlossen; gefördert wird über die Gebäudeförderung (BEG).",
        ...(heizt && ab2027 ? ["Seit Anfang 2027 beträgt die Grundförderung für Wärmepumpen 15 % (zzgl. 15 % bei Herkunft aus der EU, Details noch offen)."] : []),
      ],
    };
  }

  // ----- Wohngebäude (KfW 458 bzw. BEG EM) -----
  if (e.heizen === "nein") {
    return {
      ...leer,
      gruende: [
        "Klimaanlagen, die nur kühlen, werden in Wohngebäuden nicht gefördert. Gefördert wird die Klimaanlage als Heizung (Luft-Luft-Wärmepumpe).",
      ],
      alternativen: steuerAlternative(e),
    };
  }
  if (e.heizen === "wenig") {
    return {
      ...leer,
      gruende: [
        "Die Klimaanlage muss einen wesentlichen Teil der Heizung übernehmen (mindestens 65 % erneuerbare Wärme im versorgten Bereich bzw. mindestens 30 % der Heizlast neben der alten Heizung). Nur gelegentliches Heizen in der Übergangszeit reicht nicht.",
      ],
      alternativen: steuerAlternative(e),
    };
  }
  if (!e.bestandsgebaeude) {
    return {
      ...leer,
      gruende: ["Gefördert werden nur Bestandsgebäude, deren Bauantrag mindestens fünf Jahre zurückliegt."],
      alternativen: steuerAlternative(e),
    };
  }
  if (ab2027 && e.alteHeizung === "erneuerbar-neu") {
    return {
      ...leer,
      gruende: [
        "Seit Anfang 2027 wird keine neue Heizung gefördert, wenn das Gebäude schon mit einer Wärmepumpe, Pellet- oder Solarheizung versorgt wird, die seit 2008 in Betrieb ist.",
      ],
      alternativen: steuerAlternative(e),
    };
  }

  const bausteine: Baustein[] = [];
  const grund = grundsatzWaermepumpe(stichtag);
  bausteine.push({ name: "Grundförderung Heizungstausch (Wärmepumpe)", prozent: grund });

  const selbst = e.rolle === "selbstnutzer";
  const bonusHeizung =
    ["oel", "gas-etage", "nachtspeicher", "gas-alt"].includes(e.alteHeizung) && e.alteHeizungRaus;
  const kgb = selbst && bonusHeizung ? klimageschwindigkeitsBonus(stichtag) : 0;
  const ekb = selbst ? einkommensBonus(e.einkommen, e.kindImHaushalt) : 0;

  // Boni gelten nur für die selbstgenutzte Wohnung → bei mehreren betroffenen Wohnungen anteilig
  const betroffen = Math.max(1, Math.min(e.wohnungenBetroffen, e.wohnungenGebaeude));
  const anteilSelbst = selbst ? 1 / betroffen : 0;
  if (kgb) bausteine.push({ name: "Klimageschwindigkeits-Bonus", prozent: kgb, hinweis: anteilSelbst < 1 ? "nur für die selbstgenutzte Wohnung" : undefined });
  if (ekb) bausteine.push({ name: "Einkommens-Bonus", prozent: ekb, hinweis: anteilSelbst < 1 ? "nur für die selbstgenutzte Wohnung" : undefined });

  const deckel = selbst && ekb === 40 ? 80 : 70;
  const gesamt = Math.min(grund + kgb + ekb, deckel);
  const satzSelbst = gesamt;
  const satzRest = grund;
  const satz = anteilSelbst * satzSelbst + (1 - anteilSelbst) * satzRest;

  const grenze = (grenzeGebaeude(e.wohnungenGebaeude, stichtag) * betroffen) / Math.max(1, e.wohnungenGebaeude);
  const foerderfaehig = Math.min(Math.max(e.kosten, 0), grenze);
  const zuschuss = foerderfaehig >= 300 ? euro((foerderfaehig * satz) / 100) : 0;

  const gruende: string[] = [];
  if (e.heizen === "ergaenzung")
    gruende.push(
      "Bleibt die alte Heizung, muss die Klimaanlage mindestens 30 % der Heizlast des versorgten Bereichs decken. Das ermitteln wir mit der Heizlastberechnung."
    );
  if (selbst && e.einkommen === "keineAngabe")
    gruende.push("Ohne Angabe zum Einkommen ist der Einkommens-Bonus nicht eingerechnet (bis zu 40 % zusätzlich möglich).");
  if (selbst && ["oel", "gas-etage", "nachtspeicher", "gas-alt"].includes(e.alteHeizung) && !e.alteHeizungRaus)
    gruende.push(
      `Wird die alte Heizung ausgebaut und die Wohnung danach nicht mehr fossil beheizt, kommt der Klimageschwindigkeits-Bonus von ${klimageschwindigkeitsBonus(stichtag)} % hinzu.`
    );

  const hinweise: string[] = [];
  if (!selbst)
    hinweise.push("Klimageschwindigkeits- und Einkommens-Bonus erhalten nur Eigentümer, die selbst in der Wohnung wohnen.");
  if (e.rolle === "mieter")
    hinweise.push("Als Mieter können Sie den Antrag stellen, wenn der Eigentümer vorher informiert ist und seine Pflichten bestätigt.");
  if (e.kosten > grenze)
    hinweise.push(`Förderfähig sind höchstens ${grenze.toLocaleString("de-DE", { maximumFractionDigits: 0 })} € (Obergrenze für die betroffenen Wohnungen).`);
  if (ab2027)
    hinweise.push("Seit Anfang 2027 beträgt die Grundförderung für Wärmepumpen 15 %. Bei Herkunft aus der EU kommen 15 % hinzu – die Einzelheiten sind noch nicht veröffentlicht.");
  else
    hinweise.push("Ab Anfang 2027 sinkt die Grundförderung für Wärmepumpen voraussichtlich auf 15 % (zzgl. 15 % bei Herkunft aus der EU). Ein Antrag noch 2026 sichert die 30 %.");
  hinweise.push("Ab 2028 werden nur noch Wärmepumpen mit natürlichem Kältemittel (z. B. R290) gefördert.");

  const unterlagen = [
    "Bestätigung zum Antrag (BzA) – erstellen wir als Fachbetrieb",
    "Auftrag/Vertrag mit Förder-Vorbehalt (aufschiebende oder auflösende Bedingung) und geplantem Umsetzungsdatum",
    "Antrag im Kundenportal „Meine KfW“ vor Beginn der Arbeiten",
    "Nach der Montage: Bestätigung nach Durchführung, Rechnungen (unbar bezahlt), Nachweis der Luftmengen",
  ];
  if (ekb) unterlagen.push("Für den Einkommens-Bonus: Steuerbescheide des zweiten und dritten Jahres vor Antragstellung");
  if (selbst && (kgb || ekb)) unterlagen.push("Meldebescheinigung bzw. Grundbuchauszug (Nachweis Selbstnutzung und Eigentum)");
  if (kgb) unterlagen.push("Nachweis über Ausbau und Entsorgung der alten Heizung");

  return {
    status: gruende.some((g) => g.startsWith("Bleibt")) ? "pruefen" : "foerderfaehig",
    programm: "KfW 458 – Heizungsförderung (Zuschuss)",
    bausteine,
    satz: Math.round(satz * 10) / 10,
    deckel,
    foerderfaehigeKosten: euro(foerderfaehig),
    zuschuss,
    gruende,
    voraussetzungen: [
      ...GERAET,
      "Mindestens 65 % erneuerbare Wärme im versorgten Bereich",
      "Keine gebrauchten Geräte, Mindestinvestition 300 €",
    ],
    unterlagen,
    hinweise,
    alternativen: ["Ergänzend möglich: zinsgünstiger KfW-Ergänzungskredit (358/359) für die restlichen Kosten."],
  };
}

function steuerAlternative(e: Eingaben): string[] {
  // § 35a gilt nur im eigenen Haushalt (Eigentümer oder Mieter), nicht für Vermieter
  if (e.nutzung === "gewerbe" || e.rolle === "vermieter") return [];
  return [
    "Steuer: 20 % der Arbeitskosten (Montage, nicht Gerät) können als Handwerkerleistung abgesetzt werden, höchstens 1.200 € im Jahr – sofern keine Förderung für dieselbe Maßnahme fließt. Bitte mit dem Steuerberater klären.",
  ];
}
