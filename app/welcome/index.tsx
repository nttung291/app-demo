import React, { useState } from "react";
import { YStack, Text } from "tamagui";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { IconFlag } from "@/assets/icons";
import { Button, SignInForm, OtpForm } from "@/components";
import { PhoneSchema } from "@/constants/Verification";
import { useAppColors } from "@/hooks";
import { LayoutContainer } from "@/components/layout/LayoutContainer";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { MonoTextBold } from "@/components/common/StyledText";

const validationSchema = PhoneSchema;

interface FormValues {
  phoneNumber: string;
  phone: string;
}

const initialValues: FormValues = {
  phoneNumber: "",
  phone: "",
};

enum Steps {
  SIGN_IN = "SIGN_IN",
  OTP = "OTP",
}

export default function WelcomeScreen() {
  const [step, setStep] = useState(Steps.OTP);

  const { colors } = useAppColors();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: FormValues) => {
      if (isValid && step === Steps.SIGN_IN) {
        setStep(Steps.OTP);
      }
    },
  });

  const handleOtpComplete = (otp: string) => {
    console.log("OTP submitted:", otp);
    // In a real app, this would call an API to verify the OTP
    // and then navigate to the next screen on success
    alert(`OTP verification successful: ${otp}`);
  };

  const { handleSubmit, isValid, values } = formik;

  return (
    <LayoutContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            <YStack flex={1} backgroundColor={colors.background}>
              <YStack
                backgroundColor={colors.headerBackground}
                paddingHorizontal="$4"
                paddingBottom="$10"
                paddingTop="$8"
              >
                <MonoTextBold
                  color={colors.text}
                  fontSize={20}
                  fontWeight="bold"
                >
                  {t("welcome.title")}
                  <MonoTextBold
                    color={colors.primaryDark}
                    fontSize={20}
                    fontWeight="bold"
                  >
                    {` TAP TAP`}
                  </MonoTextBold>
                </MonoTextBold>
              </YStack>

              <YStack flex={1} padding="$4" space="$4">
                {step === Steps.SIGN_IN ? (
                  <SignInForm formik={formik} />
                ) : (
                  <OtpForm
                    length={6}
                    onComplete={handleOtpComplete}
                    onBack={() => setStep(Steps.SIGN_IN)}
                    formik={formik}
                  />
                )}
                <Button
                  title={t("welcome.submit")}
                  variant="primary"
                  size="medium"
                  fullWidth={true}
                  disabled={!isValid || !values.phoneNumber}
                  onPress={() => handleSubmit()}
                  marginTop="$8"
                  paddingBottom="$6"
                />
              </YStack>
            </YStack>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LayoutContainer>
  );
}
