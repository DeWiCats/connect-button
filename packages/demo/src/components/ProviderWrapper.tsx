"use client";

import React, { ReactNode } from "react";
import { ConnectButtonProvider } from "@dewicats/connect-button";

const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  const rpcHost = process.env.NEXT_PUBLIC_REACT_APP_SOLANA_RPC_HOST ?? "";

  const MAGIC_KEY = process.env.NEXT_PUBLIC_MAGIC_KEY;

  return (
    <ConnectButtonProvider magicKey={'MAGIC_KEY'} solanaRpcHost={rpcHost}>
      {children}
    </ConnectButtonProvider>
  );
};

export default ProviderWrapper;
