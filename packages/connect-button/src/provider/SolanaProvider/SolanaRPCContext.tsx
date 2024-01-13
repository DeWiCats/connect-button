import { createContext } from "react";

const SolanaRPCContext = createContext<string | null>(null);

export default SolanaRPCContext;