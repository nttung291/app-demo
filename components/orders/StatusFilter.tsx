import React from "react";
import { Select, Adapt, Sheet } from "tamagui";
import { useAppColors } from "@/hooks";
import { Check, ChevronDown } from "@tamagui/lucide-icons";

interface StatusFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  const { colors } = useAppColors();

  return (
    <Select
      value={value === null ? "all" : value}
      onValueChange={(value) => {
        onChange(value === "all" ? null : value);
      }}
    >
      <Select.Trigger
        iconAfter={ChevronDown}
        backgroundColor={colors.inputBackground}
        borderRadius="$4"
        paddingVertical="$2"
        paddingHorizontal="$3"
        borderWidth={1}
        borderColor={colors.cardBorder}
      >
        <Select.Value placeholder="Select status" color={colors.text} />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        />

        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Item index={0} value="all">
              <Select.ItemText color={colors.text}>All</Select.ItemText>
              <Select.ItemIndicator marginLeft="auto">
                <Check size={16} color={colors.primary} />
              </Select.ItemIndicator>
            </Select.Item>

            <Select.Item index={1} value="pending">
              <Select.ItemText color={colors.text}>Pending</Select.ItemText>
              <Select.ItemIndicator marginLeft="auto">
                <Check size={16} color={colors.primary} />
              </Select.ItemIndicator>
            </Select.Item>

            <Select.Item index={2} value="shipped">
              <Select.ItemText color={colors.text}>Shipped</Select.ItemText>
              <Select.ItemIndicator marginLeft="auto">
                <Check size={16} color={colors.primary} />
              </Select.ItemIndicator>
            </Select.Item>

            <Select.Item index={3} value="delivered">
              <Select.ItemText color={colors.text}>Delivered</Select.ItemText>
              <Select.ItemIndicator marginLeft="auto">
                <Check size={16} color={colors.primary} />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        />
      </Select.Content>
    </Select>
  );
};
