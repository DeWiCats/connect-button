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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectButton = void 0;
const react_1 = require("react");
const useSolana_1 = __importDefault(require("src/hooks/useSolana"));
const context_1 = require("src/provider/ConnectWallet/context");
const react_i18next_1 = require("react-i18next");
const dynamic_1 = __importDefault(require("next/dynamic"));
const Button_1 = __importDefault(require("src/components/Button"));
const ConnectDialog_1 = __importDefault(require("./ConnectDialog"));
const helpers_1 = require("src/utils/helpers");
const WalletIcon = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require("@solana/wallet-adapter-material-ui"))).then((module) => module.WalletIcon), { ssr: false });
const ConnectButton = (_a) => {
    var rest = __rest(_a, []);
    const { publicAddress, wallet, status, restartSession } = (0, useSolana_1.default)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const { walletDialogState, updateWalletDialogState } = (0, react_1.useContext)(context_1.ConnectWalletContext);
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleClose = (0, react_1.useCallback)(() => {
        setOpen(false);
    }, []);
    (0, react_1.useEffect)(() => {
        const isConnected = !!wallet || !!publicAddress;
        if (status === "authenticated") {
            handleClose();
            if (!isConnected || walletDialogState !== "connected") {
                updateWalletDialogState("connected");
            }
        }
        else if (status === "errored" &&
            walletDialogState === "authenticationCode") {
            updateWalletDialogState("email");
        }
        else {
            const isAuthCodeRelated = [
                "authenticationCode",
                "invalid-code",
                "pending",
            ].includes(status);
            const shouldUpdateState = walletDialogState !== "authenticationCode" &&
                (isAuthCodeRelated || status === "unauthenticated");
            if (shouldUpdateState) {
                restartMagicLinkStatus();
                updateWalletDialogState(isConnected ? "connected" : "logIn");
            }
        }
    }, []);
    const content = (0, react_1.useMemo)(() => {
        if (publicAddress) {
            return (0, helpers_1.getPublicAddress)(publicAddress);
        }
        return t("connectWallet.connectButton");
    }, [publicAddress, t]);
    const handleOpenDialog = () => {
        setOpen(true);
    };
    const restartMagicLinkStatus = (0, react_1.useCallback)(() => {
        if (status === "errored")
            restartSession();
    }, [restartSession, status]);
    return (<>
      <Button_1.default startIcon={<WalletIcon wallet={wallet}/>} onClick={handleOpenDialog} aria-haspopup="true" size="large" id="connect-wallet-button" {...rest}>
        {content}
      </Button_1.default>
      <ConnectDialog_1.default open={open} handleClose={handleClose}/>
    </>);
};
exports.ConnectButton = ConnectButton;
//# sourceMappingURL=index.jsx.map