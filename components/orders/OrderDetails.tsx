import React from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { YStack, XStack, Card } from "tamagui";
import { useAppColors } from "@/hooks";
import { MonoText } from "../common/StyledText";
import { Loading } from "../common/Loading";
import { Error } from "../common/Error";
import { useGetOrderById } from "@/services/ordersQueries";
import { useOrdersStore } from "@/store/ordersStore";

interface OrderDetailsProps {
  orderId: number;
}

export const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const { colors } = useAppColors();
  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useGetOrderById(orderId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Error
        message={"Failed to fetch order details"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!order) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <MonoText>Order not found</MonoText>
      </YStack>
    );
  }

  return (
    <YStack flex={1} padding="$4">
      <XStack alignItems="center" marginBottom="$4">
        <MonoText style={styles.headerText}>Order #{order.id} Details</MonoText>
      </XStack>

      <Card
        padding="$4"
        marginBottom="$4"
        backgroundColor={colors.card}
        borderColor={colors.cardBorder}
      >
        <YStack space="$2">
          <XStack justifyContent="space-between">
            <MonoText fontWeight="bold">Customer ID:</MonoText>
            <MonoText>{order.customer_id}</MonoText>
          </XStack>
          <XStack justifyContent="space-between">
            <MonoText fontWeight="bold">Order Date:</MonoText>
            <MonoText>{order.order_date}</MonoText>
          </XStack>
          <XStack justifyContent="space-between">
            <MonoText fontWeight="bold">Status:</MonoText>
            <MonoText
              style={{
                ...styles.statusBadge,
                backgroundColor:
                  order.status === "pending"
                    ? "#F59E0B"
                    : order.status === "shipped"
                    ? colors.primary
                    : colors.success,
                color: colors.buttonText,
              }}
            >
              {order.status.toUpperCase()}
            </MonoText>
          </XStack>
        </YStack>
      </Card>

      <MonoText style={styles.sectionTitle}>Order Lines</MonoText>

      {!order.lines || order.lines.length === 0 ? (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <MonoText style={styles.emptyMessage}>No order lines found</MonoText>
        </YStack>
      ) : (
        <FlatList
          data={order.lines}
          keyExtractor={(item, index) => `${item.product_id}-${index}`}
          renderItem={({ item }) => (
            <Card marginBottom="$3" padding="$4" bordered>
              <YStack>
                <XStack justifyContent="space-between" marginBottom="$2">
                  <MonoText fontWeight="bold">
                    Product ID: {item.product_id}
                  </MonoText>
                </XStack>
                <XStack justifyContent="space-between">
                  <MonoText>Quantity: {item.quantity}</MonoText>
                  <MonoText fontWeight="bold">
                    ${item.unit_price.toFixed(2)}
                  </MonoText>
                </XStack>
                <XStack justifyContent="flex-end" marginTop="$2">
                  <MonoText fontWeight="bold">
                    Total: ${(item.quantity * item.unit_price).toFixed(2)}
                  </MonoText>
                </XStack>
              </YStack>
            </Card>
          )}
          contentContainerStyle={
            Platform.OS === "web"
              ? styles.webContentContainer
              : styles.mobileContentContainer
          }
        />
      )}
    </YStack>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyMessage: {
    color: "$gray11",
  },
  statusBadge: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  mobileContentContainer: {
    paddingBottom: 80,
  },
  webContentContainer: {
    paddingBottom: 80,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
});
