import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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
import {
  getMockMatchStatus,
  getMockMentorProfile,
} from "@/constants/chat/mockChat";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageCode } from "@/types/i18n";

const IMAGE_MAP = {
  match: require("@/assets/images/match.png"),
  more: require("@/assets/images/more.png"),
  profile: require("@/assets/images/profile.png"),
};

const VERIFICATION_COPY: Record<
  LanguageCode,
  {
    ineligibleTitle: string;
    ineligibleBadge: string;
    ineligibleBody: string;
    openGuide: string;
    backToMain: string;
    portalHint1: string;
    portalHint2: string;
    portalHint3: string;
    portalFieldLabel: string;
    portalPlaceholder: string;
    invalidMessage: string;
    helperMessage: string;
    verifiedMessage: string;
    cautionLine1: string;
    cautionLine2: string;
  }
> = {
  ko: {
    ineligibleTitle: "인증 결과",
    ineligibleBadge: "프로그램 대상자가 아닙니다",
    ineligibleBody:
      "입력한 학교 계정은 현재 멘토 프로그램 참여 대상으로 확인되지 않았어요. 신청 내역과 학번 정보를 다시 확인해 주세요.",
    openGuide: "프로그램 안내 보러가기",
    backToMain: "메인으로 돌아가기",
    portalHint1: "학교 포털 ID는 영문과 숫자 조합으로 입력해 주세요.",
    portalHint2: "멘토 프로그램 신청 정보와 학교 계정이 일치해야 해요.",
    portalHint3: "예시: KNU202212111",
    portalFieldLabel: "학교 아이디 (School Portal ID)",
    portalPlaceholder: "학교 아이디 입력",
    invalidMessage: "학교 아이디 형식을 다시 확인해 주세요.",
    helperMessage: "학교 포털에서 사용하는 영문/숫자 ID를 입력해 주세요.",
    verifiedMessage: "인증 완료되었습니다. 멘토 매칭 화면으로 이동할게요.",
    cautionLine1: "멘토 매칭은 승인 기간 동안 유지됩니다.",
    cautionLine2: "부적절한 활동 발생 시 프로그램 참여가 제한될 수 있습니다.",
  },
  en: {
    ineligibleTitle: "Verification result",
    ineligibleBadge: "You are not eligible for this program",
    ineligibleBody:
      "The school account you entered is not currently listed for the mentor program. Please check your application and student ID information again.",
    openGuide: "Open program guide",
    backToMain: "Back to main",
    portalHint1: "Enter your school portal ID using letters and numbers.",
    portalHint2: "Your mentor program application must match your school account.",
    portalHint3: "Example: KNU202212111",
    portalFieldLabel: "School Portal ID",
    portalPlaceholder: "Enter your school portal ID",
    invalidMessage: "Please check the format of your school portal ID.",
    helperMessage: "Use the same alphanumeric ID that you use in the school portal.",
    verifiedMessage: "Verification complete. We will move you to the mentor matching screen.",
    cautionLine1: "Mentor matching remains active during the approved support period.",
    cautionLine2: "Program participation may be restricted if inappropriate behavior occurs.",
  },
  zh: {
    ineligibleTitle: "认证结果",
    ineligibleBadge: "你目前不属于该项目对象",
    ineligibleBody:
      "你输入的学校账号目前没有被确认在导师项目参与名单中。请再次确认申请记录和学号信息。",
    openGuide: "查看项目说明",
    backToMain: "返回主页",
    portalHint1: "请输入由英文和数字组成的学校门户账号。",
    portalHint2: "导师项目申请信息必须与学校账号一致。",
    portalHint3: "示例: KNU202212111",
    portalFieldLabel: "学校门户账号",
    portalPlaceholder: "输入学校门户账号",
    invalidMessage: "请重新确认学校门户账号格式。",
    helperMessage: "请输入你在学校门户中使用的英文/数字账号。",
    verifiedMessage: "认证完成。现在将进入导师匹配页面。",
    cautionLine1: "导师匹配会在批准的活动期间内保持有效。",
    cautionLine2: "如发生不当行为，可能会限制项目参与资格。",
  },
};

type VerificationState = "idle" | "invalid" | "ineligible" | "verified";

function evaluatePortalId(portalId: string): VerificationState {
  const normalizedId = portalId.trim();

  if (!/^[A-Za-z0-9]{8,20}$/.test(normalizedId)) {
    return "invalid";
  }

  if (
    normalizedId.toUpperCase().startsWith("OUT") ||
    normalizedId.toUpperCase().startsWith("GUEST")
  ) {
    return "ineligible";
  }

  return "verified";
}

