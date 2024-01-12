"use client";

import React, { createContext, useReducer, ReactNode, useMemo } from "react";
import reducer, { WalletDialogState } from "./reducer";

interface DialogContextProps {
  walletDialogState: WalletDialogState | undefined;
  updateWalletDialogState: (state: WalletDialogState) => void;
}

export const ConnectWalletContext = createContext<DialogContextProps>({
  walletDialogState: undefined,
  updateWalletDialogState: (_: WalletDialogState) => {},
});

const ConnectWalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletDialogState, dispatch] = useReducer(reducer, "logIn");

  const updateWalletDialogState = (state: WalletDialogState) => {
    dispatch({ type: "SET_DIALOG_STATE", value: state });
  };

  const value = useMemo(
    () => ({ walletDialogState, updateWalletDialogState }),
    [walletDialogState]
  );

  return (
    <ConnectWalletContext.Provider value={value}>
      {children}
    </ConnectWalletContext.Provider>
  );
};

export default ConnectWalletProvider;
