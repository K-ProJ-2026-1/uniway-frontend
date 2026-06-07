import { GuideType } from "@/types/guide/guideType";
import { LocalizedText, LocalizedTextList } from "@/types/i18n";

export type PlaceFilter = "전체" | "강의동" | "도서관" | "식당" | "기숙사";

export type PlaceCategory = Exclude<PlaceFilter, "전체">;

export interface CampusPlace {
  id: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  latitude: number;
  longitude: number;
  category: PlaceCategory;
  location: LocalizedText;
  hours: LocalizedText;
  description: LocalizedText;
  tags: LocalizedTextList;
  usageMethods: LocalizedTextList;
  notices: LocalizedTextList;
  relatedGuideTypes: GuideType[];
}
