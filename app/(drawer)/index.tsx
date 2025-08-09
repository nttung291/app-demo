import React from "react";
import { YStack, Button } from "tamagui";
import { useRouter } from "expo-router";
import { useAppColors } from "@/hooks";
import { MonoText, Header, LayoutContainer } from "@/components";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useAppColors();

  return (
    <LayoutContainer>
      <Header title="Home" />

      <YStack flex={1} justifyContent="center" alignItems="center" space="$4">
        <MonoText fontSize={24} fontWeight="bold" textAlign="center">
          Welcome to Order Viewer
        </MonoText>
        <MonoText textAlign="center" color={colors.textSecondary}>
          A responsive application for managing orders across web, iOS, and
          Android
        </MonoText>
        <Button
          size="$5"
          backgroundColor={colors.primary}
          color={colors.buttonText}
          onPress={() => router.push("/orders")}
          marginTop="$4"
        >
          View Orders
        </Button>
      </YStack>
    </LayoutContainer>
  );
}
