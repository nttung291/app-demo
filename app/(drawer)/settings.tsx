import React from "react";
import { YStack, Switch, XStack, Text, Button } from "tamagui";
import { useAppColors } from "@/hooks";
import { useTheme, useLanguage } from "@/context";
import { MonoText, Header, LayoutContainer } from "@/components";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const { colors } = useAppColors();
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isDarkMode = theme === "dark";
  const [notifications, setNotifications] = React.useState(true);

  return (
    <LayoutContainer>
      <YStack flex={1} backgroundColor={colors.background}>
        <Header title={t('navigation.settings')} />

        <YStack flex={1} padding="$4" space="$6">
          <MonoText
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            {t('settings.title')}
          </MonoText>

          <YStack space="$4">
            <XStack justifyContent="space-between" alignItems="center">
              <MonoText fontWeight="500" color={colors.text}>
                {t('settings.darkMode')}
              </MonoText>
              <Switch
                size="$3"
                checked={isDarkMode}
                onCheckedChange={() => toggleTheme()}
                backgroundColor={isDarkMode ? colors.primary : undefined}
              >
                <Switch.Thumb animation="medium" />
              </Switch>
            </XStack>

            <XStack justifyContent="space-between" alignItems="center">
              <MonoText fontWeight="500" color={colors.text}>
                {t('settings.enableNotifications')}
              </MonoText>
              <Switch
                size="$3"
                checked={notifications}
                onCheckedChange={setNotifications}
                backgroundColor={notifications ? colors.primary : undefined}
              >
                <Switch.Thumb animation="medium" />
              </Switch>
            </XStack>

            <XStack justifyContent="space-between" alignItems="center">
              <MonoText fontWeight="500" color={colors.text}>
                {t('settings.appVersion')}
              </MonoText>
              <MonoText color={colors.textSecondary}>1.0.0</MonoText>
            </XStack>

            <XStack justifyContent="space-between" alignItems="center">
              <MonoText fontWeight="500" color={colors.text}>
                {t('settings.language')}
              </MonoText>
              <LanguageSelector />
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </LayoutContainer>
  );
}
