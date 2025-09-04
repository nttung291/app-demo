import { IconFlag } from "@/assets/icons";
import { t } from "i18next";
import { XStack } from "tamagui";
import { MonoText } from "../common/StyledText";
import { useAppColors } from "@/hooks";
import { Input } from "../common/Input";
import { FormikProps } from "formik";

export const SignInForm = ({ formik }: { formik: FormikProps<any> }) => {
  const { colors } = useAppColors();
  const { values, handleChange, handleBlur, touched, errors } = formik;
  return (
    <XStack flex={1} space="$2" width="100%" paddingTop="$6">
      <XStack
        width={80}
        height={46}
        borderRadius={"$4"}
        space="$2"
        alignItems="center"
        justifyContent="center"
        backgroundColor={colors.borderColor}
      >
        <IconFlag />
        <MonoText color={colors.textSecondary}>+84</MonoText>
      </XStack>
      <XStack flex={1}>
        <Input
          containerProps={{ width: "100%" }}
          placeholder={t("welcome.phoneNumberPlaceholder")}
          value={values.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          onBlur={handleBlur("phoneNumber")}
          error={
            touched.phoneNumber && errors.phoneNumber
              ? String(errors.phoneNumber)
              : undefined
          }
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </XStack>
    </XStack>
  );
};
