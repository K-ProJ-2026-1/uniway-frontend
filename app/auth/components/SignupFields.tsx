import type { ReactNode } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from "react-native";
import type {
  AuthCodeFieldProps,
  ConfirmPasswordFieldProps,
  EmailFieldProps,
  LoginPromptProps,
  NameFieldsProps,
  PasswordFieldProps,
  SignupSubmitButtonProps,
} from "../types/signup";

const PLACEHOLDER_TEXT_COLOR = "#d6d3d1";

type SignupTextInputProps = TextInputProps & {
  className?: string;
};

function FieldLabel({ children }: { children: string }) {
  return (
    <Text className="text-neutral-400 text-xs font-medium pl-0.5">
      {children}
    </Text>
  );
}

function InputShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <View className={`h-14 rounded-2xl justify-center ${className}`}>
      {children}
    </View>
  );
}

function SignupTextInput(props: SignupTextInputProps) {
  return (
    <TextInput
      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
      {...props}
      className={`h-full text-sm text-black ${props.className ?? ""}`}
    />
  );
}

export function NameFields({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
}: NameFieldsProps) {
  return (
    <View className="w-full gap-1.5 mb-5">
      <FieldLabel>이름</FieldLabel>
      <View className="w-full flex-row gap-3">
        <InputShell className="flex-1 px-4 bg-gray-100">
          <SignupTextInput
            className="w-full"
            placeholder="성"
            value={lastName}
            onChangeText={onLastNameChange}
          />
        </InputShell>
        <InputShell className="flex-1 px-4 bg-gray-100">
          <SignupTextInput
            className="w-full"
            placeholder="이름"
            value={firstName}
            onChangeText={onFirstNameChange}
          />
        </InputShell>
      </View>
    </View>
  );
}

export function EmailField({
  email,
  isEmailSent,
  isAuthComplete,
  onEmailChange,
  onSendAuthCode,
}: EmailFieldProps) {
  return (
    <>
      <FieldLabel>이메일</FieldLabel>
      <View className="w-full flex-row gap-2">
        <InputShell className="flex-1 px-4 bg-gray-100">
          <SignupTextInput
            className="w-full"
            placeholder="test@test.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={onEmailChange}
            editable={!isAuthComplete}
          />
        </InputShell>
        <TouchableOpacity
          onPress={onSendAuthCode}
          disabled={isAuthComplete}
          className={`w-16 h-14 rounded-2xl items-center justify-center ${
            isEmailSent ? "bg-lime-100" : "bg-green-600"
          }`}
        >
          <Text
            className={`text-sm font-medium ${
              isEmailSent ? "text-green-600" : "text-white"
            }`}
          >
            {isEmailSent ? "전송됨" : "인증"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export function AuthCodeField({
  authCode,
  isAuthComplete,
  onAuthCodeChange,
  onVerifyCode,
}: AuthCodeFieldProps) {
  return (
    <>
      <FieldLabel>인증 코드</FieldLabel>
      <View className="w-full flex-row gap-2">
        <InputShell
          className={`flex-1 px-4 ${
            isAuthComplete ? "bg-lime-100" : "bg-gray-100"
          }`}
        >
          <SignupTextInput
            className="w-full"
            placeholder="1234"
            keyboardType="number-pad"
            value={authCode}
            onChangeText={onAuthCodeChange}
            editable={!isAuthComplete}
          />
        </InputShell>
        <TouchableOpacity
          onPress={onVerifyCode}
          disabled={isAuthComplete}
          className={`w-16 h-14 rounded-2xl items-center justify-center ${
            isAuthComplete ? "bg-lime-100" : "bg-green-600"
          }`}
        >
          <Text
            className={`text-sm font-normal ${
              isAuthComplete ? "text-green-600" : "text-white"
            }`}
          >
            {isAuthComplete ? "완료" : "확인"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export function PasswordField({
  password,
  isPasswordVisible,
  onPasswordChange,
  onTogglePasswordVisibility,
}: PasswordFieldProps) {
  return (
    <>
      <FieldLabel>비밀번호</FieldLabel>
      <View className="w-full h-14 px-5 bg-gray-100 rounded-2xl flex-row items-center justify-between">
        <SignupTextInput
          className="flex-1"
          placeholder="123123"
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          value={password}
          onChangeText={onPasswordChange}
        />
        <TouchableOpacity onPress={onTogglePasswordVisibility}>
          <View className="w-5 h-5 items-center justify-center">
            <Text className="text-stone-400 text-xs">
              {isPasswordVisible ? "🙈" : "👁️"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export function ConfirmPasswordField({
  password,
  confirmPassword,
  isPasswordVisible,
  onConfirmPasswordChange,
}: ConfirmPasswordFieldProps) {
  const isMatched = password && confirmPassword && password === confirmPassword;

  return (
    <>
      <FieldLabel>비밀번호 확인</FieldLabel>
      <View
        className={`w-full h-14 px-5 rounded-2xl flex-row items-center justify-between ${
          isMatched ? "bg-lime-100" : "bg-gray-100"
        }`}
      >
        <SignupTextInput
          className="flex-1"
          placeholder="123123"
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={onConfirmPasswordChange}
        />
      </View>
    </>
  );
}

export function SignupSubmitButton({ onPress }: SignupSubmitButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full h-14 bg-green-600 rounded-2xl items-center justify-center shadow-lg shadow-green-600/35 mb-6"
    >
      <Text className="text-white text-base font-medium">가입하기</Text>
    </TouchableOpacity>
  );
}

export function LoginPrompt({ onPress }: LoginPromptProps) {
  return (
    <View className="w-full flex-row justify-center items-center gap-1.5 mt-2">
      <Text className="text-neutral-400 text-xs font-normal">
        이미 계정이 있으신가요?
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text className="text-green-600 text-xs font-medium underline">
          로그인
        </Text>
      </TouchableOpacity>
    </View>
  );
}
