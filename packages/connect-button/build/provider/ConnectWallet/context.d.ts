import React, { ReactNode } from "react";
import { WalletDialogState } from "./reducer";
interface DialogContextProps {
    walletDialogState: WalletDialogState | undefined;
    updateWalletDialogState: (state: WalletDialogState) => void;
}
export declare const ConnectWalletContext: React.Context<DialogContextProps>;
declare const ConnectWalletProvider: ({ children }: {
    children: ReactNode;
}) => React.JSX.Element;
export default ConnectWalletProvider;
//# sourceMappingURL=context.d.ts.map