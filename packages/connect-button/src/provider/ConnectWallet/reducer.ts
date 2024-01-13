export type WalletDialogState =
  | "logIn"
  | "wallets"
  | "connected"
  | "email"
  | "authenticationCode";

export type Action = { type: "SET_DIALOG_STATE"; value: WalletDialogState };

const reducer = (
  state: WalletDialogState,
  action: Action
): WalletDialogState => {
  switch (action.type) {
    case "SET_DIALOG_STATE":
      return action.value;
    default:
      return state;
  }
};

export default reducer;
