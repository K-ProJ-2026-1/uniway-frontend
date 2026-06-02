import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const IMAGE_MAP = {
  match: require("@/assets/images/match.png"),
  more: require("@/assets/images/more.png"),
  profile: require("@/assets/images/profile.png"),
};

type VerificationState = "idle" | "invalid" | "ineligible" | "verified";

function evaluatePortalId(portalId: string): VerificationState {
  const normalizedId = portalId.trim();

  if (!/^[A-Za-z0-9]{8,20}$/.test(normalizedId)) {
    return "invalid";
  }

  // Placeholder logic until the real school portal verification API is wired in.
  if (
    normalizedId.toUpperCase().startsWith("OUT") ||
    normalizedId.toUpperCase().startsWith("GUEST")
  ) {
    return "ineligible";
  }

  return "verified";
}

function VerificationGate({
  portalId,
  verificationState,
  onChangePortalId,
  onVerify,
  onProceed,
}: {
  portalId: string;
  verificationState: VerificationState;
  onChangePortalId: (value: string) => void;
  onVerify: () => void;
  onProceed: () => void;
}) {
  const insets = useSafeAreaInsets();
  const isInvalid = verificationState === "invalid";
  const isVerified = verificationState === "verified";

  if (verificationState === "ineligible") {
    return (
      <View className="flex-1 bg-[#F5F6F7] px-6" style={{ paddingTop: insets.top + 18 }}>
        <Pressable
          onPress={() => router.replace("/main")}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="chevron-back" size={20} color="#111827" />
        </Pressable>

        <View className="flex-1 items-center justify-center pb-16">
          <View className="h-24 w-24 items-center justify-center rounded-[28px] bg-[#F4EFE5]">
            <Ionicons name="person-remove-outline" size={38} color="#232323" />
          </View>

          <Text className="mt-8 text-[22px] font-bold text-[#111827]">인증 결과</Text>

          <View className="mt-5 w-full rounded-[24px] bg-[#F8F2E6] px-5 py-5">
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" size={18} color="#C77B17" />
              <Text className="ml-2 text-[14px] font-bold text-[#7A4A07]">
                프로그램 대상자가 아닙니다
              </Text>
            </View>
            <Text className="mt-3 text-[14px] leading-6 text-[#7C5B2B]">
              입력하신 학교 아이디는 현재 멘토멘티 프로그램 참여 대상자로 확인되지
              않아요. 포털 신청 내역과 학번 정보를 다시 확인해 주세요.
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/guide")}
            className="mt-8 h-14 w-full items-center justify-center rounded-[18px] bg-[#4BAE4F]"
          >
            <Text className="text-[15px] font-bold text-white">프로그램 지원서 보러가기</Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/main")}
            className="mt-3 h-14 w-full items-center justify-center rounded-[18px] bg-[#ECE7DB]"
          >
            <Text className="text-[15px] font-semibold text-[#746C5E]">메인으로 돌아가기</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-[#F5F6F7] px-6" style={{ paddingTop: insets.top + 18 }}>
        <Pressable
          onPress={() => router.replace("/main")}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="chevron-back" size={20} color="#111827" />
        </Pressable>

        <View className="flex-1 justify-center pb-14">
          <View className="items-center">
            <View className="h-24 w-24 items-center justify-center rounded-[28px] bg-[#DFF0DD] shadow-sm">
              <Ionicons
                name={isVerified ? "shield-checkmark-outline" : "lock-closed-outline"}
                size={36}
                color="#111827"
              />
            </View>

            <Text className="mt-8 text-[24px] font-bold text-[#111827]">학교 계정 인증</Text>
            <Text className="mt-3 text-center text-[14px] leading-6 text-[#6B7280]">
              멘토멘티 프로그램은 재학생만 이용할 수 있어요. 학교 포털 아이디로
              본인 인증을 진행해 주세요.
            </Text>
          </View>

          <View className="mt-7 rounded-[22px] bg-[#F4EFE5] px-5 py-4">
            <Text className="text-[13px] leading-6 text-[#7C7464]">
              • 학교 포털 ID는 영문과 숫자만 입력해 주세요.
            </Text>
            <Text className="mt-1 text-[13px] leading-6 text-[#7C7464]">
              • 멘토멘티 프로그램 신청 내역과 학교 계정이 일치해야 해요.
            </Text>
            <Text className="mt-1 text-[13px] leading-6 text-[#7C7464]">
              • 예시: KNU202212111
            </Text>
          </View>

          <View className="mt-8">
            <Text className="mb-3 text-[13px] font-semibold text-[#374151]">
              학교 아이디 (School Portal ID)
            </Text>
            <TextInput
              value={portalId}
              onChangeText={onChangePortalId}
              autoCapitalize="characters"
              autoCorrect={false}
              editable={!isVerified}
              placeholder="학교 아이디 입력"
              placeholderTextColor="#A7AFBA"
              className={`h-14 rounded-[16px] border bg-white px-4 text-[15px] text-[#111827] ${
                isInvalid
                  ? "border-[#F16A6A]"
                  : isVerified
                    ? "border-[#4BAE4F]"
                    : "border-[#E5E7EB]"
              }`}
            />

            {isInvalid ? (
              <Text className="mt-2 text-[12px] text-[#E45454]">
                학교 아이디 형식을 다시 확인해 주세요.
              </Text>
            ) : (
              <Text className="mt-2 text-[12px] text-[#A1A1AA]">
                학교 포털에서 사용하는 영문/숫자 ID를 입력해 주세요.
              </Text>
            )}
          </View>

          {isVerified && (
            <View className="mt-5 flex-row items-center rounded-[16px] bg-[#E6F4E6] px-4 py-3">
              <Ionicons name="checkmark-circle" size={18} color="#3F9C47" />
              <Text className="ml-2 flex-1 text-[13px] font-medium text-[#356B38]">
                인증완료입니다. 멘토 매칭 화면으로 이동할게요.
              </Text>
            </View>
          )}

          <Pressable
            onPress={isVerified ? onProceed : onVerify}
            className="mt-8 h-14 items-center justify-center rounded-[18px] bg-[#4BAE4F]"
          >
            <View className="flex-row items-center">
              <Text className="text-[15px] font-bold text-white">
                {isVerified ? "멘토 채팅 보러가기" : "VERIFY"}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#FFFFFF"
                style={{ marginLeft: 6 }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function MentorMatchingContent() {
  return (
    <View className="flex-1 bg-neutral-100">
      <View className="w-full flex-row items-center justify-between bg-white/80 px-5 pb-5 pt-20">
        <Text className="text-2xl font-bold tracking-tight text-gray-900">멘토 매칭</Text>
        <Image source={IMAGE_MAP.more} className="h-8 w-8" resizeMode="contain" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6 px-5 pt-6">
          <View className="gap-2 px-1">
            <Text className="text-xl font-bold leading-8 text-gray-900">
              유학생 버디 프로그램
            </Text>
            <Text className="text-base font-medium text-gray-500">
              멘토가 매칭되었어요. 첫 인사를 건네 보세요.
            </Text>
          </View>

          <View className="h-20 w-full flex-row items-center justify-between rounded-3xl border border-lime-100/40 bg-white p-5 shadow-sm">
            <View className="flex-row items-center gap-3.5">
              <Image source={IMAGE_MAP.match} className="h-10 w-10" resizeMode="contain" />
              <View className="gap-0.5">
                <Text className="text-xs font-bold tracking-tight text-green-600">STATUS</Text>
                <Text className="text-base font-bold text-gray-900">매칭 완료 (진행 중)</Text>
              </View>
            </View>
            <View className="rounded-full bg-gray-50 px-3 py-1.5">
              <Text className="text-xs font-medium text-gray-500">D-82</Text>
            </View>
          </View>

          <View className="relative w-full overflow-hidden rounded-3xl bg-white p-6 shadow-sm">
            <View className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-lime-100/30 blur-3xl" />

            <View className="z-10 flex-row items-center gap-4">
              <Image
                source={IMAGE_MAP.profile}
                className="h-16 w-16 rounded-full"
                resizeMode="cover"
              />

              <View className="gap-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-xl font-bold text-gray-900">김민수 멘토</Text>
                  <View className="rounded-[10px] bg-lime-100 px-2 py-0.5">
                    <Text className="text-xs font-bold text-green-600">재학중</Text>
                  </View>
                </View>
                <Text className="text-sm font-medium text-gray-500">컴퓨터공학과 3학년</Text>
              </View>
            </View>

            <View className="relative mt-6 w-full rounded-2xl bg-gray-50 p-5">
              <View className="absolute -top-2 left-8 h-4 w-4 rotate-45 bg-gray-50" />
              <Text className="text-base leading-6 text-gray-700">
                안녕하세요. 이번 학기 멘토를 맡게 된 김민수입니다. 학교 생활하면서
                궁금한 점이 있으면 언제든 편하게 물어보세요.
              </Text>
            </View>

            <Pressable
              onPress={() => router.push("/chat/room")}
              className="mt-6 h-14 w-full flex-row items-center justify-center gap-2 rounded-2xl bg-green-600 shadow-sm"
            >
              <Text className="text-base font-bold text-white">채팅방 입장하기</Text>
            </Pressable>
          </View>

          <View className="gap-2 px-3 pt-2">
            <View className="flex-row items-start gap-3">
              <View className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300" />
              <Text className="flex-1 text-xs font-medium leading-5 text-gray-400">
                멘토 매칭은 한 학기 동안 진행됩니다.
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <View className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300" />
              <Text className="flex-1 text-xs font-medium leading-5 text-gray-400">
                부적절한 행동 발생 시 프로그램 참여가 제한될 수 있습니다.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default function MentorMatchingScreen() {
  const [portalId, setPortalId] = useState("");
  const [verificationState, setVerificationState] = useState<VerificationState>("idle");
  const [hasAccessToChat, setHasAccessToChat] = useState(false);

  useEffect(() => {
    if (verificationState !== "verified") {
      return;
    }

    const timeout = setTimeout(() => {
      setHasAccessToChat(true);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [verificationState]);

  const handleChangePortalId = (value: string) => {
    setPortalId(value);

    if (verificationState !== "idle") {
      setVerificationState("idle");
    }
  };

  const handleVerify = () => {
    setVerificationState(evaluatePortalId(portalId));
  };

  if (!hasAccessToChat) {
    return (
      <VerificationGate
        portalId={portalId}
        verificationState={verificationState}
        onChangePortalId={handleChangePortalId}
        onVerify={handleVerify}
        onProceed={() => setHasAccessToChat(true)}
      />
    );
  }

  return <MentorMatchingContent />;
}
