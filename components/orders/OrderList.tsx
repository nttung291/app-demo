import React, { useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { YStack, XStack, Card, Input } from "tamagui";
import { useAppColors, useThrottle } from "@/hooks";
import { useGetOrdersQuery } from "@/services";
import { MonoText } from "../common/StyledText";
import { Loading } from "../common/Loading";
import { Error } from "../common/Error";
import { EmptyState } from "../common/EmptyState";
import { Search } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { View } from "../Themed";
import { StatusFilter } from "./StatusFilter";
import { Order } from "@/types";

interface OrderItemProps {
  item: Order;
  onPress: (id: number) => void;
  colors: any;
}

const OrderItem = ({ item, onPress, colors }: OrderItemProps) => {
  return (
    <Card
      marginBottom="$3"
      padding="$4"
      bordered
      elevate
      animation={"bouncy" as any}
      pressStyle={{ scale: 0.98 }}
      onPress={() => onPress(item.id)}
      backgroundColor={colors.card}
      borderColor={colors.cardBorder}
    >
      <YStack>
        <XStack justifyContent="space-between" marginBottom="$2">
          <MonoText style={styles.orderTitle}>Order #{item.id}</MonoText>
          <View
            style={{
              ...styles.statusBadge,
              backgroundColor:
                item.status === "pending"
                  ? "#F59E0B"
                  : item.status === "shipped"
                  ? colors.primary
                  : colors.success,
              color: colors.buttonText,
            }}
          >
            <MonoText fontSize={12}>{item.status.toUpperCase()}</MonoText>
          </View>
        </XStack>
        <MonoText style={{ ...styles.customerIdText, color: colors.text }}>
          Customer ID: {item.customer_id}
        </MonoText>
        <MonoText style={{ ...styles.dateText, color: colors.textSecondary }}>
          Date: {item.order_date}
        </MonoText>
      </YStack>
    </Card>
  );
};

export const OrderList = () => {
  const router = useRouter();
  const { colors } = useAppColors();
  const [searchTerm, setSearchTerm] = useState("");
  const throttledSearchTerm = useThrottle(searchTerm, 300);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useGetOrdersQuery();

  const filteredOrders = useMemo(() => {
    const filterOrders = orders.filter((order: Order) => {
      const searchLower = throttledSearchTerm.toLowerCase();
      const matchesSearch =
        throttledSearchTerm === "" ||
        order.customer_id.toString().includes(searchLower);
      const matchesStatusFilter =
        statusFilter === null || order.status === statusFilter;
      return matchesSearch && matchesStatusFilter;
    });
    return filterOrders;
  }, [orders, statusFilter, throttledSearchTerm]);

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  const handleStatusChange = (value: string | null) => {
    setStatusFilter(value);
  };

  const handleOrderPress = (orderId: number) => {
    router.push(`/orders/${orderId}`);
  };

  if (isLoading && orders.length === 0) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Error
        message={
          "Failed to fetch orders. Make sure json-server is running with 'yarn api'"
        }
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <YStack flex={1} padding="$4">
      <XStack
        alignItems="center"
        backgroundColor={colors.inputBackground}
        borderRadius="$4"
        padding="$2"
        marginBottom="$4"
        paddingLeft="$4"
        paddingRight="$4"
      >
        <Search size={20} color={colors.textSecondary} />
        <Input
          flex={1}
          marginLeft="$2"
          placeholder="Search by customer ID..."
          value={searchTerm}
          onChangeText={handleSearchChange}
          backgroundColor="transparent"
          borderWidth={0}
          color={colors.text}
          placeholderTextColor={colors.textSecondary}
        />
      </XStack>

      <XStack alignItems="center" justifyContent="flex-end" marginBottom="$4">
        <MonoText style={styles.filterLabel}>Filter by status</MonoText>
        <XStack width="50%" maxWidth={200}>
          <StatusFilter value={statusFilter} onChange={handleStatusChange} />
        </XStack>
      </XStack>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <EmptyState message="No orders found" />}
        renderItem={({ item }) => (
          <OrderItem item={item} onPress={handleOrderPress} colors={colors} />
        )}
        contentContainerStyle={
          Platform.OS === "web"
            ? styles.webContentContainer
            : styles.mobileContentContainer
        }
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  filterLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 16,
  },
  orderTitle: {
    fontWeight: "bold",
  },
  statusBadge: {
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },
  customerIdText: {
    marginBottom: 4,
  },
  dateText: {},
  mobileContentContainer: {
    paddingBottom: 24,
  },
  webContentContainer: {
    paddingBottom: 80,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
});
