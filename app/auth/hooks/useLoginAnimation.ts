import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export function useLoginAnimation(email: string, password: string) {
  const [step, setStep] = useState(1);

  const containerHeightAnim = useRef(new Animated.Value(0)).current;
  const passwordFade = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (email.includes("@") && email.split("@")[1]?.includes(".")) {
      if (step === 1) setStep(2);
    } else {
      if (step > 1 && password === "") setStep(1);
    }
  }, [email, password, step]);

  useEffect(() => {
    if (password.length >= 4) {
      if (step === 2) setStep(3);
    } else {
      if (step === 3) setStep(2);
    }
  }, [password, step]);

  useEffect(() => {
    let targetHeightValue = 0;
    if (step === 2) targetHeightValue = 0.5;
    if (step === 3) targetHeightValue = 1;

    Animated.parallel([
      Animated.spring(containerHeightAnim, {
        toValue: targetHeightValue,
        tension: 45,
        friction: 8,
        useNativeDriver: false,
      }),
      Animated.timing(passwordFade, {
        toValue: step >= 2 ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonFade, {
        toValue: step === 3 ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [buttonFade, containerHeightAnim, passwordFade, step]);

  const animatedFlex = containerHeightAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1.3, 1.8, 3.2],
  });

  return {
    step,
    animatedFlex,
    passwordFade,
    buttonFade,
  };
}
