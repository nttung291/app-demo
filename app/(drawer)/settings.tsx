import React from "react";
import { YStack, Switch, XStack } from "tamagui";
import { useAppColors } from "@/hooks";
import { useTheme } from "@/context";
import { MonoText, Header, LayoutContainer } from "@/components";

export default function SettingsScreen() {
  const { colors } = useAppColors();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [notifications, setNotifications] = React.useState(true);

  return (
    <LayoutContainer>
      <YStack flex={1} backgroundColor={colors.background}>
        <Header title="Settings" />

        <YStack flex={1} padding="$4" space="$6">
          <MonoText
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            Application Settings
          </MonoText>

          <YStack space="$4">
            <XStack justifyContent="space-between" alignItems="center">
              <MonoText fontWeight="500" color={colors.text}>
                Dark Mode
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
                Enable Notifications
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
                App Version
              </MonoText>
              <MonoText color={colors.textSecondary}>1.0.0</MonoText>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </LayoutContainer>
  );
}
