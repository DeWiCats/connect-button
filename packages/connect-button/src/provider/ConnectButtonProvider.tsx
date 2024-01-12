"use client";

import { ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { Connection } from "@solana/web3.js";
import { MagicProvider } from "src/provider/MagicProvider/index";
import ConnectWalletProvider from "src/provider/ConnectWallet/context";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import LanguageProvider from "src/localization/LanguageProvider";
import { SolanaRPCProvider } from "./SolanaRPCProvider";

const ConnectButtonProvider = ({
  solanaRpcHost,
  magicKey,
  children,
}: {
  solanaRpcHost: string;
  magicKey: string;
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

  return (
    <LanguageProvider>
      <ConnectionProvider endpoint={connection.rpcEndpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <MagicProvider magicKey={magicKey} solanaRpcHost={solanaRpcHost}>
            <WalletDialogProvider>
              <ConnectWalletProvider>
                <SolanaRPCProvider solanaRpcHost={solanaRpcHost}>
                  {children}
                </SolanaRPCProvider>
              </ConnectWalletProvider>
            </WalletDialogProvider>
          </MagicProvider>
        </WalletProvider>
      </ConnectionProvider>
    </LanguageProvider>
  );
};

export { ConnectButtonProvider };
