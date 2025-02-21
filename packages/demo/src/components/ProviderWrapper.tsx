"use client";

import React, { ReactNode } from "react";
import { ConnectButtonProvider } from "@dewicats/connect-button";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter";

const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  const rpcHost = process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST ?? "";

  const MAGIC_KEY = process.env.NEXT_PUBLIC_MAGIC_KEY;

  return (
    <ConnectButtonProvider
      wallets={[
        new TipLinkWalletAdapter({
          title: "Name of Dapp",
          clientId: "9d4a9ae4-e96c-451b-93a6-25d7d90bfd5f",
          theme: "dark", // pick between "dark"/"light"/"system"
        }),
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
      ]}
      magicKey={"MAGIC_KEY"}
      solanaRpcHost={rpcHost}
    >
      {children}
    </ConnectButtonProvider>
  );
};

export default ProviderWrapper;
