import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { YStack } from "tamagui";
import { OrderDetails } from "../../components/orders/OrderDetails";
import { Header } from "../../components/layout/Header";
import { LayoutContainer } from "@/components";
import { useTranslation } from "react-i18next";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const orderId = parseInt(id);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <LayoutContainer>
      <YStack flex={1}>
        <Header
          title={t('orders.orderNumber', { number: orderId })}
          showBackButton
          onBackPress={() => router.back()}
        />

        <YStack flex={1}>
          <OrderDetails orderId={orderId} />
        </YStack>
      </YStack>
    </LayoutContainer>
  );
}
