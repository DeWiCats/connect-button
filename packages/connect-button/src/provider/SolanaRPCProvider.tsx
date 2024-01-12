import React, { ReactNode, createContext, useContext } from "react";

const SolanaRPCContext = createContext(null);

export const SolanaRPCProvider = ({
  solanaRpcHost,
  children,
}: {
  solanaRpcHost: string;
  children: ReactNode;
}) => {
  return (
    <SolanaRPCContext.Provider value={solanaRpcHost as any}>
      {children}
    </SolanaRPCContext.Provider>
  );
};

export const useSolanaRPC = () => {
  return useContext(SolanaRPCContext);
};
