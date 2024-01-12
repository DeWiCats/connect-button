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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectWalletContext = void 0;
const react_1 = __importStar(require("react"));
const reducer_1 = __importDefault(require("./reducer"));
exports.ConnectWalletContext = (0, react_1.createContext)({
    walletDialogState: undefined,
    updateWalletDialogState: (_) => { },
});
const ConnectWalletProvider = ({ children }) => {
    const [walletDialogState, dispatch] = (0, react_1.useReducer)(reducer_1.default, "logIn");
    const updateWalletDialogState = (state) => {
        dispatch({ type: "SET_DIALOG_STATE", value: state });
    };
    const value = (0, react_1.useMemo)(() => ({ walletDialogState, updateWalletDialogState }), [walletDialogState]);
    return (<exports.ConnectWalletContext.Provider value={value}>
      {children}
    </exports.ConnectWalletContext.Provider>);
};
exports.default = ConnectWalletProvider;
//# sourceMappingURL=context.jsx.map