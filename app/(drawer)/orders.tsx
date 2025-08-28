import React, { useState } from "react";
import { YStack, Button } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { OrderList, Header, ActionSheet, LayoutContainer } from "@/components";
import { useAppColors } from "@/hooks";
import { useTranslation } from "react-i18next";

export default function OrdersScreen() {
  const { colors } = useAppColors();
  const { t } = useTranslation();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <LayoutContainer>
      <YStack flex={1} backgroundColor={colors.background}>
        <Header title={t('navigation.orders')} />

        <YStack flex={1} position="relative">
          <OrderList />

          <Button
            size="$5"
            circular
            icon={<Plus size={24} color={colors.buttonText} />}
            position="absolute"
            right="$4"
            bottom="$4"
            backgroundColor={colors.primary}
            onPress={() => setSheetOpen(true)}
            shadowColor={colors.buttonText}
            shadowOffset={{ width: 2, height: 2 }}
            shadowOpacity={0.3}
            shadowRadius={5}
            elevation={5}
          />

          <ActionSheet open={sheetOpen} onOpenChange={setSheetOpen} />
        </YStack>
      </YStack>
    </LayoutContainer>
  );
}
