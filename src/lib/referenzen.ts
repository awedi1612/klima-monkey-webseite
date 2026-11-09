// Montagefotos aus eigenen Projekten. Bilder: public/images/referenzen (1200 × 1500, 4:5, ohne EXIF).
// Originale liegen außerhalb des Repos in ../referenzen-originale.

export type Referenz = {
  bild: string;
  titel: string;
  text: string;
  alt: string;
  art: "Innengerät" | "Außengerät";
  ort?: string;
  /** Slug der Standortseite, auf der das Foto zusätzlich erscheint */
  standort?: string;
};

export const referenzen: Referenz[] = [
  {
    bild: "/images/referenzen/daikin-innengeraet-schwarz.jpg",
    titel: "Daikin in Schwarz im Wohnzimmer",
    text: "Designgerät in Schwarz, passend zu Kaminofen und Einrichtung.",
    alt: "Schwarzes Daikin-Klimagerät an der Wohnzimmerwand über einem Kaminofen",
    art: "Innengerät",
    ort: "Leingarten",
    standort: "klimaanlage-heilbronn",
  },
  {
    bild: "/images/referenzen/bosch-aussengeraet-fassade.jpg",
    titel: "Außengerät an der Fassade",
    text: "Bosch-Außengerät auf Wandkonsole, die Leitungen laufen verdeckt im Kanal nach oben.",
    alt: "Bosch-Außengerät auf einer Wandkonsole an einer hellen Hausfassade mit Leitungskanal",
    art: "Außengerät",
    ort: "Erlenbach-Binswangen",
    standort: "klimaanlage-neckarsulm",
  },
  {
    bild: "/images/referenzen/bosch-innengeraet-dachgeschoss.jpg",
    titel: "Kühles Dachgeschoss",
    text: "Innengerät über dem Fenster unter der Balkendecke – dort, wo sich im Sommer die Hitze staut.",
    alt: "Weißes Bosch-Innengerät über einem Fenster in einem Dachgeschoss mit Holzbalkendecke",
    art: "Innengerät",
    ort: "Neckarsulm",
    standort: "klimaanlage-neckarsulm",
  },
  {
    bild: "/images/referenzen/bosch-aussengeraet-garten.jpg",
    titel: "Außengerät im Garten",
    text: "Bodennah hinter der Bepflanzung aufgestellt: gut erreichbar für die Wartung und kaum zu sehen.",
    alt: "Bosch-Außengerät im Garten zwischen Sträuchern und Pflanzkübeln",
    art: "Außengerät",
    ort: "Großbottwar",
    standort: "klimaanlage-ludwigsburg",
  },
  {
    bild: "/images/referenzen/bosch-innengeraet-holzdecke.jpg",
    titel: "Wohnraum mit Holzdecke",
    text: "Wandgerät zwischen zwei Fenstern, sauber über dem Bild ausgerichtet.",
    alt: "Bosch-Innengerät zwischen zwei Fenstern mit Vorhängen unter einer Holzdecke",
    art: "Innengerät",
    ort: "Neckarwestheim",
    standort: "klimaanlage-heilbronn",
  },
  {
    bild: "/images/referenzen/bosch-aussengeraet-dachterrasse.jpg",
    titel: "Außengerät auf der Dachterrasse",
    text: "Auf Standfüßen unter der Dachschräge aufgestellt, geschützt vor Regen und direkter Sonne.",
    alt: "Bosch-Außengerät auf Standfüßen auf einer gefliesten Dachterrasse",
    art: "Außengerät",
    ort: "Lauffen am Neckar",
    standort: "klimaanlage-flein",
  },
  {
    bild: "/images/referenzen/bosch-innengeraet-wandmontage.jpg",
    titel: "Wandgerät mit Display",
    text: "Bosch-Innengerät, Leitungen im Kabelkanal an der Wand entlang geführt.",
    alt: "Bosch-Innengerät mit Temperaturanzeige an einer hellen Wand",
    art: "Innengerät",
    ort: "Heilbronn-Sontheim",
    standort: "klimaanlage-heilbronn",
  },
  {
    bild: "/images/referenzen/bosch-aussengeraet-terrasse.jpg",
    titel: "Außengerät unter dem Vordach",
    text: "Bosch-Außengerät auf der Terrasse: vor Regen geschützt und für die Wartung gut erreichbar.",
    alt: "Weißes Bosch-Außengerät auf einer Holzterrasse unter einem Vordach, daneben ein Holzzaun und ein Oleander im Kübel",
    art: "Außengerät",
    ort: "Eppingen",
  },
  {
    bild: "/images/referenzen/daikin-innengeraet-holzlamellen.jpg",
    titel: "Schwarzes Wandgerät auf Holzlamellen",
    text: "Daikin-Innengerät in Mattschwarz an einer Lamellenwand. Das Gerät greift die dunklen Fugen zwischen den Holzleisten auf.",
    alt: "Mattschwarzes Daikin-Klimagerät an einer Wand aus senkrechten Holzlamellen",
    art: "Innengerät",
    ort: "Flein",
    standort: "klimaanlage-flein",
  },
  {
    bild: "/images/referenzen/bosch-aussengeraet-praxis.jpg",
    titel: "Klimaanlage für eine Zahnarztpraxis",
    text: "Außengerät auf Wandkonsole an der Fassade, die Leitung läuft im weißen Kanal nach oben zum Innengerät.",
    alt: "Bosch-Außengerät auf einer Wandkonsole an einer gelben Hausfassade, davor Solarmodule",
    art: "Außengerät",
    ort: "Heilbronn",
    standort: "klimaanlage-heilbronn",
  },
  {
    bild: "/images/referenzen/bosch-innengeraet-klinkerwand.jpg",
    titel: "Wohnzimmer mit Klinkerwand",
    text: "Weißes Wandgerät direkt unter der Holzdecke, ohne sichtbare Leitungen an der Wand.",
    alt: "Weißes Bosch-Innengerät an einer Klinkerwand unter einer Holzdecke, daneben ein Kaminofen",
    art: "Innengerät",
    ort: "Gundelsheim",
    standort: "klimaanlage-neckarsulm",
  },
];
