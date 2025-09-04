import React, { useRef, useState, useEffect, useCallback } from "react";
import { XStack, YStack, Text } from "tamagui";
import {
  TextInput,
  StyleSheet,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputChangeEventData,
} from "react-native";
import { useAppColors } from "@/hooks";
import { useTranslation } from "react-i18next";
import { MonoText, MonoTextBold } from "../common/StyledText";
import { FormikProps } from "formik";
import { ButtonText } from "../common/Button";

interface OtpFormProps {
  length?: number;
  onComplete?: (otp: string) => void;
  formik: FormikProps<any>;
  onBack: () => void;
}

export const OtpForm = ({
  length = 6,
  onComplete,
  formik,
  onBack,
}: OtpFormProps) => {
  const { colors } = useAppColors();
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer state
  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Initialize and handle countdown timer
  useEffect(() => {
    startCountdown();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startCountdown = useCallback(() => {
    setCountdown(30);
    setIsResendDisabled(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsResendDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  }, []);

  const handleResendOtp = () => {
    if (!isResendDisabled) {
      console.log("Resending OTP...");
      // Here you would call your API to resend the OTP

      // Reset the countdown
      startCountdown();
    }
  };

  const handleChange = (text: string, index: number) => {
    // Only allow digits
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    // Take only the last character if multiple characters are pasted
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);

    // Auto focus to next input if a digit was entered
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    const otpValue = newOtp.join("");
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    // Handle backspace
    if (e.nativeEvent.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text;
    // Handle paste event
    if (!/^\d+$/.test(text)) return;

    const digits = text.split("").slice(0, length);
    const newOtp = [...otp];

    digits.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });

    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(digits.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    // Check if OTP is complete
    const otpValue = newOtp.join("");
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  return (
    <YStack flex={1} space="$4" width="100%" paddingTop="$6">
      <MonoText color={colors.textSecondary} textAlign="center" fontSize={14}>
        {`${t("welcome.otpInstructions")}`}
        <MonoTextBold>{` +84${formik.values.phoneNumber}`}</MonoTextBold>
      </MonoText>

      <XStack
        justifyContent="space-between"
        width="100%"
        alignSelf="center"
        space="$2"
      >
        {Array(length)
          .fill(0)
          .map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                {
                  borderColor: colors.borderColor,
                  color: colors.text,
                  backgroundColor: colors.inputBackground,
                },
              ]}
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              onChange={(e) => handlePaste(e)}
            />
          ))}
      </XStack>

      <XStack justifyContent="center" alignItems="center" space="$2">
        <ButtonText
          title={t("welcome.resend")}
          onPress={handleResendOtp}
          disabled={isResendDisabled}
          fontSize={16}
          fontWeight="600"
          marginTop="$2"
          marginBottom="$2"
          marginLeft="$2"
          marginRight="$2"
          margin="$2"
        />
        {isResendDisabled && (
          <MonoText color={colors.textSecondary}>
            {`00:${countdown < 10 ? "0" : ""}${countdown}`}
          </MonoText>
        )}
        <MonoText>{t("common.or")}</MonoText>
        <ButtonText
          title={t("welcome.changePhone")}
          onPress={onBack}
          disabled={false}
          fontSize={16}
          fontWeight="600"
          marginTop="$2"
          marginBottom="$2"
          marginLeft="$2"
          marginRight="$2"
          margin="$2"
        />
      </XStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  otpInput: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "SpaceMonoBold",
    padding: 0,
  },
});
