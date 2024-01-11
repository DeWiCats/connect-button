import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useCallback, useState } from "react";
import { useAsync } from "react-async-hook";
import en from "./locales/en";

const lang = "en";

export const locale = "en-US";

export const supportedLangs = [
  "en",
  // 'zh',
  // 'ja'
  // 'ko',
] as const;

export type LangType = (typeof supportedLangs)[number];

export const SUPPORTED_LANGUAGUES = [
  { label: "English", value: "en" },
  // { label: '中文', value: 'zh' }, // chinese
  // { label: '日本人', value: 'ja' }, // japanese
  // { label: '한국어', value: 'ko' }, // korean
] as { label: string; value: LangType }[];

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: lang,
  fallbackLng: ["en"],
});

export const useLanguage = () => {
  const [language, setLanguage] = useState("en");

  useAsync(async () => {
    await initLanguage();
  }, []);

  const changeLanguage = useCallback(async (lang: string) => {
    setLanguage(lang);
    await i18n.changeLanguage(lang);
  }, []);

  const initLanguage = useCallback(async () => {
    if (lang) {
      await changeLanguage(lang);
    }
    setLanguage(lang);
  }, [changeLanguage]);

  return { language, changeLanguage };
};

export default i18n;
