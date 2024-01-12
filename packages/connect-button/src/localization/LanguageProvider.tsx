"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useLanguage } from "./i18n";

const initialState = {
  language: "en",
  changeLanguage: async (): Promise<undefined> => undefined,
};

const LanguageContext =
  createContext<ReturnType<typeof useLanguage>>(initialState);
const { Provider } = LanguageContext;

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={useLanguage()}>{children}</Provider>;
};

export const useLanguageStorage = () => useContext(LanguageContext);

export default LanguageProvider;
