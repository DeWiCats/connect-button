"use client";

import React, { ReactNode } from "react";
import { ConnectButtonProvider } from "@dewicats/connect-button";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const ProviderWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const rpcHost = process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST ?? "";

  const MAGIC_KEY = process.env.NEXT_PUBLIC_MAGIC_KEY;

  return (
    <ConnectButtonProvider wallets={[]} magicKey={"MAGIC_KEY"} solanaRpcHost={rpcHost}>
      {children}
    </ConnectButtonProvider>
  );
};

export default ProviderWrapper;
