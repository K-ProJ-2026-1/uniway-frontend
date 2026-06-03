import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../assets/global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="my/language" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen
          name="chat/ChatRoomScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chat/ProgramScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="chat/UniversityAuthScreen"
          options={{ headerShown: false }}
        />{" "}
        <Stack.Screen
          name="chat/VerificationResultScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/IntroScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/LoginScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/SignupScreen"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
