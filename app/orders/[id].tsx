import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { YStack } from "tamagui";
import { OrderDetails } from "../../components/orders/OrderDetails";
import { Header } from "../../components/layout/Header";
import { LayoutContainer } from "@/components";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const orderId = parseInt(id);
  const router = useRouter();

  return (
    <LayoutContainer>
      <YStack flex={1}>
        <Header
          title={`Order #${orderId}`}
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
