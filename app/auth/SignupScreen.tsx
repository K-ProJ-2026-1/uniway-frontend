import { router } from "expo-router";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedStepField from "./components/AnimatedStepFiled";
import {
  AuthCodeField,
  ConfirmPasswordField,
  EmailField,
  LoginPrompt,
  NameFields,
  PasswordField,
  SignupSubmitButton,
} from "./components/SignupFields";
import { useSignupAnimation } from "./hooks/useSignupAnimation";
import { useSignupForm } from "./hooks/useSignupForm";

const IMAGE_MAP = {
  back: require("@/assets/images/back.png"),
};

export default function SignupScreen() {
  const { step, values, validation, isEmailSent, isPasswordVisible, handlers } =
    useSignupForm();
  const {
    animatedFlex,
    emailFade,
    authCodeFade,
    passwordFade,
    confirmPasswordFade,
    buttonFade,
  } = useSignupAnimation(step);

  return (
    <View className="flex-1" style={styles.container}>
      <View style={styles.topGlow} />
      <View style={styles.bottomGlow} />
      <View className="flex-1 px-6 pt-12 justify-center pb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 bg-white/20 rounded-full items-center justify-center mb-4"
        >
          <Image source={IMAGE_MAP.back} className="w-2 h-2" />
        </TouchableOpacity>
        <View className="gap-1">
          <Text className="text-white/70 text-sm font-normal">
            함께 시작해요 🌿
          </Text>
          <Text className="text-white text-2xl font-medium">회원가입</Text>
        </View>
      </View>

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
            contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
          >
            <NameFields
              firstName={values.firstName}
              lastName={values.lastName}
              onFirstNameChange={handlers.setFirstName}
              onLastNameChange={handlers.setLastName}
            />
            <AnimatedStepField
              isVisible={step >= 2}
              fadeAnim={emailFade}
              className="w-full gap-1.5 mb-5"
            >
              <EmailField
                email={values.email}
                isEmailSent={isEmailSent}
                isAuthComplete={validation.isAuthComplete}
                onEmailChange={handlers.handleEmailChange}
                onSendAuthCode={handlers.handleSendAuthCode}
              />
            </AnimatedStepField>

            <AnimatedStepField
              isVisible={step >= 3}
              fadeAnim={authCodeFade}
              className="w-full gap-1.5 mb-5"
            >
              <AuthCodeField
                authCode={values.authCode}
                isAuthComplete={validation.isAuthComplete}
                onAuthCodeChange={handlers.handleAuthCodeChange}
                onVerifyCode={handlers.handleVerifyCode}
              />
            </AnimatedStepField>

            <AnimatedStepField
              isVisible={step >= 4}
              fadeAnim={passwordFade}
              className="w-full gap-1.5 mb-5"
            >
              <PasswordField
                password={values.password}
                isPasswordVisible={isPasswordVisible}
                onPasswordChange={handlers.handlePasswordChange}
                onTogglePasswordVisibility={handlers.togglePasswordVisibility}
              />
            </AnimatedStepField>

            <AnimatedStepField
              isVisible={step >= 5}
              fadeAnim={confirmPasswordFade}
              className="w-full gap-1.5 mb-6"
            >
              <ConfirmPasswordField
                password={values.password}
                confirmPassword={values.confirmPassword}
                isPasswordVisible={isPasswordVisible}
                onConfirmPasswordChange={handlers.setConfirmPassword}
              />
            </AnimatedStepField>

            <AnimatedStepField isVisible={step >= 6} fadeAnim={buttonFade}>
              <SignupSubmitButton
                onPress={() => router.push("/auth/LoginScreen")}
              />
            </AnimatedStepField>

            <LoginPrompt onPress={() => router.push("/auth/LoginScreen")} />
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
