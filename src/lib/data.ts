import fs from "node:fs";
import yaml from "js-yaml";

export interface Author {
  name: string;
  me?: boolean;
  speaker?: boolean;
}

export interface Publication {
  title: { en: string; ja: string };
  authors: Author[];
  year: number;
  type:
    | "preprint"
    | "journal"
    | "non_refereed"
    | "proceedings"
    | "review"
    | "press_release";
  refereed: boolean;
  language: "eng" | "jpn";
  international_coauthor: boolean;
  corresponding_author: boolean;
  journal: string;
  volume: string;
  pages: string;
  doi: string;
  arxiv: string;
  links: Record<string, string>;
  note?: string;
}

export interface Talk {
  title: { en: string; ja: string };
  authors: Author[];
  event: string;
  venue: string;
  date: string;
  year: number;
  type: "oral" | "invited_oral" | "poster" | "other";
  invited: boolean;
  international: boolean;
  language: "eng" | "jpn";
  country: string;
  links: Record<string, string>;
}

export function loadPublications(): Publication[] {
  const raw = fs.readFileSync("data/publications.yaml", "utf-8");
  return yaml.load(raw) as Publication[];
}

export function loadTalks(): Talk[] {
  const raw = fs.readFileSync("data/talks.yaml", "utf-8");
  return yaml.load(raw) as Talk[];
}

const TYPE_LABEL_JA: Record<string, string> = {
  preprint: "Preprint",
  journal: "査読付き論文",
  non_refereed: "査読なし論文",
  proceedings: "Proceedings",
  review: "解説記事",
  press_release: "プレスリリース",
};

const TYPE_LABEL_EN: Record<string, string> = {
  preprint: "Preprint",
  journal: "Refereed Papers",
  non_refereed: "Non-refereed Papers",
  proceedings: "Proceedings",
  review: "Review Articles",
  press_release: "Press Releases",
};

const TALK_TYPE_LABEL_JA: Record<string, string> = {
  oral: "口頭発表",
  invited_oral: "招待講演",
  poster: "ポスター発表",
  other: "その他（セミナー・アウトリーチ）",
};

const TALK_TYPE_LABEL_EN: Record<string, string> = {
  oral: "Oral Presentations",
  invited_oral: "Invited Talks",
  poster: "Poster Presentations",
  other: "Others (Seminars / Outreach)",
};

export function getPublicationTypeLabel(
  type: string,
  lang: "ja" | "en",
): string {
  return lang === "ja"
    ? TYPE_LABEL_JA[type] || type
    : TYPE_LABEL_EN[type] || type;
}

export function getTalkTypeLabel(type: string, lang: "ja" | "en"): string {
  return lang === "ja"
    ? TALK_TYPE_LABEL_JA[type] || type
    : TALK_TYPE_LABEL_EN[type] || type;
}

export function groupBy<T>(items: T[], key: (item: T) => string) {
  const groups: Record<string, T[]> = {};
  for (const item of items) {
    const k = key(item);
    if (!groups[k]) groups[k] = [];
    groups[k].push(item);
  }
  return groups;
}
