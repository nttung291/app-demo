import React from "react";
import { YStack, Spinner } from "tamagui";

interface LoadingProps {
  size?: "small" | "large";
}

export const Loading = ({ size = "large" }: LoadingProps) => {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Spinner size={size} />
    </YStack>
  );
};
