import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const VERIFIED_PORTAL_IDS = ["1234"];

export default function UniversityAuthScreen() {
  const [portalId, setPortalId] = useState("");

  const handleVerify = () => {
    if (portalId.trim().length === 0) return;

    const normalizedPortalId = portalId.trim();
    const isVerifiedStudent = VERIFIED_PORTAL_IDS.includes(normalizedPortalId);

    if (isVerifiedStudent) {
      router.replace("/chat");
      return;
    }

    router.replace("/chat/VerificationResultScreen");
  };

  return (
    <View className="flex-1 bg-neutral-100">
      {/* 메인 콘텐츠 영역 (상단 헤더 + 본문 스크롤) */}
      <View className="flex-1">
        {/* 상단 네비게이션 헤더 바 */}
        <View className="w-full h-24 px-4 pt-12 pb-1 flex-row items-center gap-3 bg-neutral-100">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-9 h-9 bg-stone-100 rounded-2xl items-center justify-center"
          >
            {/* 뒤로가기 화살표 형상화 */}
            <View className="w-2.5 h-2.5 border-b-2 border-l-2 border-neutral-900 transform rotate-45 ml-0.5" />
          </TouchableOpacity>
          <Text className="text-neutral-900 text-base font-bold">
            멘토멘티 인증
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 상단 인증 엠블럼 이미지 박스 */}
          <View className="w-full items-center my-6">
            <View className="w-24 h-24 bg-neutral-300 rounded-3xl items-center justify-center shadow-md">
              {/* 원본 placeholder 이미지 구역 대체 */}
              <Text className="text-3xl">🎓</Text>
            </View>
          </View>

          {/* 타이틀 및 설명문 */}
          <View className="px-6 items-center gap-2 mb-6">
            <Text className="text-neutral-900 text-xl font-bold text-center">
              학교 계정 인증
            </Text>
            <Text className="text-zinc-600 text-xs font-normal text-center leading-5">
              멘토멘티 프로그램은 재학생만 이용할 수 있습니다.{"\n"}
              학교 포털 아이디로 본인 인증을 진행해 주세요.
            </Text>
          </View>

          {/* 안내 유의사항 박스 */}
          <View className="mx-6 p-4 bg-stone-100 rounded-2xl mb-6">
            <Text className="text-zinc-600 text-xs font-normal leading-5">
              • 학교 포털(portal.kangnam.ac.kr) 아이디를 입력해 주세요{"\n"}•
              재학생 여부는 학사 시스템과 실시간으로 연동됩니다{"\n"}• 인증
              정보는 서비스 운영 목적으로만 사용됩니다
            </Text>
          </View>

          {/* 인풋 라벨 및 입력창 */}
          <View className="px-6 gap-2">
            <Text className="text-zinc-600 text-xs font-semibold pl-0.5">
              학교 아이디 (School Portal ID)
            </Text>
            <View className="w-full h-14 px-4 bg-white rounded-2xl border border-stone-300 justify-center shadow-sm">
              <TextInput
                className="w-full h-full text-base text-neutral-900"
                placeholder="학교 아이디 입력"
                placeholderTextColor="#a3a3a3"
                autoCapitalize="none"
                value={portalId}
                onChangeText={setPortalId}
                returnKeyType="done"
                onSubmitEditing={handleVerify}
              />
            </View>
            <Text className="text-neutral-400 text-xs font-normal pl-0.5 mt-1">
              예: 1234
            </Text>
          </View>

          {/* VERIFY 인증 제출 버튼 */}
          <View className="px-6 mt-6">
            <TouchableOpacity
              onPress={handleVerify}
              disabled={portalId.trim().length === 0}
              className={`w-full h-14 rounded-2xl flex-row items-center justify-center gap-2 shadow-md ${
                portalId.trim().length > 0
                  ? "bg-green-600 shadow-green-600/30"
                  : "bg-gray-300 shadow-none"
              }`}
            >
              <Text className="text-white text-base font-bold">VERIFY</Text>
              {/* 오른쪽 화살표 심플 기호 */}
              <View className="w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45 -mb-0.5" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* 하단 탭 바 (상위 레이아웃과 화면 대칭 유지용 고정 영역) */}
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
