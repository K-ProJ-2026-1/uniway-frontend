import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageCode } from "@/types/i18n";

const IMAGE_MAP = {
  back: require("@/assets/images/back.png"),
  search: require("@/assets/images/search.png"),
};

const LANGUAGES: Array<{
  id: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}> = [
  { id: "ko", name: "Korean", nativeName: "한국어", flag: "KR" },
  { id: "en", name: "English", nativeName: "English", flag: "EN" },
  { id: "zh", name: "Chinese", nativeName: "中文", flag: "ZH" },
];

export default function LanguageScreen() {
  const insets = useSafeAreaInsets();
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(language);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const filteredLanguages = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    if (!keyword) {
      return LANGUAGES;
    }

    return LANGUAGES.filter((item) => {
      return (
        item.name.toLowerCase().includes(keyword) ||
        item.nativeName.toLowerCase().includes(keyword) ||
        item.id.includes(keyword)
      );
    });
  }, [searchQuery]);

  const handleApply = () => {
    setLanguage(selectedLanguage);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-white">
        <View
          className="w-full flex-row items-center px-6 pb-4"
          style={{ paddingTop: insets.top + 12 }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-9 w-9 items-center justify-center rounded-2xl bg-gray-100"
          >
            <Image
              source={IMAGE_MAP.back}
              className="h-5 w-5"
              style={{ tintColor: "#111827" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View className="px-5 py-3">
          <View className="self-start rounded-2xl bg-stone-200 px-5 py-3">
            <Text className="text-base font-normal text-black">{t("language.title")}</Text>
          </View>
        </View>

        <View className="my-4 px-5">
          <View className="h-14 w-full flex-row items-center justify-between rounded-2xl bg-zinc-100 px-5">
            <TextInput
              className="h-full flex-1 text-base text-black"
              placeholder={t("language.search")}
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Image
              source={IMAGE_MAP.search}
              className="h-5 w-5"
              style={{ tintColor: "#9CA3AF" }}
              resizeMode="contain"
            />
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 110 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {filteredLanguages.map((item) => {
            const isSelected = selectedLanguage === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedLanguage(item.id)}
                className={`h-14 w-full flex-row items-center justify-between border-b border-gray-50 px-5 ${
                  isSelected ? "bg-green-50" : "bg-zinc-50/50"
                }`}
              >
                <View className="flex-row items-center gap-6">
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-zinc-200">
                    <Text className="text-xs font-bold text-zinc-700">{item.flag}</Text>
                  </View>
                  <View className="flex-row items-baseline gap-2">
                    <Text className="text-base font-medium text-black">{item.name}</Text>
                    <Text className="text-sm font-medium text-gray-400">
                      {item.nativeName}
                    </Text>
                  </View>
                </View>

                {isSelected && (
                  <View className="h-5 w-5 items-center justify-center">
                    <View className="-mt-1 h-2.5 w-3.5 -rotate-45 border-b-2 border-l-2 border-green-600" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {filteredLanguages.length === 0 && (
            <View className="px-5 py-10">
              <Text className="text-center text-sm text-gray-400">
                {t("language.empty")}
              </Text>
            </View>
          )}
        </ScrollView>

        <View
          className="absolute left-0 right-0 bg-white px-5 pt-2"
          style={{ bottom: Math.max(insets.bottom, 16) }}
        >
          <TouchableOpacity
            onPress={handleApply}
            className="h-12 w-full items-center justify-center rounded-2xl bg-green-600 shadow-sm"
          >
            <Text className="text-center text-base font-medium text-white">
              {t("language.confirm")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
