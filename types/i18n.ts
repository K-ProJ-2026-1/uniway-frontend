export type LanguageCode = "ko" | "en" | "zh";

export interface LocalizedText {
  ko: string;
  en: string;
  zh: string;
}

export interface LocalizedTextList {
  ko: string[];
  en: string[];
  zh: string[];
}
