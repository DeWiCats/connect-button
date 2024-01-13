import { useContext } from "react";
import SolanaRPCContext from "./SolanaRPCContext";

const useSolanaRPC = () => {
  return useContext(SolanaRPCContext);
};

export default useSolanaRPC;