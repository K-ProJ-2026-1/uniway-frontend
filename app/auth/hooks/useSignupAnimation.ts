import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import type { SignupAnimationValues, SignupStep } from "../types/signup";

function getTargetHeightValue(step: SignupStep) {
  if (step === 2) return 0.18;
  if (step === 3) return 0.42;
  if (step === 4) return 0.62;
  if (step === 5) return 0.8;
  if (step === 6) return 1;

  return 0;
}

export function useSignupAnimation(step: SignupStep): SignupAnimationValues {
  const containerHeightAnim = useRef(new Animated.Value(0)).current;
  const emailFade = useRef(new Animated.Value(0)).current;
  const authCodeFade = useRef(new Animated.Value(0)).current;
  const passwordFade = useRef(new Animated.Value(0)).current;
  const confirmPasswordFade = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(containerHeightAnim, {
        toValue: getTargetHeightValue(step),
        tension: 45,
        friction: 8,
        useNativeDriver: false,
      }),
      Animated.timing(emailFade, {
        toValue: step >= 2 ? 1 : 0,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(authCodeFade, {
        toValue: step >= 3 ? 1 : 0,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(passwordFade, {
        toValue: step >= 4 ? 1 : 0,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(confirmPasswordFade, {
        toValue: step >= 5 ? 1 : 0,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(buttonFade, {
        toValue: step >= 6 ? 1 : 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    authCodeFade,
    buttonFade,
    confirmPasswordFade,
    containerHeightAnim,
    emailFade,
    passwordFade,
    step,
  ]);

  const animatedFlex = containerHeightAnim.interpolate({
    inputRange: [0, 0.18, 0.42, 0.62, 0.8, 1],
    outputRange: [1.25, 1.65, 2.1, 2.55, 3, 3.35],
  });

  return {
    animatedFlex,
    emailFade,
    authCodeFade,
    passwordFade,
    confirmPasswordFade,
    buttonFade,
  };
}
