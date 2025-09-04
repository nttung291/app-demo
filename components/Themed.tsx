import React from "react";
import { Text as DefaultText, View as DefaultView } from "tamagui";

import Colors from "@/constants/Colors";
import { useColorScheme } from "../hooks/useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & React.ComponentProps<typeof DefaultText>;
export type ViewProps = ThemeProps & React.ComponentProps<typeof DefaultView>;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const textColor = otherProps.color || color;
  delete otherProps.color;

  return <DefaultText color={textColor} style={style} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const viewColor = otherProps.backgroundColor || backgroundColor;
  delete otherProps.backgroundColor;

  return (
    <DefaultView backgroundColor={viewColor} style={style} {...otherProps} />
  );
}
