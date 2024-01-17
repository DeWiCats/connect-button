import { State, Action } from "./types";

export function magicReducer(state: State, action: Action): State {
  switch (action.type) {
    case "start":
      return {
        didToken: null,
        metadata: null,
        error: null,
        magicAuthenticationStatus: "pending",
      };
    case "set-session":
      return {
        didToken: action.token,
        metadata: action.meta,
        error: null,
        magicAuthenticationStatus: "authenticated",
      };
    case "remove-session":
      return {
        didToken: null,
        metadata: null,
        error: null,
        magicAuthenticationStatus: "unauthenticated",
      };
    case "error":
      return {
        didToken: null,
        metadata: null,
        error: action.error,
        magicAuthenticationStatus: "errored",
      };
    case "login-code":
      return {
        didToken: null,
        metadata: {
          email: action.email,
          issuer: null,
          publicAddress: null,
        },
        error: null,
        magicAuthenticationStatus: "authenticationCode",
      };
    case "invalid-code":
      return {
        didToken: null,
        metadata: null,
        error: null,
        magicAuthenticationStatus: "invalid-code",
      };
    case "restart-session":
      return {
        didToken: null,
        metadata: null,
        error: null,
        magicAuthenticationStatus: "unauthenticated",
      };
    default:
      return state;
  }
}
