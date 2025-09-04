import React, { useState } from "react";
import {
  Input as TamaguiInput,
  Text,
  ViewProps,
  YStack,
  getTokens,
} from "tamagui";
import { useAppColors } from "../../hooks/useAppColors";
import { FieldInputProps, FormikErrors, FormikTouched } from "formik";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: any) => void;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  autoCorrect?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  // Formik specific props
  field?: FieldInputProps<any>;
  touched?: FormikTouched<any>;
  errors?: FormikErrors<any>;
  name?: string;
  containerProps?: ViewProps;
}

export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur: externalOnBlur,
  error,
  secureTextEntry = false,
  autoCapitalize = "none",
  keyboardType = "default",
  autoCorrect = false,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  // Formik props
  field,
  touched,
  errors,
  name,
  containerProps = {},
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useAppColors();
  const tokens = getTokens();

  // Handle Formik integration
  const inputValue = field ? field.value : value;
  const handleChangeText = field ? field.onChange(field.name) : onChangeText;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (field) field.onBlur(field.name);
    if (externalOnBlur) externalOnBlur(e);
  };

  const getBorderColor = () => {
    // Check for Formik errors first
    if (name && touched && errors && touched[name] && errors[name]) {
      return colors.error;
    }
    // Then check for direct error prop
    if (error) return colors.error;
    if (isFocused) return colors.primary;
    return colors.borderColor;
  };

  // Get error message from either direct prop or Formik
  const errorMessage =
    name && touched && errors && touched[name] && errors[name]
      ? errors[name]?.toString()
      : error;

  return (
    <YStack space="$2" {...containerProps}>
      {label && (
        <Text color={colors.textSecondary} fontSize={14} fontWeight="500">
          {label}
        </Text>
      )}
      <TamaguiInput
        value={inputValue}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        disabled={disabled}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : undefined}
        maxLength={maxLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
        borderColor={getBorderColor()}
        borderWidth={1}
        borderRadius="$4"
        padding="$3"
        fontSize={16}
        backgroundColor={colors.inputBackground}
        color={colors.text}
        placeholderTextColor={colors.textTertiary}
        opacity={disabled ? 0.6 : 1}
        height={multiline ? undefined : 48}
        minHeight={multiline ? 80 : undefined}
        textAlignVertical={multiline ? "top" : "center"}
        style={{ fontFamily: "SpaceMono" }}
      />
      {errorMessage && (
        <Text color={colors.error} fontSize={12}>
          {errorMessage}
        </Text>
      )}
    </YStack>
  );
};
