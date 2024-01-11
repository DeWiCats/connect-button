"use client";

import { State, Action } from "./types";

export function magicReducer(state: State, action: Action): State {
  switch (action.type) {
    case "start":
      return {
        didToken: null,
        metadata: null,
        error: null,
        status: "pending",
      };
    case "set-session":
      return {
        didToken: action.token,
        metadata: action.meta,
        error: null,
        status: "authenticated",
      };
    case "remove-session":
      return {
        didToken: null,
        metadata: null,
        error: null,
        status: "unauthenticated",
      };
    case "error":
      return {
        didToken: null,
        metadata: null,
        error: action.error,
        status: "errored",
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
        status: "authenticationCode",
      };
    case "invalid-code":
      return {
        didToken: null,
        metadata: null,
        error: null,
        status: "invalid-code",
      };
    case "restart-session":
      return {
        didToken: null,
        metadata: null,
        error: null,
        status: "unauthenticated",
      };
    default:
      return state;
  }
}
