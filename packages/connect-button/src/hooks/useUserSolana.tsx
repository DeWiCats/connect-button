import useSolana from "./useSolana";

const useUserSolana = () => {
  const {
    publicKey,
    connecting,
    connected,
    magicAuthenticationStatus,
    magic,
    anchorProvider,
    autoConnect,
    wallet,
    disconnecting,
    select,
    connect,
    disconnect,
    signAllTransactions,
    signMessage,
    signIn,
    sendTransaction,
  } = useSolana();
  return {
    publicKey,
    connecting,
    connected,
    magicAuthenticationStatus,
    magic,
    anchorProvider,
    autoConnect,
    wallet,
    disconnecting,
    select,
    connect,
    disconnect,
    signAllTransactions,
    signMessage,
    signIn,
    sendTransaction,
  };
};

export default useUserSolana;
