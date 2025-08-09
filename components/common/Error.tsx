import React from "react";
import { YStack, Button } from "tamagui";
import { useAppColors } from "@/hooks";
import { MonoText } from "./StyledText";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export const Error = ({ message, onRetry }: ErrorProps) => {
  const { colors } = useAppColors();
  
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
      <MonoText color={colors.error} fontSize={16}>
        Error: {message}
      </MonoText>
      {onRetry && (
        <Button
          marginTop="$4"
          backgroundColor={colors.primary}
          color={colors.buttonText}
          onPress={onRetry}
        >
          <MonoText style={{ color: colors.buttonText }}>Retry</MonoText>
        </Button>
      )}
    </YStack>
  );
};
