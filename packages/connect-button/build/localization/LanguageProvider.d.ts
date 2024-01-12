import React, { ReactNode } from "react";
declare const LanguageProvider: ({ children }: {
    children: ReactNode;
}) => React.JSX.Element;
export declare const useLanguageStorage: () => {
    language: string;
    changeLanguage: (lang: string) => Promise<void>;
};
export default LanguageProvider;
//# sourceMappingURL=LanguageProvider.d.ts.map