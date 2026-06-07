import GuideItem from "@/components/ui/guide/GuidItem";
import { GUIDE_LIST } from "@/constants/guide";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GuideScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 18 }]}>
        <Text style={styles.title}>{t("guide.title")}</Text>
      </View>
      <View style={styles.subtitleSection}>
        <Text style={styles.subtitle}>
          {t("guide.subtitle")}
        </Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: 14,
          paddingRight: 16,
          paddingLeft: 16,
          paddingBottom: tabBarHeight + 28,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.list}>
          {GUIDE_LIST.map((item) => (
            <GuideItem item={item} key={item.id} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  subtitleSection: {
    backgroundColor: "#F2F5F9",
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#6B7280",
  },
  scrollView: {
    flex: 1,
  },
  list: {
    gap: 16,
  },
});
