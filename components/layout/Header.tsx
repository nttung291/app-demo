import React from "react";
import { XStack, Button, useMedia, isWeb } from "tamagui";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Menu, ChevronLeft } from "@tamagui/lucide-icons";
import { useAppColors } from "../../hooks/useAppColors";
import { MonoText } from "../common/StyledText";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export function Header({
  title,
  showBackButton = false,
  onBackPress,
}: HeaderProps) {
  const navigation = useNavigation();
  const media = useMedia();
  const { colors } = useAppColors();

  return (
    <XStack
      backgroundColor={colors.headerBackground}
      paddingVertical={isWeb ? "$4" : "$2"}
      paddingHorizontal="$4"
      alignItems="center"
    >
      {showBackButton ? (
        <Button
          size="$3"
          circular
          icon={<ChevronLeft size={24} color={colors.headerText} />}
          onPress={onBackPress}
          backgroundColor="transparent"
          marginRight="$2"
        />
      ) : (
        !media.gtSm && (
          <Button
            size="$3"
            circular
            icon={<Menu size={24} color={colors.headerText} />}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            backgroundColor="transparent"
            marginRight="$2"
          />
        )
      )}
      <MonoText color={colors.headerText} fontSize={20} fontWeight="bold">
        {title}
      </MonoText>
    </XStack>
  );
}