function VerificationGate({
  language,
  portalId,
  verificationState,
  onChangePortalId,
  onVerify,
  onProceed,
}: {
  language: LanguageCode;
  portalId: string;
  verificationState: VerificationState;
  onChangePortalId: (value: string) => void;
  onVerify: () => void;
  onProceed: () => void;
}) {
  const insets = useSafeAreaInsets();
  const copy = VERIFICATION_COPY[language];
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

          <Text className="mt-8 text-[22px] font-bold text-[#111827]">
            {copy.ineligibleTitle}
          </Text>

          <View className="mt-5 w-full rounded-[24px] bg-[#F8F2E6] px-5 py-5">
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" size={18} color="#C77B17" />
              <Text className="ml-2 text-[14px] font-bold text-[#7A4A07]">
                {copy.ineligibleBadge}
              </Text>
            </View>
            <Text className="mt-3 text-[14px] leading-6 text-[#7C5B2B]">
              {copy.ineligibleBody}
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/guide")}
            className="mt-8 h-14 w-full items-center justify-center rounded-[18px] bg-[#4BAE4F]"
          >
            <Text className="text-[15px] font-bold text-white">{copy.openGuide}</Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/main")}
            className="mt-3 h-14 w-full items-center justify-center rounded-[18px] bg-[#ECE7DB]"
          >
            <Text className="text-[15px] font-semibold text-[#746C5E]">
              {copy.backToMain}
            </Text>
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

            <Text className="mt-8 text-[24px] font-bold text-[#111827]">
              {language === "ko"
                ? "학교 계정 인증"
                : language === "en"
                  ? "Verify your school account"
                  : "学校账号认证"}
            </Text>
            <Text className="mt-3 text-center text-[14px] leading-6 text-[#6B7280]">
              {language === "ko"
                ? "멘토 프로그램은 재학생만 이용할 수 있어요. 학교 포털 아이디로 본인 인증을 진행해 주세요."
                : language === "en"
                  ? "The mentor program is only for enrolled students. Please verify with your school portal ID."
                  : "导师项目仅限在校生使用。请用学校门户账号完成认证。"}
            </Text>
          </View>

          <View className="mt-7 rounded-[22px] bg-[#F4EFE5] px-5 py-4">
            <Text className="text-[13px] leading-6 text-[#7C7464]">{copy.portalHint1}</Text>
            <Text className="mt-1 text-[13px] leading-6 text-[#7C7464]">
              {copy.portalHint2}
            </Text>
            <Text className="mt-1 text-[13px] leading-6 text-[#7C7464]">
              {copy.portalHint3}
            </Text>
          </View>

          <View className="mt-8">
            <Text className="mb-3 text-[13px] font-semibold text-[#374151]">
              {copy.portalFieldLabel}
            </Text>
            <TextInput
              value={portalId}
              onChangeText={onChangePortalId}
              autoCapitalize="characters"
              autoCorrect={false}
              editable={!isVerified}
              placeholder={copy.portalPlaceholder}
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
                {copy.invalidMessage}
              </Text>
            ) : (
              <Text className="mt-2 text-[12px] text-[#A1A1AA]">
                {copy.helperMessage}
              </Text>
            )}
          </View>

          {isVerified && (
            <View className="mt-5 flex-row items-center rounded-[16px] bg-[#E6F4E6] px-4 py-3">
              <Ionicons name="checkmark-circle" size={18} color="#3F9C47" />
              <Text className="ml-2 flex-1 text-[13px] font-medium text-[#356B38]">
                {copy.verifiedMessage}
              </Text>
            </View>
          )}

          <Pressable
            onPress={isVerified ? onProceed : onVerify}
            className="mt-8 h-14 items-center justify-center rounded-[18px] bg-[#4BAE4F]"
          >
            <View className="flex-row items-center">
              <Text className="text-[15px] font-bold text-white">
                {isVerified
                  ? language === "ko"
                    ? "멘토 채팅 보러가기"
                    : language === "en"
                      ? "Open mentor chat"
                      : "进入导师聊天"
                  : language === "ko"
                    ? "인증하고 멘토 확인하기"
                    : language === "en"
                      ? "Verify and view mentor"
                      : "认证并查看导师"}
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

