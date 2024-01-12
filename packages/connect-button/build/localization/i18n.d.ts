import i18n from "i18next";
export declare const locale = "en-US";
export declare const supportedLangs: readonly ["en"];
export type LangType = (typeof supportedLangs)[number];
export declare const SUPPORTED_LANGUAGUES: {
    label: string;
    value: LangType;
}[];
export declare const useLanguage: () => {
    language: string;
    changeLanguage: (lang: string) => Promise<void>;
};
export default i18n;
//# sourceMappingURL=i18n.d.ts.map