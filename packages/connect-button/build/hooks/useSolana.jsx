"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_1 = require("react");
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@coral-xyz/anchor");
const umi_bundle_defaults_1 = require("@metaplex-foundation/umi-bundle-defaults");
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
const umi_signer_wallet_adapters_1 = require("@metaplex-foundation/umi-signer-wallet-adapters");
const js_1 = require("@metaplex-foundation/js");
const index_1 = require("src/provider/MagicProvider/index");
const SolanaRPCProvider_1 = require("src/provider/SolanaRPCProvider");
const useSolana = () => {
    const solanaRpcHost = (0, SolanaRPCProvider_1.useSolanaRPC)();
    const SolanaWallet = (0, wallet_adapter_react_1.useWallet)();
    const MagicWallet = (0, index_1.useMagic)();
    const web3AdapterAnchorWallet = (0, wallet_adapter_react_1.useAnchorWallet)();
    const connection = (0, react_1.useMemo)(() => new web3_js_1.Connection(solanaRpcHost || "", {
        commitment: "confirmed",
    }), []);
    const anchorProvider = (0, react_1.useMemo)(() => {
        var _a;
        const wallet = !((_a = MagicWallet === null || MagicWallet === void 0 ? void 0 : MagicWallet.metadata) === null || _a === void 0 ? void 0 : _a.publicAddress)
            ? web3AdapterAnchorWallet
            : {
                signTransaction: async (transaction) => {
                    var _a;
                    if (MagicWallet.magic === false) {
                        return undefined;
                    }
                    const tx = await ((_a = MagicWallet.magic) === null || _a === void 0 ? void 0 : _a.solana.signTransaction(transaction));
                    const { rawTransaction } = tx;
                    const signedTransaction = web3_js_1.Transaction.from(rawTransaction);
                    return signedTransaction;
                },
                signAllTransactions: async (transactions) => {
                    const txs = await Promise.all(transactions.map(async (tx) => {
                        var _a;
                        if (MagicWallet.magic === false) {
                            return undefined;
                        }
                        const signedTx = await ((_a = MagicWallet.magic) === null || _a === void 0 ? void 0 : _a.solana.signTransaction(tx));
                        const { rawTransaction } = signedTx;
                        const signedTransaction = web3_js_1.Transaction.from(rawTransaction);
                        return signedTransaction;
                    }));
                    return txs;
                },
                get publicKey() {
                    var _a;
                    return new web3_js_1.PublicKey((_a = MagicWallet.metadata) === null || _a === void 0 ? void 0 : _a.publicAddress);
                },
            };
        const provider = new anchor_1.AnchorProvider(connection, wallet, {
            preflightCommitment: "confirmed",
            skipPreflight: true,
        });
        return provider;
    }, [MagicWallet, connection, web3AdapterAnchorWallet]);
    const connect = (0, react_1.useCallback)(({ walletName, email, }) => {
        const { select } = SolanaWallet;
        const { login } = MagicWallet;
        if (walletName) {
            select(walletName);
        }
        else if (email) {
            login({ email, showUI: false });
        }
    }, [MagicWallet, SolanaWallet]);
    const disconnect = (0, react_1.useCallback)(async () => {
        const { connected, disconnect: walletDisconnect } = SolanaWallet;
        const { logout } = MagicWallet;
        if (connected) {
            await walletDisconnect();
        }
        else {
            await logout();
        }
    }, [MagicWallet, SolanaWallet]);
    const getPublicAddress = (0, react_1.useCallback)(() => {
        const { publicKey } = SolanaWallet;
        const { metadata } = MagicWallet;
        if (publicKey) {
            return publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58();
        }
        return metadata === null || metadata === void 0 ? void 0 : metadata.publicAddress;
    }, [MagicWallet, SolanaWallet]);
    const getLoading = (0, react_1.useCallback)(() => {
        const { connecting } = SolanaWallet;
        const { status } = MagicWallet;
        return connecting || status === "pending";
    }, [MagicWallet, SolanaWallet]);
    const getConnected = (0, react_1.useCallback)(() => {
        const { connected } = SolanaWallet;
        const { status } = MagicWallet;
        return connected || status === "authenticated";
    }, [MagicWallet, SolanaWallet]);
    const umi = (0, react_1.useMemo)(() => {
        const u = (0, umi_bundle_defaults_1.createUmi)(solanaRpcHost || "")
            .use((0, mpl_candy_machine_1.mplCandyMachine)())
            .use((0, umi_signer_wallet_adapters_1.walletAdapterIdentity)(anchorProvider, true));
        return u;
    }, [anchorProvider]);
    const metaplex = (0, react_1.useMemo)(() => {
        return new js_1.Metaplex(connection);
    }, [connection]);
    (0, anchor_1.setProvider)(anchorProvider);
    metaplex.use((0, js_1.walletAdapterIdentity)(anchorProvider));
    return Object.assign(Object.assign(Object.assign({}, MagicWallet), SolanaWallet), { publicAddress: getPublicAddress(), connecting: getLoading(), connected: getConnected(), connect,
        disconnect,
        anchorProvider,
        umi,
        metaplex });
};
exports.default = useSolana;
//# sourceMappingURL=useSolana.jsx.map