function MentorMatchingContent({ language }: { language: LanguageCode }) {
  const { t } = useLanguage();
  const mentorProfile = useMemo(() => getMockMentorProfile(language), [language]);
  const matchStatus = useMemo(() => getMockMatchStatus(language), [language]);
  const noteCopy =
    language === "ko"
      ? [
          "멘토 매칭은 승인 기간 동안 유지됩니다.",
          "부적절한 활동 발생 시 프로그램 참여가 제한될 수 있습니다.",
        ]
      : language === "en"
        ? [
            "Mentor matching remains active during the approved support period.",
            "Program participation may be restricted if inappropriate behavior occurs.",
          ]
        : [
            "导师匹配会在批准的活动期间内保持有效。",
            "如发生不当行为，可能会限制项目参与资格。",
          ];

  return (
    <View className="flex-1 bg-neutral-100">
      <View className="w-full flex-row items-center justify-between bg-white/80 px-5 pb-5 pt-20">
        <Text className="text-2xl font-bold tracking-tight text-gray-900">
          {language === "ko" ? "멘토 매칭" : language === "en" ? "Mentor Match" : "导师匹配"}
        </Text>
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
              {t("chat.matchTitle")}
            </Text>
            <Text className="text-base font-medium text-gray-500">
              {t("chat.matchSubtitle")}
            </Text>
          </View>

          <View className="h-20 w-full flex-row items-center justify-between rounded-3xl border border-lime-100/40 bg-white p-5 shadow-sm">
            <View className="flex-row items-center gap-3.5">
              <Image source={IMAGE_MAP.match} className="h-10 w-10" resizeMode="contain" />
              <View className="gap-0.5">
                <Text className="text-xs font-bold tracking-tight text-green-600">STATUS</Text>
                <Text className="text-base font-bold text-gray-900">{matchStatus.label}</Text>
              </View>
            </View>
            <View className="rounded-full bg-gray-50 px-3 py-1.5">
              <Text className="text-xs font-medium text-gray-500">
                {matchStatus.durationLabel}
              </Text>
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
                  <Text className="text-xl font-bold text-gray-900">
                    {mentorProfile.roleLabel}
                  </Text>
                  <View className="rounded-[10px] bg-lime-100 px-2 py-0.5">
                    <Text className="text-xs font-bold text-green-600">
                      {mentorProfile.statusLabel}
                    </Text>
                  </View>
                </View>
                <Text className="text-sm font-medium text-gray-500">
                  {mentorProfile.department}
                </Text>
              </View>
            </View>

            <View className="relative mt-6 w-full rounded-2xl bg-gray-50 p-5">
              <View className="absolute -top-2 left-8 h-4 w-4 rotate-45 bg-gray-50" />
              <Text className="text-base leading-6 text-gray-700">{mentorProfile.intro}</Text>
            </View>

            <View className="mt-5 flex-row flex-wrap">
              {mentorProfile.languages.map((item) => (
                <View key={item} className="mb-2 mr-2 rounded-full bg-white px-3 py-1.5">
                  <Text className="text-[12px] font-semibold text-[#5C6470]">{item}</Text>
                </View>
              ))}
            </View>

            <View className="mt-4 rounded-2xl bg-[#F6FAF5] px-4 py-4">
              <Text className="text-[13px] font-bold text-[#4D8E4B]">
                {t("chat.mentorTopics")}
              </Text>
              <View className="mt-3 flex-row flex-wrap">
                {mentorProfile.topics.map((topic) => (
                  <View
                    key={topic}
                    className="mb-2 mr-2 rounded-full bg-[#E8F4E4] px-3 py-1.5"
                  >
                    <Text className="text-[12px] font-medium text-[#4D8E4B]">#{topic}</Text>
                  </View>
                ))}
              </View>
            </View>

            <Pressable
              onPress={() => router.push("/chat/room")}
              className="mt-6 h-14 w-full flex-row items-center justify-center gap-2 rounded-2xl bg-green-600 shadow-sm"
            >
              <Text className="text-base font-bold text-white">{t("chat.enterRoom")}</Text>
            </Pressable>
          </View>

          <View className="gap-2 px-3 pt-2">
            {noteCopy.map((line) => (
              <View key={line} className="flex-row items-start gap-3">
                <View className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300" />
                <Text className="flex-1 text-xs font-medium leading-5 text-gray-400">
                  {line}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default function MentorMatchingScreen() {
  const { language } = useLanguage();
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
        language={language}
        portalId={portalId}
        verificationState={verificationState}
        onChangePortalId={handleChangePortalId}
        onVerify={handleVerify}
        onProceed={() => setHasAccessToChat(true)}
      />
    );
  }

  return <MentorMatchingContent language={language} />;
}
