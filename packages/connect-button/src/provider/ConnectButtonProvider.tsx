import { ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import SolanaRPCProvider from "./SolanaProvider/SolanaRPCProvider";
import { MagicProvider } from "./MagicProvider";
import ConnectWalletProvider from "./ConnectWallet/context";
import LanguageProvider from "../localization/LanguageProvider";
import { Adapter } from "@solana/wallet-adapter-base";
<<<<<<< Updated upstream
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const defaultWallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];
=======
>>>>>>> Stashed changes

const ConnectButtonProvider = ({
  solanaRpcHost,
  magicKey,
  wallets = defaultWallets,
  children,
  wallets = [],
}: {
  solanaRpcHost: string;
  magicKey?: string;
  wallets?: Adapter[];
  children: ReactNode;
  wallets: Adapter[];
}) => {
  const connection = useMemo(
    () => new Connection(solanaRpcHost, { commitment: "confirmed" }),
    [solanaRpcHost]
  );

  const renderChildrenProviders = () => {
    return (
      <ConnectWalletProvider>
        <SolanaRPCProvider solanaRpcHost={solanaRpcHost}>
          {children}
        </SolanaRPCProvider>
      </ConnectWalletProvider>
    );
  };

  return (
    <LanguageProvider>
      <ConnectionProvider endpoint={connection.rpcEndpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          {magicKey ? (
            <MagicProvider magicKey={magicKey} solanaRpcHost={solanaRpcHost}>
              {renderChildrenProviders()}
            </MagicProvider>
          ) : (
            renderChildrenProviders()
          )}
        </WalletProvider>
      </ConnectionProvider>
    </LanguageProvider>
  );
};

export default ConnectButtonProvider;
