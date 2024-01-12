import { WalletContextState } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Metaplex } from "@metaplex-foundation/js";
import { Umi } from "@metaplex-foundation/umi";
import { MagicContextValues } from "src/provider/MagicProvider/index";
type SolanaWalletData = MagicContextValues & Omit<WalletContextState, "connect" | "connecting" | "disconnect"> & {
    publicAddress: string;
    connecting: boolean;
    connected: boolean;
    connect: ({ walletName, email, }: {
        walletName?: WalletName<string>;
        email?: string;
    }) => void;
    disconnect: () => Promise<void>;
    anchorProvider: AnchorProvider;
    umi: Umi;
    metaplex: Metaplex;
};
declare const useSolana: () => SolanaWalletData;
export default useSolana;
//# sourceMappingURL=useSolana.d.ts.map