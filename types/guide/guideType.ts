export type GuideType =
  | "CAFETERIA"
  | "LIBRARY"
  | "DORMITORY"
  | "HEALTH"
  | "TRANSPORT"
  | "DOCUMENT";

export interface GuideAccordionItemType {
  id: number;
  title: string;
  content: string;
}

export interface GuideListType {
  id: number;
  type: GuideType;
  title: string;
  description: string;
  sections: GuideAccordionItemType[];
}
