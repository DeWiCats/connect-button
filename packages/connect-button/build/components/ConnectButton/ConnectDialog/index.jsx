"use strict";
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
const react_1 = require("react");
const useSolana_1 = __importDefault(require("src/hooks/useSolana"));
const MagicLinkSecure_1 = require("src/components/MagicLinkSecure");
const context_1 = require("src/provider/ConnectWallet/context");
const Dialog_1 = require("src/components/Dialog");
const LogIn_1 = require("../LogIn");
const Wallets_1 = require("../Wallets");
const Email_1 = require("../Email");
const Connected_1 = require("../Connected");
const AuthenticateCode_1 = require("../AuthenticateCode");
const ConnectDialog = (_a) => {
    var { handleClose } = _a, rest = __rest(_a, ["handleClose"]);
    const { connecting, publicAddress, wallet, disconnect, status, cancel, restartSession, } = (0, useSolana_1.default)();
    const { walletDialogState, updateWalletDialogState } = (0, react_1.useContext)(context_1.ConnectWalletContext);
    (0, react_1.useEffect)(() => {
        if (status === "authenticated") {
            handleClose();
            updateWalletDialogState("connected");
        }
        if (walletDialogState !== "authenticationCode" &&
            (status === "authenticationCode" ||
                status === "invalid-code" ||
                status === "pending")) {
            updateWalletDialogState("authenticationCode");
        }
        if (status === "errored" && walletDialogState === "authenticationCode") {
            updateWalletDialogState("email");
        }
    }, [status]);
    const restartMagicLinkStatus = (0, react_1.useCallback)(() => {
        if (status === "errored")
            restartSession();
    }, [restartSession, status]);
    const handleDialogClosed = (0, react_1.useCallback)(() => {
        const isConnected = !!wallet || !!publicAddress;
        if (walletDialogState !== "authenticationCode" ||
            status === "unauthenticated") {
            restartMagicLinkStatus();
            updateWalletDialogState(isConnected ? "connected" : "logIn");
        }
    }, [
        walletDialogState,
        status,
        restartMagicLinkStatus,
        updateWalletDialogState,
        wallet,
        publicAddress,
    ]);
    const getDialogHeader = () => {
        const headers = {
            logIn: <LogIn_1.LogInHeader handleClose={handleClose}/>,
            wallets: (<Wallets_1.WalletsHeader handleClose={handleClose} onBack={() => {
                    updateWalletDialogState(!!wallet || !!publicAddress || status === "authenticated"
                        ? "connected"
                        : "logIn");
                }}/>),
            email: (<Email_1.EmailHeader handleClose={handleClose} onBack={() => updateWalletDialogState("logIn")}/>),
            authenticationCode: (<AuthenticateCode_1.AuthenticateCodeHeader handleClose={handleClose} onBack={() => {
                    updateWalletDialogState("email");
                    cancel();
                }}/>),
            connected: (<Connected_1.ConnectedHeader handleClose={handleClose} publicAddress={publicAddress}/>),
        };
        // @ts-ignore
        return headers[walletDialogState];
    };
    const getDialogContent = () => {
        const contents = {
            logIn: (<LogIn_1.LogInContent handleWalletLogIn={() => updateWalletDialogState("wallets")} handleMagicLinkLogIn={() => updateWalletDialogState("email")}/>),
            wallets: <Wallets_1.WalletsContent handleClose={handleClose}/>,
            email: <Email_1.EmailContent />,
            authenticationCode: (<AuthenticateCode_1.AuthenticateCodeContent error={status === "invalid-code"}/>),
            connected: (<Connected_1.ConnectedContent changeWallet={() => updateWalletDialogState("wallets")} handleClose={handleClose} publicAddress={publicAddress} disconnect={async () => {
                    await disconnect();
                }} magicLogin={status === "authenticated"}/>),
        };
        // @ts-ignore
        return contents[walletDialogState];
    };
    const dialogHeights = {
        logIn: "17.875rem",
        wallets: "16rem",
        email: "16.8rem",
        authenticationCode: "15.6rem",
        connected: "14.625rem",
        default: "8.5rem",
    };
    const stateDialogHeight = connecting
        ? dialogHeights.default
        : // @ts-ignore
            dialogHeights[walletDialogState];
    return (<Dialog_1.Dialog {...rest} onClose={handleClose} sx={{
            "& .MuiDialog-paper": {
                "--dialog-paper-height": stateDialogHeight,
            },
        }} transitionProps={{
            onExited: handleDialogClosed,
        }}>
      {connecting ? (<Dialog_1.LoadingDialog />) : (<>
          {getDialogHeader()}
          {getDialogContent()}
          {
            // @ts-ignore
            ["authenticationCode", "email"].includes(walletDialogState) && (<MagicLinkSecure_1.MagicLinkSecure />)}
        </>)}
    </Dialog_1.Dialog>);
};
exports.default = ConnectDialog;
//# sourceMappingURL=index.jsx.map