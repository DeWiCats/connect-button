"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicProvider = exports.MagicContext = void 0;
const react_1 = __importStar(require("react"));
const magic_sdk_1 = require("magic-sdk");
const solana_1 = require("@magic-ext/solana");
const reducer_1 = require("./reducer");
const defaultContextValues = {
    login: () => { },
    cancel: () => { },
    logout: async () => { },
    refresh: async () => { },
    handleLoginCode: () => { },
    restartSession: () => { },
    status: "unauthenticated",
    metadata: { issuer: null, email: null, publicAddress: null },
    error: null,
    magic: undefined,
};
exports.MagicContext = (0, react_1.createContext)(defaultContextValues);
function MagicProvider({ solanaRpcHost, magicKey, children, }) {
    const magic = (0, react_1.useMemo)(() => typeof window !== "undefined" &&
        new magic_sdk_1.Magic(magicKey, {
            extensions: [
                new solana_1.SolanaExtension({
                    rpcUrl: solanaRpcHost,
                }),
            ],
        }), []);
    const [contextValues, setContextValues] = (0, react_1.useState)(defaultContextValues);
    const [loginObj, setLoginObj] = (0, react_1.useState)();
    const [state, dispatch] = (0, react_1.useReducer)(reducer_1.magicReducer, {
        didToken: null,
        metadata: null,
        error: null,
        status: "unauthenticated",
    });
    (0, react_1.useEffect)(() => {
        async function checkAuthenticationStatus() {
            if (!magic)
                return;
            try {
                const isLoggedIn = await magic.user.isLoggedIn();
                if (isLoggedIn) {
                    dispatch({ type: "start" });
                    // eslint-disable-next-line prefer-const
                    let [meta, token] = await Promise.all([
                        magic.user.getMetadata(),
                        magic.user.getIdToken(),
                    ]);
                    if (!token)
                        token = await magic.user.generateIdToken();
                    dispatch({ type: "set-session", token, meta });
                }
                else {
                    dispatch({ type: "remove-session" });
                }
            }
            catch (error) {
                dispatch({ type: "error", error });
            }
        }
        checkAuthenticationStatus();
    }, [magic]);
    const handleLogin = (0, react_1.useCallback)(async (configuration) => {
        if (!magic)
            return;
        dispatch({ type: "start" });
        const login = magic.auth.loginWithEmailOTP(Object.assign({}, configuration));
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
    }, [magic]);
    const handleLoginCode = (0, react_1.useCallback)((code) => {
        dispatch({ type: "start" });
        loginObj === null || loginObj === void 0 ? void 0 : loginObj.emit("verify-email-otp", code);
    }, [loginObj]);
    const handleCancelLogin = (0, react_1.useCallback)(() => {
        dispatch({ type: "remove-session" });
        loginObj === null || loginObj === void 0 ? void 0 : loginObj.emit("cancel");
    }, [loginObj]);
    const handleLogoout = (0, react_1.useCallback)(async () => {
        dispatch({ type: "start" });
        if (!magic)
            return;
        try {
            await magic.user.logout();
            dispatch({ type: "remove-session" });
        }
        catch (error) {
            dispatch({ type: "error", error });
        }
    }, [magic]);
    const restartSession = () => {
        dispatch({ type: "restart-session" });
    };
    // Context consumer rerender fix
    // https://reactjs.org/docs/context.html#caveats
    (0, react_1.useEffect)(() => {
        setContextValues((prevValues) => (Object.assign(Object.assign(Object.assign({}, prevValues), state), { login: handleLogin, logout: handleLogoout, cancel: handleCancelLogin, handleLoginCode,
            restartSession,
            magic })));
    }, [
        state,
        handleLogin,
        handleLogoout,
        magic,
        handleCancelLogin,
        handleLoginCode,
    ]);
    return (<exports.MagicContext.Provider value={contextValues}>
      {children}
    </exports.MagicContext.Provider>);
}
exports.MagicProvider = MagicProvider;
//# sourceMappingURL=provider.jsx.map