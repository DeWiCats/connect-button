"use client";

import { ErrorCode, LoginWithEmailOTPEvents, PromiEvent } from "magic-sdk";
import { InstanceWithExtensions, SDKBase } from "@magic-sdk/provider";
import { SolanaExtension } from "@magic-ext/solana";
import { type } from "os";

// Decentralized ID token
type DIDToken = string;

export interface UserMetadata {
  issuer: string | null;
  email: string | null;
  publicAddress: string | null;
}

export type AuthenticationStatus =
  | "unauthenticated"
  | "authenticated"
  | "pending"
  | "errored"
  | "invalid-code"
  | "authenticationCode";

export type MagicContextValues = {
  login: (options: { email: string; showUI?: boolean }) => void;
  cancel: () => void;
  logout: () => Promise<void>;
  handleLoginCode: (code: string) => void;
  restartSession: () => void;
  status: AuthenticationStatus;
  metadata: UserMetadata | null;
  error: ErrorCode | null;
  magic?: InstanceWithExtensions<SDKBase, SolanaExtension[]> | false;
}

export type State = {
  didToken: DIDToken | null;
  metadata: UserMetadata | null;
  error: ErrorCode | null;
  status: AuthenticationStatus;
}

export type Action =
  | { type: "start" }
  | { type: "set-session"; token: DIDToken | null; meta: UserMetadata | null }
  | { type: "remove-session" }
  | { type: "error"; error: ErrorCode }
  | { type: "invalid-code" }
  | { type: "login-code"; email: string }
  | { type: "restart-session" };

export type MagicLogIn = PromiEvent<
  string | null,
  LoginWithEmailOTPEvents & {
    done: (result: string | null) => void;
    error: (reason: any) => void;
    settled: () => void;
  }
>;
