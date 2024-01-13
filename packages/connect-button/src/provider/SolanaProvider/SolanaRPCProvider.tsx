import React, { ReactNode } from "react";
import SolanaRPCContext from "./SolanaRPCContext";


const SolanaRPCProvider = ({
  solanaRpcHost,
  children,
}: {
  solanaRpcHost: string;
  children: ReactNode;
}) => {
  return (
    <SolanaRPCContext.Provider value={solanaRpcHost}>
      {children}
    </SolanaRPCContext.Provider>
  );
};

export default SolanaRPCProvider;
