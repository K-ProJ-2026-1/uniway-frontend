import { useLanguage } from "@/contexts/LanguageContext";
import { localizeText } from "@/constants/translations";
import { GuideAccordionItemType, GuideListType } from "@/types/guide/guideType";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const IMAGE_MAP = {
  CAFETERIA: require("@/assets/images/cafeteria.png"),
  LIBRARY: require("@/assets/images/library.png"),
  DORMITORY: require("@/assets/images/dormitory.png"),
  HEALTH: require("@/assets/images/health.png"),
  TRANSPORT: require("@/assets/images/transport.png"),
  DOCUMENT: require("@/assets/images/document.png"),
};

function GuideAccordion({ section }: { section: GuideAccordionItemType }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { language } = useLanguage();

  return (
    <View style={styles.accordionSection}>
      <Pressable
        style={styles.accordionTrigger}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <Text style={styles.accordionTitle}>
          {localizeText(section.title, language)}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={18}
          color="#98A2B3"
        />
      </Pressable>
      {isOpen && (
        <View style={styles.accordionContentWrap}>
          <Text style={styles.accordionContent}>
            {localizeText(section.content, language)}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function GuideItem({ item }: { item: GuideListType }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { language } = useLanguage();

  return (
    <View style={styles.card}>
      <Pressable
        style={styles.cardButton}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <View style={styles.cardContent}>
          <Image source={IMAGE_MAP[item.type]} style={styles.cardImage} />
          <View style={styles.textWrap}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {localizeText(item.title, language)}
            </Text>
            <Text style={styles.cardDescription}>
              {localizeText(item.description, language)}
            </Text>
          </View>
        </View>
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward"}
          size={24}
          color="#A8B2C1"
        />
      </Pressable>
      {isOpen && (
        <View style={styles.accordionList}>
          {item.sections.map((section) => (
            <GuideAccordion key={section.id} section={section} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingRight: 10,
  },
  cardImage: {
    width: 62,
    height: 62,
    borderRadius: 20,
  },
  textWrap: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
  },
  cardDescription: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    color: "#98A2B3",
  },
  accordionList: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#EEF2F6",
    paddingTop: 2,
  },
  accordionSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  accordionTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 14,
  },
  accordionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 20,
  },
  accordionContentWrap: {
    paddingRight: 4,
    paddingBottom: 14,
  },
  accordionContent: {
    fontSize: 13,
    lineHeight: 20,
    color: "#6B7280",
  },
});
