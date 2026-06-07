import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getLanguageDisplayName } from "@/constants/translations";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const IMAGE_MAP = {
  back: require("@/assets/images/back.png"),
  camera: require("@/assets/images/camera.png"),
  logout: require("@/assets/images/logout.png"),
  settings: require("@/assets/images/setting.png"),
  language: require("@/assets/images/language.png"),
  next: require("@/assets/images/next.png"),
  login: require("@/assets/images/favicon.png"),
};

const COPY = {
  ko: {
    guestName: "게스트 사용자",
    guestSubtitle: "로그인 후 개인 설정과 계정 정보를 확인할 수 있어요.",
    profileName: "김하린",
    profileSubtitle: "소프트웨어공학과 22학번",
    loginTitle: "로그인",
    loginSubtitle: "테스트 계정으로 로그인",
    accountSubtitle: "현재 로그인됨",
    languageSubtitle: "앱 언어 변경",
    settingsSubtitle: "앱 기본 설정",
    logoutSubtitle: "현재 계정에서 로그아웃",
  },
  en: {
    guestName: "Guest User",
    guestSubtitle: "Sign in to manage your account and personal settings.",
    profileName: "Kim Harin",
    profileSubtitle: "Software Engineering, class of 2022",
    loginTitle: "Sign in",
    loginSubtitle: "Use the demo account",
    accountSubtitle: "Currently signed in",
    languageSubtitle: "Change app language",
    settingsSubtitle: "App preferences",
    logoutSubtitle: "Sign out of this account",
  },
  zh: {
    guestName: "访客用户",
    guestSubtitle: "登录后即可查看账号信息并管理个人设置。",
    profileName: "金夏琳",
    profileSubtitle: "软件工程专业 2022级",
    loginTitle: "登录",
    loginSubtitle: "使用测试账号登录",
    accountSubtitle: "当前已登录",
    languageSubtitle: "更改应用语言",
    settingsSubtitle: "应用基础设置",
    logoutSubtitle: "退出当前账号",
  },
} as const;

