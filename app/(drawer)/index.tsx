import React from "react";
import { YStack, Button } from "tamagui";
import { useRouter } from "expo-router";
import { useAppColors } from "@/hooks";
import { MonoText, Header, LayoutContainer } from "@/components";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useAppColors();
  const { t } = useTranslation();

  return (
    <LayoutContainer>
      <Header title={t('navigation.home')} />

      <YStack flex={1} justifyContent="center" alignItems="center" space="$4">
        <MonoText fontSize={24} fontWeight="bold" textAlign="center">
          {t('home.welcome')}
        </MonoText>
        <MonoText textAlign="center" color={colors.textSecondary}>
          {t('home.description')}
        </MonoText>
        <Button
          size="$5"
          backgroundColor={colors.primary}
          color={colors.buttonText}
          onPress={() => router.push("/orders")}
          marginTop="$4"
        >
          {t('home.viewOrders')}
        </Button>
      </YStack>
    </LayoutContainer>
  );
}
