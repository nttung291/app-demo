import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { TamaguiProvider } from "tamagui";
import { store } from "../store";
import config from "../tamagui.config";
import { ThemeProvider } from "../context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";
import "react-native-reanimated";
import "../tamagui-web.css";
import "../utils/animation";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {({ theme }) => {
          const statusBarStyle = theme === "dark" ? "light" : "dark";

          return (
            <TamaguiProvider config={config} defaultTheme={theme}>
              <NavigationThemeProvider
                value={theme === "dark" ? DarkTheme : DefaultTheme}
              >
                <StatusBar
                  style={statusBarStyle}
                  backgroundColor="transparent"
                  translucent={true}
                />
                <SafeAreaProvider>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(drawer)" />
                    <Stack.Screen
                      name="orders/[id]"
                      options={{ animation: "slide_from_right" }}
                    />
                  </Stack>
                </SafeAreaProvider>
              </NavigationThemeProvider>
            </TamaguiProvider>
          );
        }}
      </ThemeProvider>
    </Provider>
  );
}
