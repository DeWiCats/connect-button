"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLanguage = exports.SUPPORTED_LANGUAGUES = exports.supportedLangs = exports.locale = void 0;
const i18next_1 = __importDefault(require("i18next"));
const react_i18next_1 = require("react-i18next");
const react_1 = require("react");
const react_async_hook_1 = require("react-async-hook");
const en_1 = __importDefault(require("./locales/en"));
const lang = "en";
exports.locale = "en-US";
exports.supportedLangs = [
    "en",
    // 'zh',
    // 'ja'
    // 'ko',
];
exports.SUPPORTED_LANGUAGUES = [
    { label: "English", value: "en" },
    // { label: '中文', value: 'zh' }, // chinese
    // { label: '日本人', value: 'ja' }, // japanese
    // { label: '한국어', value: 'ko' }, // korean
];
void i18next_1.default.use(react_i18next_1.initReactI18next).init({
    resources: {
        en: { translation: en_1.default },
    },
    lng: lang,
    fallbackLng: ["en"],
});
const useLanguage = () => {
    const [language, setLanguage] = (0, react_1.useState)("en");
    (0, react_async_hook_1.useAsync)(async () => {
        await initLanguage();
    }, []);
    const changeLanguage = (0, react_1.useCallback)(async (lang) => {
        setLanguage(lang);
        await i18next_1.default.changeLanguage(lang);
    }, []);
    const initLanguage = (0, react_1.useCallback)(async () => {
        if (lang) {
            await changeLanguage(lang);
        }
        setLanguage(lang);
    }, [changeLanguage]);
    return { language, changeLanguage };
};
exports.useLanguage = useLanguage;
exports.default = i18next_1.default;
//# sourceMappingURL=i18n.js.map