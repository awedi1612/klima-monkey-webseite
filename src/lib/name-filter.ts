// Minimal denylist-based filter for publicly visible leaderboard names.
// Not exhaustive by design - it only needs to catch the obvious cases.
const BLOCKED_WORDS = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "nigger",
  "faggot",
  "cunt",
  "hurensohn",
  "hure",
  "fotze",
  "wichser",
  "arschloch",
  "schlampe",
  "nazi",
  "hitler",
];

function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/@/g, "a")
    .replace(/\$/g, "s")
    .replace(/[^a-z0-9]/g, "");
}

export function isNameAllowed(name: string): boolean {
  const normalized = normalize(name);
  if (!normalized) return false;
  return !BLOCKED_WORDS.some((word) => normalized.includes(word));
}