export default function MyScreen() {
  const { language, t } = useLanguage();
  const { isAuthenticated, logout, user } = useAuth();
  const copy = COPY[language];
  const userName = isAuthenticated ? copy.profileName : copy.guestName;
  const userSubtitle = isAuthenticated ? copy.profileSubtitle : copy.guestSubtitle;

  const handleLoginPress = () => {
    if (isAuthenticated) {
      return;
    }

    router.push("/auth/login");
  };

  const handleLogoutPress = () => {
    logout();
    router.replace("/auth/login");
  };

  return (
    <View className="relative flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="h-56 w-full flex-row items-center justify-between rounded-b-[32px] bg-[#D1E1CD] px-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-9 w-9 items-center justify-center rounded-2xl bg-white/20"
          >
            <Image
              source={IMAGE_MAP.back}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View className="w-9" />
        </View>

        <View className="-mt-20 px-5">
          <View className="w-full items-center rounded-3xl bg-white p-6 shadow-md">
            <View className="relative h-24 w-24 rounded-full bg-green-200 p-[3px]">
              <View className="h-full w-full items-center justify-center rounded-full bg-green-100">
                <Text className="text-3xl text-green-600">
                  {isAuthenticated ? copy.profileName[0] : "G"}
                </Text>
              </View>
              <View className="absolute bottom-0 right-0 h-7 w-7 items-center justify-center rounded-full bg-green-600 shadow-sm">
                <Image
                  source={IMAGE_MAP.camera}
                  className="h-3.5 w-3.5"
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text className="mt-4 text-lg font-medium text-black">
              {userName}
            </Text>
            <Text className="mt-1 text-center text-xs font-normal text-neutral-400">
              {userSubtitle}
            </Text>

            {isAuthenticated && (
              <Text className="mt-2 text-xs font-medium text-green-700">
                ID: {user?.id}
              </Text>
            )}

            <View className="mt-6 w-full flex-row border-t border-gray-100 pt-4">
              <View className="flex-1 items-center border-r border-gray-100">
                <Text className="text-lg font-normal text-green-600">
                  {isAuthenticated ? "1" : "-"}
                </Text>
                <Text className="mt-1 text-xs font-normal text-neutral-400">
                  {t("my.mentoring")}
                </Text>
              </View>
              <View className="flex-1 items-center border-r border-gray-100">
                <Text className="text-lg font-normal text-green-600">
                  {isAuthenticated ? "5" : "-"}
                </Text>
                <Text className="mt-1 text-xs font-normal text-neutral-400">
                  {t("my.bookmark")}
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-lg font-normal text-green-600">
                  {isAuthenticated ? "32" : "-"}
                </Text>
                <Text className="mt-1 text-xs font-normal text-neutral-400">
                  {t("my.activeDays")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-6 px-5">
          <Text className="mb-2 pl-1 text-xs font-normal text-neutral-400">
            {t("my.settings")}
          </Text>
          <View className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <TouchableOpacity
              onPress={handleLoginPress}
              disabled={isAuthenticated}
              className="flex-row items-center border-b border-gray-100 px-5 py-4"
            >
              <Image
                source={IMAGE_MAP.login}
                className="mr-4 h-8 w-8"
                resizeMode="contain"
              />
              <View className="flex-1">
                <Text className="text-sm font-medium text-black">
                  {isAuthenticated ? copy.profileName : copy.loginTitle}
                </Text>
                <Text className="text-xs font-medium text-zinc-400">
                  {isAuthenticated ? copy.accountSubtitle : copy.loginSubtitle}
                </Text>
              </View>
              <Image
                source={IMAGE_MAP.next}
                className="h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/my/language")}
              className="flex-row items-center border-b border-gray-100 px-5 py-4"
            >
              <Image
                source={IMAGE_MAP.language}
                className="mr-4 h-8 w-8"
                resizeMode="contain"
              />
              <View className="flex-1">
                <Text className="text-sm font-medium text-black">
                  {t("my.language")}
                </Text>
                <Text className="text-xs font-medium text-zinc-400">
                  {getLanguageDisplayName(language)}
                  {" · "}
                  {copy.languageSubtitle}
                </Text>
              </View>
              <Image
                source={IMAGE_MAP.next}
                className="h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center px-5 py-4">
              <Image
                source={IMAGE_MAP.settings}
                className="mr-4 h-8 w-8"
                resizeMode="contain"
              />
              <View className="flex-1">
                <Text className="text-sm font-medium text-black">
                  {t("my.settings")}
                </Text>
                <Text className="text-xs font-medium text-zinc-400">
                  {copy.settingsSubtitle}
                </Text>
              </View>
              <Image
                source={IMAGE_MAP.next}
                className="h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6 px-5">
          <Text className="mb-2 pl-1 text-xs font-normal text-neutral-400">
            {t("my.appInfo")}
          </Text>
          <View className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
              <Text className="text-sm font-normal text-black">
                {t("my.version")}
              </Text>
              <Text className="text-sm font-normal text-neutral-400">1.0.0</Text>
            </View>
            <View className="flex-row items-center justify-between px-5 py-4">
              <Text className="text-sm font-normal text-black">
                {t("my.updatedAt")}
              </Text>
              <Text className="text-sm font-normal text-neutral-400">
                2026.06.08
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6 px-5">
          <TouchableOpacity
            onPress={handleLogoutPress}
            disabled={!isAuthenticated}
            className={`w-full flex-row items-center rounded-3xl p-4 shadow-sm ${
              isAuthenticated ? "bg-white" : "bg-gray-100"
            }`}
          >
            <Image
              source={IMAGE_MAP.logout}
              className="mr-4 h-8 w-8"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text
                className={`text-sm font-medium ${
                  isAuthenticated ? "text-red-400" : "text-neutral-400"
                }`}
              >
                {t("my.logout")}
              </Text>
              <Text className="mt-1 text-xs font-medium text-zinc-400">
                {copy.logoutSubtitle}
              </Text>
            </View>
            <Image
              source={IMAGE_MAP.next}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
