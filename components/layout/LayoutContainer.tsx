import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppColors } from "@/hooks/useAppColors";

type LayoutContainerProps = {
  children: React.ReactNode;
};

export function LayoutContainer({ children }: LayoutContainerProps) {
  const { colors } = useAppColors();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.headerBackground }]}
      edges={["top", "left", "right"]}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
