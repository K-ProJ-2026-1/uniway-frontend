import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const IMAGE_MAP = {
  back: require("@/assets/images/back.png"),
  camera: require("@/assets/images/camera.png"),
  logout: require("@/assets/images/logout.png"),
  settings: require("@/assets/images/setting.png"),
  language: require("@/assets/images/language.png"),
  next: require("@/assets/images/next.png"),
};

export default function MyScreen() {
  return (
    <View className="flex-1 bg-gray-50 relative">
      {/* 메인 스크롤 콘텐츠 */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 상단 헤더 영역 */}
        <View className="w-full h-56 bg-[#D1E1CD] rounded-b-[32px] px-5  flex-row items-center justify-between">
          {/* 뒤로가기 버튼 공간 */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-9 w-9 bg-white/20 rounded-2xl items-center justify-center"
          >
            <Image
              source={IMAGE_MAP.back}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* 우측 밸런스용 공백 (왼쪽 버튼과 대칭을 맞추기 위함) */}
          <View className="w-9" />
        </View>

        {/* 프로필 카드 영역 */}
        <View className="px-5 -mt-20">
          <View className="w-full bg-white rounded-3xl p-6 shadow-md items-center">
            {/* 아바타 */}
            <View className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-green-600 to-lime-100 relative">
              <View className="w-full h-full bg-green-200 rounded-full items-center justify-center">
                <Text className="text-green-600 text-3xl">박</Text>
              </View>
              {/* 카메라/수정 아이콘 내부 원 */}
              <View className="w-7 h-7 bg-green-600 rounded-full absolute right-0 bottom-0 items-center justify-center shadow-sm">
                <Image
                  source={IMAGE_MAP.camera}
                  className="w-3.5 h-3.5"
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* 이름 및 학과 */}
            <Text className="text-black text-lg font-normal mt-4">박예원</Text>
            <Text className="text-neutral-400 text-xs font-normal mt-1">
              소프트웨어학과 22학번
            </Text>

            {/* 구분선 및 카운터 정보 */}
            <View className="w-full flex-row mt-6 border-t border-gray-100 pt-4">
              <View className="flex-1 items-center border-r border-gray-100">
                <Text className="text-green-600 text-lg font-normal">1</Text>
                <Text className="text-neutral-400 text-xs font-normal mt-1">
                  멘토링
                </Text>
              </View>
              <View className="flex-1 items-center border-r border-gray-100">
                <Text className="text-green-600 text-lg font-normal">5</Text>
                <Text className="text-neutral-400 text-xs font-normal mt-1">
                  북마크
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-green-600 text-lg font-normal">32</Text>
                <Text className="text-neutral-400 text-xs font-normal mt-1">
                  활동일
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 설정 섹션 */}
        <View className="px-5 mt-6">
          <Text className="text-neutral-400 text-xs font-normal pl-1 mb-2">
            설정
          </Text>
          <View className="bg-white rounded-3xl shadow-sm overflow-hidden">
            {/* 언어 설정 */}
            <TouchableOpacity
              onPress={() => router.push("/my/language")}
              className="flex-row items-center px-5 py-4 border-b border-gray-100"
            >
              <Image
                source={IMAGE_MAP.language}
                className="w-8 h-8 mr-4"
                resizeMode="contain"
              />
              <View className="flex-1">
                <Text className="text-black text-sm font-medium">
                  언어 설정
                </Text>
                <Text className="text-zinc-400 text-xs font-medium">
                  Language
                </Text>
              </View>
              <Image
                source={IMAGE_MAP.next}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* 일반 설정 */}
            <TouchableOpacity className="flex-row items-center px-5 py-4">
              <Image
                source={IMAGE_MAP.settings}
                className="w-8 h-8 mr-4"
                resizeMode="contain"
              />
              <View className="flex-1">
                <Text className="text-black text-sm font-medium">설정</Text>
                <Text className="text-zinc-400 text-xs font-medium">
                  Settings
                </Text>
              </View>
              <Image
                source={IMAGE_MAP.next}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 앱 정보 섹션 */}
        <View className="px-5 mt-6">
          <Text className="text-neutral-400 text-xs font-normal pl-1 mb-2">
            앱 정보
          </Text>
          <View className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-100">
              <Text className="text-black text-sm font-normal">버전</Text>
              <Text className="text-neutral-400 text-sm font-normal">
                1.0.0
              </Text>
            </View>
            <View className="flex-row justify-between items-center px-5 py-4">
              <Text className="text-black text-sm font-normal">
                최종 업데이트
              </Text>
              <Text className="text-neutral-400 text-sm font-normal">
                2026.04.18
              </Text>
            </View>
          </View>
        </View>

        {/* 로그아웃 버튼 */}
        <View className="px-5 mt-6">
          <TouchableOpacity className="w-full bg-white rounded-3xl p-4 flex-row items-center shadow-sm">
            <Image
              source={IMAGE_MAP.logout}
              className="w-8 h-8 mr-4"
              resizeMode="contain"
            />
            <Text className="flex-1 text-red-400 text-sm font-medium">
              로그아웃
            </Text>
            <Image
              source={IMAGE_MAP.next}
              className="w-5 h-5 "
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
