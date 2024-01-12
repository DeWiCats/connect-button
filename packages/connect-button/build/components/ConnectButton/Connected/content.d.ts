/// <reference types="react" />
interface ConnectedContentButton {
    changeWallet: () => void;
    handleClose: () => void;
    disconnect: () => Promise<void>;
    publicAddress: string;
    magicLogin: boolean;
}
export declare const ConnectedContent: ({ changeWallet, handleClose, disconnect, publicAddress, magicLogin, }: ConnectedContentButton) => import("react").JSX.Element;
export {};
//# sourceMappingURL=content.d.ts.map