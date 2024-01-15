import { ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { Connection } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import SolanaRPCProvider from "./SolanaProvider/SolanaRPCProvider";
import { MagicProvider } from "./MagicProvider";
import ConnectWalletProvider from "./ConnectWallet/context";
import LanguageProvider from "../localization/LanguageProvider";

const ConnectButtonProvider = ({
  solanaRpcHost,
  magicKey,
  children,
}: {
  solanaRpcHost: string;
  magicKey?: string;
  children: ReactNode;
}) => {
  const connection = useMemo(
    () => new Connection(solanaRpcHost, { commitment: "confirmed" }),
    [solanaRpcHost]
  );

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  const renderChildrenProviders = () => {
    return (
      <WalletDialogProvider>
        <ConnectWalletProvider>
          <SolanaRPCProvider solanaRpcHost={solanaRpcHost}>
            {children}
          </SolanaRPCProvider>
        </ConnectWalletProvider>
      </WalletDialogProvider>
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
