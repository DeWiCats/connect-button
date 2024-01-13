"use client";

import React, {
  useMemo,
  useCallback,
  createContext,
  useEffect,
  useReducer,
  useState,
  ReactNode,
} from "react";
import { Magic } from "magic-sdk";
import { SolanaExtension } from "@magic-ext/solana";
import { magicReducer } from "./reducer";
import { MagicContextValues, MagicLogIn } from "./types";

const defaultContextValues = {
  login: () => {},
  cancel: () => {},
  logout: async () => {},
  refresh: async () => {},
  handleLoginCode: () => {},
  restartSession: () => {},
  status: "unauthenticated",
  metadata: { issuer: null, email: null, publicAddress: null },
  error: null,
  magic: undefined,
} as MagicContextValues;

export const MagicContext =
  createContext<MagicContextValues>(defaultContextValues);

type MagicProviderProps = {
  magicKey: string;
  solanaRpcHost: string;
  children: ReactNode;
};

export const MagicProvider = ({
  solanaRpcHost,
  magicKey,
  children,
}: MagicProviderProps) => {
  const magic = useMemo(
    () =>
      typeof window !== "undefined" &&
      new Magic(magicKey, {
        extensions: [
          new SolanaExtension({
            rpcUrl: solanaRpcHost,
          }),
        ],
      }),
    []
  );

  const [contextValues, setContextValues] =
    useState<MagicContextValues>(defaultContextValues);
  const [loginObj, setLoginObj] = useState<MagicLogIn>();

  const [state, dispatch] = useReducer(magicReducer, {
    didToken: null,
    metadata: null,
    error: null,
    status: "unauthenticated",
  });

  useEffect(() => {
    async function checkAuthenticationStatus() {
      if (!magic) return;

      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
          dispatch({ type: "start" });
          // eslint-disable-next-line prefer-const
          let [meta, token] = await Promise.all([
            magic.user.getMetadata(),
            magic.user.getIdToken(),
          ]);
          if (!token) token = await magic.user.generateIdToken();
          dispatch({ type: "set-session", token, meta });
        } else {
          dispatch({ type: "remove-session" });
        }
      } catch (error: any) {
        dispatch({ type: "error", error });
      }
    }

    checkAuthenticationStatus();
  }, [magic]);

  const handleLogin = useCallback(
    async (configuration: { email: string; showUI?: boolean }) => {
      if (!magic) return;

      dispatch({ type: "start" });
      const login = magic.auth.loginWithEmailOTP({ ...configuration });

      login
        .on("email-otp-sent", async () => {
          setLoginObj(login);
          dispatch({ type: "login-code", email: configuration.email });
        })
        .on("invalid-email-otp", () => {
          dispatch({ type: "invalid-code" });
        })
        .on("done", async (result) => {
          const meta = await magic.user.getMetadata();
          dispatch({ type: "set-session", token: result, meta });
        })
        .on("error", (reason) => {
          dispatch({ type: "error", error: reason });
          login.emit("cancel");
        })
        .catch(() => {
          login.emit("cancel");
        });
    },
    [magic]
  );

  const handleLoginCode = useCallback(
    (code: string) => {
      dispatch({ type: "start" });
      loginObj?.emit("verify-email-otp", code);
    },
    [loginObj]
  );

  const handleCancelLogin = useCallback(() => {
    dispatch({ type: "remove-session" });
    loginObj?.emit("cancel");
  }, [loginObj]);

  const handleLogoout = useCallback(async () => {
    dispatch({ type: "start" });
    if (!magic) return;
    try {
      await magic.user.logout();
      dispatch({ type: "remove-session" });
    } catch (error: any) {
      dispatch({ type: "error", error });
    }
  }, [magic]);

  const restartSession = () => {
    dispatch({ type: "restart-session" });
  };

  // Context consumer rerender fix
  // https://reactjs.org/docs/context.html#caveats
  useEffect(() => {
    setContextValues((prevValues) => ({
      ...prevValues,
      ...state,
      login: handleLogin,
      logout: handleLogoout,
      cancel: handleCancelLogin,
      handleLoginCode,
      restartSession,
      magic,
    }));
  }, [
    state,
    handleLogin,
    handleLogoout,
    magic,
    handleCancelLogin,
    handleLoginCode,
  ]);

  return (
    <MagicContext.Provider value={contextValues}>
      {children}
    </MagicContext.Provider>
  );
}