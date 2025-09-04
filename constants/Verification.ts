import * as Yup from "yup";
import i18next from "i18next";

export const PhoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{9,12}$/, () => i18next.t("validation.phoneNumberFormat"))
    .required(() => i18next.t("validation.phoneNumberRequired")),
});