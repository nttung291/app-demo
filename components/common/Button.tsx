import React from "react";
import {
  Button as TamaguiButton,
  Text,
  Spinner,
  styled,
  YStack,
} from "tamagui";
import { useAppColors } from "../../hooks/useAppColors";
import { TouchableOpacity } from "react-native";

export interface ButtonTextProps {
  title: string;
  variant?: "primary" | "secondary" | "danger";
  onPress?: () => void;
  disabled?: boolean;
  fontSize?: number;
  fontWeight?: "normal" | "bold" | "500" | "600" | "700" | "800" | "900";
  marginTop?: any;
  marginBottom?: any;
  marginLeft?: any;
  marginRight?: any;
  margin?: any;
}

export const ButtonText = ({
  title,
  variant = "primary",
  onPress,
  disabled = false,
  fontSize = 16,
  fontWeight = "600",
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  margin,
}: ButtonTextProps) => {
  const { colors } = useAppColors();

  // Define styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          color: colors.primary,
        };
      case "secondary":
        return {
          color: colors.textSecondary,
        };
      case "danger":
        return {
          color: colors.error,
        };
      default:
        return {
          color: colors.primary,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <YStack
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        margin={margin}
      >
        <Text
          color={variantStyles.color}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textDecorationLine="underline"
          style={{ fontFamily: "SpaceMonoBold" }}
        >
          {title}
        </Text>
      </YStack>
    </TouchableOpacity>
  );
};

export interface ButtonProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  marginTop?: any;
  marginBottom?: any;
  marginLeft?: any;
  marginRight?: any;
  margin?: any;
  padding?: any;
  paddingTop?: any;
  paddingBottom?: any;
  paddingLeft?: any;
  paddingRight?: any;
}

export const Button = ({
  title,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  onPress,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  margin,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
}: ButtonProps) => {
  const { colors } = useAppColors();

  // Define styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.primary,
          color: colors.buttonText,
          borderWidth: 0,
        };
      case "secondary":
        return {
          backgroundColor: colors.primaryLight,
          color: colors.buttonText,
          borderWidth: 0,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: colors.primary,
          borderWidth: 1,
          borderColor: colors.primary,
        };
      case "danger":
        return {
          backgroundColor: colors.error,
          color: colors.buttonText,
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: colors.primary,
          color: colors.buttonText,
          borderWidth: 0,
        };
    }
  };

  // Define styles based on size
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          height: 36,
          paddingHorizontal: "$3",
          fontSize: 14,
        };
      case "medium":
        return {
          height: 48,
          paddingHorizontal: "$4",
          fontSize: 16,
        };
      case "large":
        return {
          height: 56,
          paddingHorizontal: "$5",
          fontSize: 18,
        };
      default:
        return {
          height: 48,
          paddingHorizontal: "$4",
          fontSize: 16,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <YStack
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      margin={margin}
      padding={padding}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      width={fullWidth ? "100%" : undefined}
    >
      <TamaguiButton
        backgroundColor={variantStyles.backgroundColor}
        borderWidth={variantStyles.borderWidth}
        borderColor={variantStyles.borderColor}
        height={sizeStyles.height}
        paddingHorizontal={sizeStyles.paddingHorizontal}
        borderRadius="$4"
        opacity={disabled ? 0.6 : 1}
        disabled={disabled || loading}
        width="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        onPress={onPress}
      >
        {loading ? (
          <Spinner color={variantStyles.color} size="small" />
        ) : (
          <>
            {leftIcon && <>{leftIcon}</>}
            <Text
              color={variantStyles.color}
              fontSize={sizeStyles.fontSize}
              fontWeight="600"
              marginLeft={leftIcon ? "$2" : undefined}
              marginRight={rightIcon ? "$2" : undefined}
            >
              {title}
            </Text>
            {rightIcon && <>{rightIcon}</>}
          </>
        )}
      </TamaguiButton>
    </YStack>
  );
};
