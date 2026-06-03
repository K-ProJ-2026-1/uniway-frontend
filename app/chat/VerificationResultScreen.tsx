import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function VerificationResultScreen() {
  return (
    <View className="flex-1 bg-neutral-100">
      {/* 메인 콘텐츠 영역 */}
      <View className="flex-1">
        {/* 상단 헤더 바 */}
        <View className="w-full h-24 px-4 pt-12 pb-1 flex-row items-center gap-3 bg-neutral-100">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-9 h-9 bg-stone-100 rounded-2xl items-center justify-center"
          >
            <View className="w-2.5 h-2.5 border-b-2 border-l-2 border-neutral-900 transform rotate-45 ml-0.5" />
          </TouchableOpacity>
          <Text className="text-neutral-900 text-base font-bold">
            인증 결과
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 중앙 경고 엠블럼 아이콘 */}
          <View className="w-full items-center my-10">
            <View className="w-24 h-24 bg-stone-100 rounded-3xl items-center justify-center shadow-sm">
              <Text className="text-4xl">⚠️</Text>
            </View>
          </View>

          {/* 인증 결과 카드 섹션 */}
          <View className="w-full bg-stone-100 rounded-2xl p-5 flex-row items-start gap-3 mb-8">
            {/* 주의 마크 작은 아이콘 */}
            <View className="w-5 h-5 items-center justify-center bg-amber-500 rounded-full mt-0.5">
              <Text className="text-white text-[10px] font-bold">!</Text>
            </View>

            {/* 안내 본문 정보 */}
            <View className="flex-1 gap-1.5">
              <Text className="text-neutral-900 text-base font-bold">
                프로그램 대상자가 아닙니다
              </Text>
              <Text className="text-zinc-600 text-xs font-normal leading-5">
                입력하신 학교 아이디는 현재 멘토멘티 프로그램 참여 대상자로
                등록되어 있지 않습니다. 아래 버튼을 통해 프로그램에 지원하실 수
                있습니다.
              </Text>
            </View>
          </View>

          {/* 하단 인터랙션 액션 버튼 모음 */}
          <View className="w-full gap-3">
            {/* 메인 액션: 프로그램 지원 버튼 */}
            <TouchableOpacity
              onPress={() => console.log("지원 페이지 이동")}
              className="w-full h-14 bg-green-600 rounded-2xl flex-row items-center justify-center gap-2 shadow-md shadow-green-600/30"
            >
              <Text className="text-white text-base font-bold">
                프로그램 지원하러 가기
              </Text>
            </TouchableOpacity>

            {/* 서브 액션: 메인 이동 버튼 */}
            <TouchableOpacity
              onPress={() => router.replace("/")}
              className="w-full h-14 bg-stone-200 rounded-2xl items-center justify-center"
            >
              <Text className="text-zinc-600 text-base font-semibold">
                메인으로 돌아가기
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* 하단 고정 내비게이션 탭 바 */}
      <View className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 flex-row justify-around items-center px-4 pb-4">
        <TouchableOpacity className="items-center justify-center">
          <Text className="text-zinc-500 text-xs font-medium">Map</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center">
          <Text className="text-zinc-500 text-xs font-medium">Guide</Text>
        </TouchableOpacity>
        {/* 활성화된 Chat 탭 */}
        <TouchableOpacity className="bg-lime-100 px-4 py-2 rounded-2xl items-center justify-center">
          <Text className="text-green-600 text-xs font-medium">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center">
          <Text className="text-zinc-500 text-xs font-medium">My</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
