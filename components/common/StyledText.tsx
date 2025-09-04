import { Text, TextProps } from "../Themed";

export function MonoText(props: TextProps) {
  const mergedStyle =
    typeof props.style === "object"
      ? { fontFamily: "SpaceMono", ...props.style }
      : { fontFamily: "SpaceMono" };

  return <Text {...props} style={mergedStyle} />;
}

export function MonoTextBold(props: TextProps) {
  const mergedStyle =
    typeof props.style === "object"
      ? { fontFamily: "SpaceMonoBold", ...props.style }
      : { fontFamily: "SpaceMonoBold" };

  return <Text style={mergedStyle} {...props} />;
}

export function MonoTextItalic(props: TextProps) {
  const mergedStyle =
    typeof props.style === "object"
      ? { fontFamily: "SpaceMonoItalic", ...props.style }
      : { fontFamily: "SpaceMonoItalic" };

  return <Text {...props} style={mergedStyle} />;
}

export function MonoTextBoldItalic(props: TextProps) {
  const mergedStyle =
    typeof props.style === "object"
      ? {
          fontFamily: "SpaceMonoBoldItalic",
          ...props.style,
        }
      : { fontFamily: "SpaceMonoBoldItalic" };

  return <Text {...props} style={mergedStyle} />;
}
