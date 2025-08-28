import { Drawer } from "expo-router/drawer";
import { Platform } from "react-native";
import { Home, ShoppingCart, Settings } from "@tamagui/lucide-icons";
import { YStack, isWeb, useMedia } from "tamagui";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppColors } from "../../hooks/useAppColors";
import { MonoText } from "@/components";
import { useTranslation } from "react-i18next";

function CustomDrawerContent(props: any) {
  const insets = useSafeAreaInsets();
  const { colors } = useAppColors();
  const { t } = useTranslation();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        paddingTop: isWeb ? "$4" : insets.top,
        backgroundColor: colors.drawerBackground,
      }}
    >
      <YStack padding="$4" marginBottom="$4">
        <MonoText
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {t('app.title')}
        </MonoText>
      </YStack>

      <DrawerItemList {...props} />

      <YStack
        position="absolute"
        bottom={insets.bottom + 20}
        left={0}
        right={0}
        padding="$4"
      >
        <MonoText fontSize={12} textAlign="center" color={colors.textSecondary}>
          {t('app.version', { version: '1.0.0' })}
        </MonoText>
      </YStack>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const isWeb = Platform.OS === "web";
  const media = useMedia();
  const { colors } = useAppColors();
  const { t } = useTranslation();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.drawerBackground,
          width: isWeb ? 280 : "70%",
          borderRightWidth: 0,
        },
        overlayColor: "transparent",
        drawerType: media.gtSm ? "permanent" : "front",
        drawerPosition: "left",
        drawerActiveTintColor: colors.drawerActiveText,
        drawerInactiveTintColor: colors.drawerInactiveText,
        swipeEnabled: !media.gtSm,
        drawerStatusBarAnimation: "slide",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: t('navigation.home'),
          drawerIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="orders"
        options={{
          title: t('navigation.orders'),
          drawerIcon: ({ color }) => <ShoppingCart size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: t('navigation.settings'),
          drawerIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Drawer>
  );
}
