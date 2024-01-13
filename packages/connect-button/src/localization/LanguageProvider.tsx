import React, { createContext, ReactNode } from "react";
import { useLanguage } from "./i18n";

const initialState = {
  language: "en",
  changeLanguage: async (): Promise<void> => {},
};

const LanguageContext =
  createContext<ReturnType<typeof useLanguage>>(initialState);
const { Provider } = LanguageContext;

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={useLanguage()}>{children}</Provider>;
};

export default LanguageProvider;
