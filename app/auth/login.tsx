import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DEMO_ACCOUNT, useAuth } from "@/contexts/AuthContext";

const IMAGE_MAP = {
  logo: require("@/assets/images/logo.png"),
};

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [userId, setUserId] = useState<string>(DEMO_ACCOUNT.id);
  const [password, setPassword] = useState<string>(DEMO_ACCOUNT.password);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    const isSuccess = login(userId, password);

    if (!isSuccess) {
      setErrorMessage("테스트 계정을 다시 확인해 주세요.");
      return;
    }

    setErrorMessage("");
    router.replace("/main");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-[#70C85A]"
    >
      <View
        className="flex-1 px-6"
        style={{ paddingTop: insets.top + 24, paddingBottom: 24 }}
      >
        <View className="absolute right-[-48] top-[-36] h-52 w-52 rounded-full bg-[#E8F5E1]" />
        <View className="absolute left-[-80] top-[160] h-64 w-64 rounded-full bg-[#90D57E]" />
        <View className="absolute bottom-[-96] left-[-24] right-[-24] h-72 rounded-t-[160px] bg-[#B7E1A9]" />

        <Pressable
          onPress={() => router.replace("/auth/intro")}
          className="h-11 w-11 items-center justify-center rounded-full bg-white/25"
        >
          <Text className="text-lg font-bold text-white">{"<"}</Text>
        </Pressable>

        <View className="mt-10 items-center">
          <Image
            source={IMAGE_MAP.logo}
            className="h-24 w-24"
            resizeMode="contain"
          />
          <Text className="mt-5 text-[30px] font-bold text-white">
            UniWay Login
          </Text>
          <Text className="mt-2 text-center text-[15px] leading-6 text-white/90">
            테스트 계정으로 바로 로그인해서 메인 화면을 확인할 수 있어요.
          </Text>
        </View>

        <View className="mt-10 rounded-[28px] bg-white px-5 py-6 shadow-lg">
          <View className="rounded-[20px] bg-[#F3F8EE] px-4 py-4">
            <Text className="text-[13px] font-semibold text-[#4B7D44]">
              테스트 계정
            </Text>
            <Text className="mt-2 text-[14px] text-[#1F2937]">
              아이디: {DEMO_ACCOUNT.id}
            </Text>
            <Text className="mt-1 text-[14px] text-[#1F2937]">
              비밀번호: {DEMO_ACCOUNT.password}
            </Text>
          </View>

          <View className="mt-5">
            <Text className="mb-2 text-[13px] font-semibold text-[#4B5563]">
              아이디
            </Text>
            <TextInput
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="아이디 입력"
              placeholderTextColor="#9CA3AF"
              className="h-14 rounded-[18px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 text-[15px] text-[#111827]"
            />
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-[13px] font-semibold text-[#4B5563]">
              비밀번호
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholder="비밀번호 입력"
              placeholderTextColor="#9CA3AF"
              className="h-14 rounded-[18px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 text-[15px] text-[#111827]"
            />
          </View>

          {errorMessage.length > 0 && (
            <Text className="mt-3 text-[13px] font-medium text-[#D14343]">
              {errorMessage}
            </Text>
          )}

          <Pressable
            onPress={handleLogin}
            className="mt-6 h-14 items-center justify-center rounded-[18px] bg-[#58AF55]"
          >
            <Text className="text-[16px] font-bold text-white">로그인</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
