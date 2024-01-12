import React, { ReactNode } from "react";
import { MagicContextValues } from "./types";
export declare const MagicContext: React.Context<MagicContextValues>;
type MagicProviderProps = {
    magicKey: string;
    solanaRpcHost: string;
    children: ReactNode;
};
export declare function MagicProvider({ solanaRpcHost, magicKey, children, }: MagicProviderProps): React.JSX.Element;
export {};
//# sourceMappingURL=provider.d.ts.map