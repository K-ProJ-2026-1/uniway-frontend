import React from "react";
import { Animated } from "react-native";

interface AnimatedStepFieldProps {
  isVisible: boolean;
  fadeAnim: Animated.Value;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedStepField({
  isVisible,
  fadeAnim,
  children,
  className = "",
}: AnimatedStepFieldProps) {
  // 완전 비활성화 상태일 때는 레이아웃 공간을 차지하지 않도록 처리
  if (!isVisible && (fadeAnim as any)._value === 0) return null;

  return (
    <Animated.View style={{ opacity: fadeAnim }} className={className}>
      {children}
    </Animated.View>
  );
}
