import { useAppColors } from "@/hooks/useAppColors";
import { Text, TextProps } from "../Themed";

export function MonoText(props: TextProps) {
  // Merge styles properly for web compatibility
  const { colors } = useAppColors();
  const mergedStyle =
    typeof props.style === "object"
      ? { ...props.style, fontFamily: "SpaceMono", color: colors.text }
      : { fontFamily: "SpaceMono", color: colors.text };

  return <Text {...props} style={mergedStyle} />;
}
