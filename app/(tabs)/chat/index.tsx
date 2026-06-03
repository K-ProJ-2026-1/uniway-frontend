import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const IMAGE_MAP = {
  match: require("@/assets/images/match.png"),
  more: require("@/assets/images/more.png"),
  profile: require("@/assets/images/profile.png"),
};

export default function MentorMatchingScreen() {
  return (
    <View className="flex-1 bg-neutral-100 relative">
      {/* 상단 헤더 바 */}
      <View className="w-full h-30 px-5 pt-20 pb-5  bg-white/80 flex-row justify-between items-center z-10">
        <Text className="text-gray-900 text-2xl font-bold tracking-tight ">
          멘토링
        </Text>
        {/* 더보기 삼점 아이콘 대체 디자인 */}
        <Image
          source={IMAGE_MAP.more}
          className="w-8 h-8"
          resizeMode="contain"
        />
      </View>

      {/* 메인 콘텐츠 스크롤 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-6 gap-6">
          {/* 타이틀 영역 */}
          <View className="px-1 gap-2">
            <Text className="text-gray-900 text-xl font-bold leading-8">
              유학생 버디 프로그램
            </Text>
            <Text className="text-gray-500 text-base font-medium">
              멘토가 매칭되었습니다. 인사해보세요!
            </Text>
          </View>

          {/* 상태 표시 바 (D-Day) */}
          <View className="w-full h-20 p-5 bg-white rounded-3xl border border-lime-100/40 flex-row justify-between items-center shadow-sm">
            <View className="flex-row items-center gap-3.5">
              {/* 상태 아이콘 박스 */}
              <Image
                source={IMAGE_MAP.match}
                className="w-10 h-10"
                resizeMode="contain"
              />
              <View className="gap-0.5">
                <Text className="text-green-600 text-xs font-bold tracking-tight">
                  STATUS
                </Text>
                <Text className="text-gray-900 text-base font-bold">
                  매칭 완료 (진행 중)
                </Text>
              </View>
            </View>
            {/* D-Day 태그 */}
            <View className="px-3 py-1.5 bg-gray-50 rounded-full">
              <Text className="text-gray-500 text-xs font-medium">D-82</Text>
            </View>
          </View>

          {/* 멘토 프로필 카드 대형 카드 */}
          <View className="w-full bg-white rounded-3xl p-6 shadow-sm overflow-hidden relative">
            {/* 상단 우측 백그라운드 그라디언트 블러 효과 재현 */}
            <View className="w-40 h-40 bg-lime-100/30 rounded-full absolute -right-20 -top-20 blur-3xl" />

            {/* 프로필 정보 상단 행 */}
            <View className="flex-row items-center gap-4 z-10">
              {/* 아바타 */}
              <Image
                source={IMAGE_MAP.profile}
                className="w-16 h-16 rounded-full"
                resizeMode="cover"
              />

              {/* 이름 및 정보 */}
              <View className="gap-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-gray-900 text-xl font-bold">
                    김민수 멘토
                  </Text>
                  <View className="bg-lime-100 rounded-[10px] px-2 py-0.5">
                    <Text className="text-green-600 text-xs font-bold">
                      한국
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-500 text-sm font-medium">
                  컴퓨터공학과 3학년
                </Text>
              </View>
            </View>

            {/* 멘토 인사말 말풍선 */}
            <View className="w-full bg-gray-50 rounded-2xl p-5 mt-6 relative">
              {/* 말풍선 꼬리 (정방형 박스를 돌려서 배치) */}
              <View className="w-4 h-4 bg-gray-50 absolute left-8 -top-2 transform rotate-45" />
              <Text className="text-gray-700 text-base font-normal leading-6">
                안녕하세요! 이번 학기 멘토를 맡게 된 김민수입니다. 학교
                생활하면서 궁금한 점 있으면 언제든 편하게 물어보세요!
              </Text>
            </View>

            {/* 채팅방 입장하기 버튼 */}
            <TouchableOpacity
              onPress={() => {
                router.push("/chat/ChatRoomScreen");
              }}
              className="w-full h-14 bg-green-600 rounded-2xl flex-row items-center justify-center gap-2 mt-6 shadow-sm"
            >
              <Text className="text-white text-base font-bold text-center">
                채팅방 입장하기
              </Text>
            </TouchableOpacity>
          </View>

          {/* 하단 안내사항 및 유의사항 */}
          <View className="px-3 pt-2 gap-2">
            <View className="flex-row items-start gap-3">
              <View className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2" />
              <Text className="flex-1 text-gray-400 text-xs font-medium leading-5">
                멘토링은 한 학기 동안 진행됩니다.
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <View className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2" />
              <Text className="flex-1 text-gray-400 text-xs font-medium leading-5">
                부적절한 언행 발생 시 프로그램 참여가 제한될 수 있습니다.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
