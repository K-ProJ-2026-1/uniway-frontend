import type { Animated } from "react-native";

export type SignupStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  authCode: string;
  password: string;
  confirmPassword: string;
}

export interface SignupValidationState {
  isNameComplete: boolean;
  isEmailValid: boolean;
  isAuthComplete: boolean;
  isPasswordComplete: boolean;
  isPasswordMatched: boolean;
}

export interface SignupFormHandlers {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  handleEmailChange: (value: string) => void;
  handleAuthCodeChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  handleSendAuthCode: () => void;
  handleVerifyCode: () => void;
  togglePasswordVisibility: () => void;
}

export interface SignupAnimationValues {
  animatedFlex: Animated.AnimatedInterpolation<string | number>;
  emailFade: Animated.Value;
  authCodeFade: Animated.Value;
  passwordFade: Animated.Value;
  confirmPasswordFade: Animated.Value;
  buttonFade: Animated.Value;
}

export interface NameFieldsProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

export interface EmailFieldProps {
  email: string;
  isEmailSent: boolean;
  isAuthComplete: boolean;
  onEmailChange: (value: string) => void;
  onSendAuthCode: () => void;
}

export interface AuthCodeFieldProps {
  authCode: string;
  isAuthComplete: boolean;
  onAuthCodeChange: (value: string) => void;
  onVerifyCode: () => void;
}

export interface PasswordFieldProps {
  password: string;
  isPasswordVisible: boolean;
  onPasswordChange: (value: string) => void;
  onTogglePasswordVisibility: () => void;
}

export interface ConfirmPasswordFieldProps {
  password: string;
  confirmPassword: string;
  isPasswordVisible: boolean;
  onConfirmPasswordChange: (value: string) => void;
}

export interface SignupSubmitButtonProps {
  onPress: () => void;
}

export interface LoginPromptProps {
  onPress: () => void;
}
