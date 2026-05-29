import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
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

// 샘플 데이터 구조
const LANGUAGES = [
  { id: "zh", name: "중국어", nativeName: "中文", flag: "🇨🇳" },
  { id: "en", name: "영어", nativeName: "English", flag: "🇺🇸" },
  { id: "ko", name: "한국어", nativeName: "한국어", flag: "🇰🇷" },
];

export default function LanguageScreen() {
  // 선택된 언어 상태 관리 (기본값: 한국어)
  const [selectedLanguage, setSelectedLanguage] = useState("ko");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View className="flex-1 bg-white relative">
      {/* 상단 헤더 영역 */}
      <View className="w-full pt-12 pb-4 px-6 flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
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

      {/* 대타이틀 */}
      <View className="px-5 py-3">
        <View className="bg-stone-200 rounded-2xl px-5 py-3 self-start">
          <Text className="text-black text-base font-normal">언어 선택</Text>
        </View>
      </View>

      {/* 검색 바 */}
      <View className="px-5 my-4">
        <View className="w-full h-14 px-5 bg-zinc-100 rounded-2xl flex-row items-center justify-between">
          <TextInput
            className="flex-1 h-full text-base text-black"
            placeholder="언어 검색"
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {/* 돋보기 아이콘 대체용 내부 원/라인 디자인 */}
          <Image
            source={IMAGE_MAP.search}
            className="w-5 h-5"
            style={{ tintColor: "#9CA3AF" }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* 언어 리스트 스크롤 영역 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((lang) => {
          const isSelected = selectedLanguage === lang.id;
          return (
            <TouchableOpacity
              key={lang.id}
              onPress={() => setSelectedLanguage(lang.id)}
              className={`w-full h-14 px-5 flex-row items-center justify-between border-b border-gray-50 ${
                isSelected ? "bg-green-50" : "bg-zinc-50/50"
              }`}
            >
              <View className="flex-row items-center gap-6">
                {/* 국기 아이콘 배경 */}
                <View className="w-9 h-9 bg-zinc-200 rounded-full items-center justify-center">
                  <Text className="text-xl">{lang.flag}</Text>
                </View>
                {/* 언어 텍스트 */}
                <View className="flex-row items-baseline gap-2">
                  <Text className="text-black text-base font-medium">
                    {lang.name}
                  </Text>
                  <Text className="text-gray-400 text-sm font-medium">
                    {lang.nativeName}
                  </Text>
                </View>
              </View>

              {/* 선택되었을 때의 체크 표시 디자인 */}
              {isSelected && (
                <View className="w-5 h-5 items-center justify-center">
                  <View className="w-3.5 h-2.5 border-b-2 border-l-2 border-green-600 transform -rotate-45 -mt-1" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 하단 고정 확인 버튼 영역 */}
      <View className="absolute bottom-6 left-0 right-0 px-5 bg-white pt-2">
        <TouchableOpacity className="w-full h-12 bg-green-600 rounded-2xl items-center justify-center shadow-sm">
          <Text className="text-white text-base font-medium text-center">
            확인
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
