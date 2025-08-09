import React from "react";
import { YStack } from "tamagui";
import { useAppColors } from "@/hooks";
import { MonoText } from "./StyledText";

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  const { colors } = useAppColors();
  
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <MonoText style={{ color: colors.textSecondary }}>
        {message}
      </MonoText>
    </YStack>
  );
};
