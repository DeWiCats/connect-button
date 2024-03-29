import { LoginWithEmailOTPEvents, PromiEvent } from "magic-sdk";
import { InstanceWithExtensions, SDKBase } from "@magic-sdk/provider";
import { SolanaExtension } from "@magic-ext/solana";

// Decentralized ID token
type DIDToken = string;

export interface UserMetadata {
  issuer: string | null;
  email: string | null;
  publicAddress: string | null;
}

export type MagicAuthenticationStatus =
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
  magicAuthenticationStatus: MagicAuthenticationStatus;
  metadata: UserMetadata | null;
  error: Error | null;
  magic?: InstanceWithExtensions<SDKBase, SolanaExtension[]> | false;
};

export type State = {
  didToken: DIDToken | null;
  metadata: UserMetadata | null;
  error: Error | null;
  magicAuthenticationStatus: MagicAuthenticationStatus;
};

export type Action =
  | { type: "start" }
  | { type: "set-session"; token: DIDToken | null; meta: UserMetadata | null }
  | { type: "remove-session" }
  | { type: "error"; error: Error }
  | { type: "invalid-code" }
  | { type: "login-code"; email: string }
  | { type: "restart-session" };

export type MagicLogIn = PromiEvent<
  string | null,
  LoginWithEmailOTPEvents & {
    done: (result: string | null) => void;
    error: (error: Error) => void;
    settled: () => void;
  }
>;
