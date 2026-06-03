import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const IMAGE_MAP = {
  logo: require("@/assets/images/logo.png"),
  global: require("@/assets/images/global.png"),
};

export default function IntroScreen() {
  return (
    <View
      className="flex-1 justify-between py-12 px-6"
      style={styles.container}
    >
      <View style={styles.topGlow} />
      <View style={styles.midGlow} />
      <View style={styles.bottomGlow} />

      <View className="w-full flex-row justify-end pt-6">
        <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
          <View className="w-4 h-4 border-2 border-white rounded-sm" />
        </TouchableOpacity>
      </View>

      {/* 중앙 로고 및 타이틀 영역 */}
      <Image
        source={IMAGE_MAP.logo}
        className="w-32 h-32 self-center mb-6"
        resizeMode="contain"
      />

      {/* 하단 로그인 / 회원가입 버튼 세션 */}
      <View className="w-full gap-3 pb-6">
        {/* 로그인 버튼 */}
        <TouchableOpacity
          onPress={() => router.push("/auth/LoginScreen")}
          className="w-full h-14 bg-white rounded-2xl items-center justify-center shadow-md"
        >
          <Text className="text-green-600 text-base font-medium">로그인</Text>
        </TouchableOpacity>

        {/* 회원가입 버튼 */}
        <TouchableOpacity
          onPress={() => router.push("/auth/SignupScreen")}
          className="w-full h-14 bg-white/20 rounded-2xl items-center justify-center border border-white/40"
        >
          <Text className="text-white text-base font-medium">회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#70C85A",
  },
  topGlow: {
    position: "absolute",
    top: -120,
    right: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#EAF6E3",
    opacity: 0.9,
  },
  midGlow: {
    position: "absolute",
    top: 120,
    left: -100,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#9CDD84",
    opacity: 0.55,
  },
  bottomGlow: {
    position: "absolute",
    bottom: -140,
    left: -40,
    right: -40,
    height: 280,
    borderTopLeftRadius: 140,
    borderTopRightRadius: 140,
    backgroundColor: "#B9DDB0",
    opacity: 0.75,
  },
});
