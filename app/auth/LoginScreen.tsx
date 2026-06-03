import { router } from "expo-router";
import { useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedStepField from "./components/AnimatedStepFiled";
import { useLoginAnimation } from "./hooks/useLoginAnimation";

const IMAGE_MAP = {
  back: require("@/assets/images/back.png"),
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 분리한 커스텀 훅 가져오기
  const { step, animatedFlex, passwordFade, buttonFade } = useLoginAnimation(
    email,
    password,
  );

  return (
    <View className="flex-1" style={styles.container}>
      <View style={styles.topGlow} />
      <View style={styles.bottomGlow} />

      {/* 상단 헤더 영역 */}
      <View className="flex-1 px-6 pt-12 justify-center pb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 bg-white/20 rounded-full items-center justify-center mb-4"
        >
          <Image source={IMAGE_MAP.back} className="w-2 h-2" />
        </TouchableOpacity>
        <View className="gap-1">
          <Text className="text-white/70 text-sm font-normal">
            환영합니다 👋
          </Text>
          <Text className="text-white text-2xl font-medium">로그인</Text>
        </View>
      </View>

      {/* 실시간으로 늘어나는 토스 스타일 바텀 박스 */}
      <Animated.View
        style={{ flex: animatedFlex }}
        className="bg-white rounded-t-[36px] shadow-2xl"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            className="flex-1 px-6 pt-8"
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            {/* 1단계: 이메일 고정 필드 */}
            <View className="w-full gap-1.5 mb-5">
              <Text className="text-neutral-400 text-xs font-medium pl-0.5">
                이메일
              </Text>
              <View className="w-full h-14 px-5 bg-gray-100 rounded-2xl justify-center">
                <TextInput
                  className="w-full h-full text-sm text-black"
                  placeholder="test@test.com"
                  placeholderTextColor="#d6d3d1"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* 2단계: 스르륵 등장하는 비밀번호 필드 및 옵션 */}
            <AnimatedStepField
              isVisible={step >= 2}
              fadeAnim={passwordFade}
              className="w-full gap-1.5 mb-5"
            >
              <Text className="text-neutral-400 text-xs font-medium pl-0.5">
                비밀번호
              </Text>
              <View className="w-full h-14 px-5 bg-gray-100 rounded-2xl flex-row items-center justify-between">
                <TextInput
                  className="flex-1 h-full text-sm text-black"
                  placeholder="비밀번호를 입력해주세요"
                  placeholderTextColor="#d6d3d1"
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <View className="w-5 h-5 items-center justify-center">
                    <Text className="text-stone-400 text-xs">
                      {isPasswordVisible ? "🙈" : "👁️"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="w-full flex-row justify-between items-center mb-6 px-0.5 mt-2">
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center gap-2"
                >
                  <View
                    className={`w-5 h-5 rounded-lg items-center justify-center ${rememberMe ? "bg-green-600" : "border-2 border-gray-300"}`}
                  >
                    {rememberMe && (
                      <View className="w-2.5 h-1.5 border-b-2 border-l-2 border-white transform -rotate-45 -mt-0.5" />
                    )}
                  </View>
                  <Text className="text-neutral-500 text-xs font-medium">
                    로그인 상태 유지
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="text-green-600 text-xs font-medium">
                    비밀번호 찾기
                  </Text>
                </TouchableOpacity>
              </View>
            </AnimatedStepField>

            {/* 3단계: 로그인 확인 버튼 */}
            <AnimatedStepField
              isVisible={step === 3}
              fadeAnim={buttonFade}
              className="w-full"
            >
              <TouchableOpacity className="w-full h-14 bg-green-600 rounded-2xl items-center justify-center shadow-lg shadow-green-600/35 mb-6">
                <Text className="text-white text-base font-medium">로그인</Text>
              </TouchableOpacity>
            </AnimatedStepField>

            {/* 하단 푸터 링크 */}
            <View className="w-full flex-row items-center gap-3 mb-6 mt-2">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="text-stone-300 text-xs font-normal">또는</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            <View className="w-full h-14 rounded-2xl border border-gray-200 flex-row items-center justify-center gap-1.5">
              <Text className="text-green-600 text-sm font-medium">
                계정이 없으신가요?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/auth/SignupScreen")}
              >
                <Text className="text-green-600 text-sm font-medium underline">
                  회원가입
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
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
