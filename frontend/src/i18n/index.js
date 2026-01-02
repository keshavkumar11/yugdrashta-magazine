import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import gu from "./locales/gu/translation.json";
import en from "./locales/en/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      gu: { translation: gu },
      en: { translation: en }
    },
    lng: "gu",            // 👈 Gujarati default
    fallbackLng: "gu",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
