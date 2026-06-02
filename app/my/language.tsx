import { router } from "expo-router";
import { useMemo, useState } from "react";
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

const IMAGE_MAP = {
  back: require("@/assets/images/back.png"),
  search: require("@/assets/images/search.png"),
};

const LANGUAGES = [
  { id: "zh", name: "중국어", nativeName: "中文", flag: "🇨🇳" },
  { id: "en", name: "영어", nativeName: "English", flag: "🇺🇸" },
  { id: "ko", name: "한국어", nativeName: "한국어", flag: "🇰🇷" },
];

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("ko");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    if (!keyword) {
      return LANGUAGES;
    }

    return LANGUAGES.filter((language) => {
      return (
        language.name.toLowerCase().includes(keyword) ||
        language.nativeName.toLowerCase().includes(keyword)
      );
    });
  }, [searchQuery]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-white">
        <View className="w-full flex-row items-center px-6 pb-4 pt-12">
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
            <Text className="text-base font-normal text-black">언어 선택</Text>
          </View>
        </View>

        <View className="my-4 px-5">
          <View className="h-14 w-full flex-row items-center justify-between rounded-2xl bg-zinc-100 px-5">
            <TextInput
              className="h-full flex-1 text-base text-black"
              placeholder="언어 검색"
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
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {filteredLanguages.map((language) => {
            const isSelected = selectedLanguage === language.id;

            return (
              <TouchableOpacity
                key={language.id}
                onPress={() => setSelectedLanguage(language.id)}
                className={`h-14 w-full flex-row items-center justify-between border-b border-gray-50 px-5 ${
                  isSelected ? "bg-green-50" : "bg-zinc-50/50"
                }`}
              >
                <View className="flex-row items-center gap-6">
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-zinc-200">
                    <Text className="text-xl">{language.flag}</Text>
                  </View>
                  <View className="flex-row items-baseline gap-2">
                    <Text className="text-base font-medium text-black">{language.name}</Text>
                    <Text className="text-sm font-medium text-gray-400">
                      {language.nativeName}
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
                검색 결과가 없습니다.
              </Text>
            </View>
          )}
        </ScrollView>

        <View className="absolute bottom-6 left-0 right-0 bg-white px-5 pt-2">
          <TouchableOpacity className="h-12 w-full items-center justify-center rounded-2xl bg-green-600 shadow-sm">
            <Text className="text-center text-base font-medium text-white">확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
