"use client";

import React, { ReactNode } from "react";
import { ConnectButtonProvider } from "@dewicats/connect-button";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Adapter } from "@solana/wallet-adapter-base";

const defaultWallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

const ProviderWrapper = ({
  wallets = defaultWallets,
  children,
}: {
  wallets?: Adapter[];
  children: ReactNode;
}) => {
  const rpcHost = process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST ?? "";

  const MAGIC_KEY = process.env.NEXT_PUBLIC_MAGIC_KEY;

  return (
    <ConnectButtonProvider wallets={wallets} magicKey={"MAGIC_KEY"} solanaRpcHost={rpcHost}>
      {children}
    </ConnectButtonProvider>
  );
};

export default ProviderWrapper;
