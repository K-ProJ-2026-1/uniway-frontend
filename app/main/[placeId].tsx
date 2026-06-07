import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GUIDE_LIST } from "@/constants/guide";
import { CAMPUS_PLACES, getCampusPlaceById } from "@/constants/map/places";
import {
  getFilterLabel,
  localizeText,
  localizeTextList,
} from "@/constants/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PlaceDetailScreen() {
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  const insets = useSafeAreaInsets();
  const { language, t } = useLanguage();
  const place = getCampusPlaceById(placeId ?? "") ?? CAMPUS_PLACES[0];
  const relatedGuides = GUIDE_LIST.filter((guide) =>
    place.relatedGuideTypes.includes(guide.type),
  );

  return (
    <View className="flex-1 bg-[#F5F6F7]">
      <View
        className="border-b border-[#ECE8E0] bg-white px-5 pb-4"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full bg-[#F5F1EA]"
          >
            <Ionicons name="chevron-back" size={20} color="#111827" />
          </Pressable>

          <Text className="text-[18px] font-bold text-[#111827]">
            {t("detail.title")}
          </Text>

          <Pressable
            onPress={() => router.replace("/main")}
            className="h-11 w-11 items-center justify-center rounded-full bg-[#F5F1EA]"
          >
            <Ionicons name="home-outline" size={19} color="#111827" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-5">
          <View className="overflow-hidden rounded-[28px] bg-[#E8F4E4] px-5 pb-5 pt-6">
            <View className="absolute right-[-18] top-[-12] h-28 w-28 rounded-full bg-[#CFE9CA]" />
            <View className="absolute bottom-[-22] right-[54] h-20 w-20 rounded-full bg-[#DDF1D8]" />

            <View className="self-start rounded-full bg-white/80 px-3 py-1.5">
              <Text className="text-[12px] font-semibold text-[#4B9E49]">
                {getFilterLabel(place.category, language)}
              </Text>
            </View>

            <Text className="mt-4 text-[30px] font-bold text-[#111827]">
              {localizeText(place.name, language)}
            </Text>
            <Text className="mt-2 text-[15px] leading-6 text-[#4B5563]">
              {localizeText(place.description, language)}
            </Text>

            <View className="mt-5 flex-row gap-3">
              <View className="flex-1 rounded-[18px] bg-white/90 px-4 py-3">
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={14} color="#58AF55" />
                  <Text className="ml-1 text-[12px] font-medium text-[#8B8F97]">
                    {t("main.location")}
                  </Text>
                </View>
                <Text className="mt-2 text-[14px] font-semibold leading-5 text-[#31353D]">
                  {localizeText(place.location, language)}
                </Text>
              </View>

              <View className="flex-1 rounded-[18px] bg-white/90 px-4 py-3">
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#58AF55" />
                  <Text className="ml-1 text-[12px] font-medium text-[#8B8F97]">
                    {t("main.hours")}
                  </Text>
                </View>
                <Text className="mt-2 text-[14px] font-semibold leading-5 text-[#31353D]">
                  {localizeText(place.hours, language)}
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-5 rounded-[26px] bg-white p-5">
            <Text className="text-[18px] font-bold text-[#111827]">
              {t("detail.usage")}
            </Text>
            <View className="mt-4">
              {localizeTextList(place.usageMethods, language).map((item, index) => (
                <View key={item} className={`${index > 0 ? "mt-4" : ""} flex-row`}>
                  <View className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-[#58AF55]" />
                  <Text className="flex-1 text-[14px] leading-6 text-[#4B5563]">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-4 rounded-[26px] bg-white p-5">
            <Text className="text-[18px] font-bold text-[#111827]">
              {t("detail.notice")}
            </Text>
            <View className="mt-4">
              {localizeTextList(place.notices, language).map((item, index) => (
                <View
                  key={item}
                  className={`${index > 0 ? "mt-4" : ""} flex-row rounded-[18px] bg-[#F8F4EC] px-4 py-3`}
                >
                  <Ionicons name="alert-circle-outline" size={16} color="#C07B2F" />
                  <Text className="ml-2 flex-1 text-[14px] leading-6 text-[#6B5D49]">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-4 rounded-[26px] bg-white p-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-[18px] font-bold text-[#111827]">
                {t("detail.relatedGuide")}
              </Text>
              <Pressable onPress={() => router.push("/guide")}>
                <Text className="text-[13px] font-semibold text-[#58AF55]">
                  {t("detail.allGuides")}
                </Text>
              </Pressable>
            </View>

            <View className="mt-4">
              {relatedGuides.map((guide, index) => (
                <View
                  key={guide.id}
                  className={`${index > 0 ? "mt-3" : ""} rounded-[20px] bg-[#F5F7F9] px-4 py-4`}
                >
                  <Text className="text-[15px] font-bold text-[#111827]">
                    {localizeText(guide.title, language)}
                  </Text>
                  <Text className="mt-1 text-[13px] leading-5 text-[#6B7280]">
                    {localizeText(guide.description, language)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-4 rounded-[26px] bg-white p-5">
            <Text className="text-[18px] font-bold text-[#111827]">
              {t("detail.demoPoints")}
            </Text>
            <View className="mt-4 flex-row flex-wrap">
              {localizeTextList(place.tags, language).map((tag) => (
                <View
                  key={tag}
                  className="mb-2 mr-2 rounded-full bg-[#F3EEE7] px-3 py-1.5"
                >
                  <Text className="text-[12px] font-medium text-[#706A64]">#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 border-t border-[#E8E5DE] bg-white px-5 pb-5 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => router.push("/guide")}
            className="h-14 flex-1 items-center justify-center rounded-[18px] bg-[#ECE7DB]"
          >
            <Text className="text-[15px] font-semibold text-[#6F6A63]">
              {t("detail.openGuide")}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/chat")}
            className="h-14 flex-[1.4] flex-row items-center justify-center rounded-[18px] bg-[#58AF55]"
          >
            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#FFFFFF" />
            <Text className="ml-2 text-[15px] font-bold text-white">
              {t("detail.askMentor")}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
