import { useEffect, useState } from "react";
import type {
  SignupFormHandlers,
  SignupFormValues,
  SignupStep,
  SignupValidationState,
} from "../types/signup";

export function useSignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isAuthComplete, setIsAuthComplete] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [step, setStep] = useState<SignupStep>(1);

  const values: SignupFormValues = {
    firstName,
    lastName,
    email,
    authCode,
    password,
    confirmPassword,
  };

  const validation: SignupValidationState = {
    isNameComplete: firstName.trim().length > 0 && lastName.trim().length > 0,
    isEmailValid: Boolean(
      email.includes("@") && email.split("@")[1]?.includes("."),
    ),
    isAuthComplete,
    isPasswordComplete: password.length >= 4,
    isPasswordMatched:
      confirmPassword.length > 0 && password === confirmPassword,
  };

  useEffect(() => {
    let nextStep: SignupStep = 1;

    if (validation.isNameComplete) nextStep = 2;
    if (validation.isNameComplete && validation.isEmailValid) nextStep = 3;
    if (
      validation.isNameComplete &&
      validation.isEmailValid &&
      validation.isAuthComplete
    ) {
      nextStep = 4;
    }
    if (
      validation.isNameComplete &&
      validation.isEmailValid &&
      validation.isAuthComplete &&
      validation.isPasswordComplete
    ) {
      nextStep = 5;
    }
    if (
      validation.isNameComplete &&
      validation.isEmailValid &&
      validation.isAuthComplete &&
      validation.isPasswordComplete &&
      validation.isPasswordMatched
    ) {
      nextStep = 6;
    }

    setStep(nextStep);
  }, [
    validation.isNameComplete,
    validation.isEmailValid,
    validation.isAuthComplete,
    validation.isPasswordComplete,
    validation.isPasswordMatched,
  ]);

  const handleEmailChange = (nextEmail: string) => {
    setEmail(nextEmail);
    setIsEmailSent(false);
    setIsAuthComplete(false);
  };

  const handleAuthCodeChange = (nextAuthCode: string) => {
    setAuthCode(nextAuthCode);
    setIsAuthComplete(false);
  };

  const handlePasswordChange = (nextPassword: string) => {
    setPassword(nextPassword);
    setConfirmPassword("");
  };

  const handleSendAuthCode = () => {
    if (!validation.isEmailValid) return;
    setIsEmailSent(true);
  };

  const handleVerifyCode = () => {
    if (authCode.trim() === "1234") {
      setIsAuthComplete(true);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((current) => !current);
  };

  const handlers: SignupFormHandlers = {
    setFirstName,
    setLastName,
    handleEmailChange,
    handleAuthCodeChange,
    handlePasswordChange,
    setConfirmPassword,
    handleSendAuthCode,
    handleVerifyCode,
    togglePasswordVisibility,
  };

  return {
    step,
    values,
    validation,
    isEmailSent,
    isPasswordVisible,
    handlers,
  };
}
