import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const IMAGE_MAP = {
  back: require("@/assets/images/back.png"),
  match: require("@/assets/images/match.png"),
};

export default function ProgramScreen() {
  return (
    <View className="flex-1" style={styles.container}>
      <View style={styles.topGlow} />
      <View style={styles.bottomGlow} />

      <View className="px-6 pt-12 pb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 bg-white/20 rounded-full items-center justify-center mb-6"
        >
          <Image source={IMAGE_MAP.back} className="w-2 h-2" />
        </TouchableOpacity>
        <View className="gap-1">
          <Text className="text-white/70 text-sm font-normal">
            멘토멘티 프로그램
          </Text>
          <Text className="text-white text-2xl font-medium">
            프로그램 참여하기
          </Text>
        </View>
      </View>

      <View className="flex-1 bg-white rounded-t-[36px] px-6 pt-8">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full items-center my-4">
            <View className="w-24 h-24 bg-lime-100 rounded-3xl items-center justify-center">
              <Image source={IMAGE_MAP.match} className="w-12 h-12" />
            </View>
          </View>

          <View className="gap-3 mb-8">
            <Text className="text-neutral-900 text-xl font-bold text-center">
              아직 프로그램 참여 대상자가 아니에요
            </Text>
            <Text className="text-zinc-600 text-sm font-normal text-center leading-6">
              입력한 학교 아이디가 현재 멘토멘티 매칭 명단에 없습니다.
              프로그램에 참여 신청한 뒤 승인이 완료되면 멘토 채팅방에 입장할 수
              있습니다.
            </Text>
          </View>

          <View className="w-full bg-stone-100 rounded-2xl p-5 gap-3 mb-8">
            <Text className="text-neutral-900 text-base font-bold">
              참여 신청 안내
            </Text>
            <Text className="text-zinc-600 text-xs font-normal leading-5">
              • 학교 계정 정보 확인 후 프로그램 담당자가 신청을 검토합니다.
              {"\n"}• 승인 후 다시 채팅 탭에서 학교 아이디를 인증해 주세요.
              {"\n"}• 매칭이 완료되면 멘토 채팅방이 열립니다.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.replace("/")}
            className="w-full h-14 bg-green-600 rounded-2xl items-center justify-center shadow-md shadow-green-600/30"
          >
            <Text className="text-white text-base font-bold">신청 완료</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#43A047" },
  topGlow: {
    position: "absolute",
    top: -120,
    right: -110,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#7ED957",
    opacity: 0.65,
  },
  bottomGlow: {
    position: "absolute",
    top: 160,
    left: -120,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#1B7F3A",
    opacity: 0.22,
  },
});
