"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectButtonProvider = void 0;
const react_1 = require("react");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_material_ui_1 = require("@solana/wallet-adapter-material-ui");
const web3_js_1 = require("@solana/web3.js");
const index_1 = require("src/provider/MagicProvider/index");
const context_1 = __importDefault(require("src/provider/ConnectWallet/context"));
const wallet_adapter_wallets_1 = require("@solana/wallet-adapter-wallets");
const LanguageProvider_1 = __importDefault(require("src/localization/LanguageProvider"));
const SolanaRPCProvider_1 = require("./SolanaRPCProvider");
const ConnectButtonProvider = ({ solanaRpcHost, magicKey, children, }) => {
    const connection = (0, react_1.useMemo)(() => new web3_js_1.Connection(solanaRpcHost, { commitment: "confirmed" }), [solanaRpcHost]);
    const wallets = (0, react_1.useMemo)(() => [new wallet_adapter_wallets_1.PhantomWalletAdapter(), new wallet_adapter_wallets_1.SolflareWalletAdapter()], []);
    return (<LanguageProvider_1.default>
      <wallet_adapter_react_1.ConnectionProvider endpoint={connection.rpcEndpoint}>
        <wallet_adapter_react_1.WalletProvider wallets={wallets} autoConnect>
          <index_1.MagicProvider magicKey={magicKey} solanaRpcHost={solanaRpcHost}>
            <wallet_adapter_material_ui_1.WalletDialogProvider>
              <context_1.default>
                <SolanaRPCProvider_1.SolanaRPCProvider solanaRpcHost={solanaRpcHost}>
                  {children}
                </SolanaRPCProvider_1.SolanaRPCProvider>
              </context_1.default>
            </wallet_adapter_material_ui_1.WalletDialogProvider>
          </index_1.MagicProvider>
        </wallet_adapter_react_1.WalletProvider>
      </wallet_adapter_react_1.ConnectionProvider>
    </LanguageProvider_1.default>);
};
exports.ConnectButtonProvider = ConnectButtonProvider;
//# sourceMappingURL=ConnectButtonProvider.jsx.map