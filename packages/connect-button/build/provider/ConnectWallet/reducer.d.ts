export type WalletDialogState = "logIn" | "wallets" | "connected" | "email" | "authenticationCode";
export type Action = {
    type: "SET_DIALOG_STATE";
    value: WalletDialogState;
};
declare const reducer: (state: WalletDialogState, action: Action) => WalletDialogState;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map