import { LocalizedText } from "@/types/i18n";

export type GuideType =
  | "CAFETERIA"
  | "LIBRARY"
  | "DORMITORY"
  | "HEALTH"
  | "TRANSPORT"
  | "DOCUMENT";

export interface GuideAccordionItemType {
  id: number;
  title: LocalizedText;
  content: LocalizedText;
}

export interface GuideListType {
  id: number;
  type: GuideType;
  title: LocalizedText;
  description: LocalizedText;
  sections: GuideAccordionItemType[];
}
