import React from "react";
import { Sheet, Button, YStack, XStack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { useAppColors } from "@/hooks";
import { useRouter } from "expo-router";
import { MonoText } from "../common/StyledText";

interface ActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActionSheet({ open, onOpenChange }: ActionSheetProps) {
  const { colors } = useAppColors();

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[50]}
      position={0}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Frame padding="$4">
        <Sheet.Handle />
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginBottom="$4"
        >
          <MonoText style={{ fontSize: 18, fontWeight: "bold" }}>
            Quick Actions
          </MonoText>
          <Button
            size="$3"
            circular
            icon={<X size={16} color={colors.text} />}
            onPress={() => onOpenChange(false)}
            backgroundColor="transparent"
          />
        </XStack>
        <YStack space="$4">
          <Button variant="outlined" onPress={() => onOpenChange(false)}>
            <MonoText style={{ fontFamily: "SpaceMono" }}>
              View Recent Orders
            </MonoText>
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
