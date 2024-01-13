import {
  useAnchorWallet,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { useCallback, useMemo } from "react";
import {
  Connection,
  PublicKey,
  PublicKeyInitData,
  Transaction,
} from "@solana/web3.js";
import { AnchorProvider, setProvider, Wallet } from "@coral-xyz/anchor";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { walletAdapterIdentity as umiWalletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Umi } from "@metaplex-foundation/umi";
import { useMagic, MagicContextValues } from "../provider/MagicProvider/index";
import useSolanaRPC from "../provider/SolanaProvider/useSolanaRPC";

type SolanaWalletData = MagicContextValues &
  Omit<WalletContextState, "connect" | "connecting" | "disconnect"> & {
    publicAddress: string;
    connecting: boolean;
    connected: boolean;
    connect: ({
      walletName,
      email,
    }: {
      walletName?: WalletName<string>;
      email?: string;
    }) => void;
    disconnect: () => Promise<void>;
    anchorProvider: AnchorProvider;
    umi: Umi;
    metaplex: Metaplex;
  };

const useSolana = (): SolanaWalletData => {
  const solanaRpcHost = useSolanaRPC();
  const SolanaWallet = useWallet();
  const MagicWallet = useMagic();
  const web3AdapterAnchorWallet = useAnchorWallet();

  const connection = useMemo(
    () =>
      new Connection(solanaRpcHost || "", {
        commitment: "confirmed",
      }),
    []
  );

  const anchorProvider = useMemo(() => {
    const wallet = !MagicWallet?.metadata?.publicAddress
      ? web3AdapterAnchorWallet
      : ({
          signTransaction: async (transaction: Transaction) => {
            if (MagicWallet.magic === false) {
              return undefined;
            }

            const tx = await MagicWallet.magic?.solana.signTransaction(
              transaction
            );
            const { rawTransaction } = tx;
            const signedTransaction = Transaction.from(rawTransaction);
            return signedTransaction;
          },
          signAllTransactions: async (transactions: Transaction[]) => {
            const txs = await Promise.all(
              transactions.map(async (tx) => {
                if (MagicWallet.magic === false) {
                  return undefined;
                }
                const signedTx =
                  await MagicWallet.magic?.solana.signTransaction(tx);
                const { rawTransaction } = signedTx;
                const signedTransaction = Transaction.from(rawTransaction);
                return signedTransaction;
              })
            );
            return txs;
          },
          get publicKey() {
            return new PublicKey(
              MagicWallet.metadata?.publicAddress as PublicKeyInitData
            );
          },
        } as Wallet);

    const provider = new AnchorProvider(connection, wallet as Wallet, {
      preflightCommitment: "confirmed",
      skipPreflight: true,
    });

    return provider;
  }, [MagicWallet, connection, web3AdapterAnchorWallet]);

  const connect = useCallback(
    ({
      walletName,
      email,
    }: {
      walletName?: WalletName<string>;
      email?: string;
    }) => {
      const { select } = SolanaWallet;
      const { login } = MagicWallet;
      if (walletName) {
        select(walletName);
      } else if (email) {
        login({ email, showUI: false });
      }
    },
    [MagicWallet, SolanaWallet]
  );

  const disconnect = useCallback(async () => {
    const { connected, disconnect: walletDisconnect } = SolanaWallet;
    const { logout } = MagicWallet;
    if (connected) {
      await walletDisconnect();
    } else {
      await logout();
    }
  }, [MagicWallet, SolanaWallet]);

  const getPublicAddress = useCallback(() => {
    const { publicKey } = SolanaWallet;
    const { metadata } = MagicWallet;

    if (publicKey) {
      return publicKey?.toBase58();
    }

    return metadata?.publicAddress as string;
  }, [MagicWallet, SolanaWallet]);

  const getLoading = useCallback(() => {
    const { connecting } = SolanaWallet;
    const { status } = MagicWallet;
    return connecting || status === "pending";
  }, [MagicWallet, SolanaWallet]);

  const getConnected = useCallback(() => {
    const { connected } = SolanaWallet;
    const { status } = MagicWallet;
    return connected || status === "authenticated";
  }, [MagicWallet, SolanaWallet]);

  const umi = useMemo(() => {
    const u = createUmi(solanaRpcHost || "")
      .use(mplCandyMachine())
      .use(umiWalletAdapterIdentity(anchorProvider, true));

    return u;
  }, [anchorProvider]);

  const metaplex = useMemo(() => {
    return new Metaplex(connection);
  }, [connection]);

  setProvider(anchorProvider);
  metaplex.use(walletAdapterIdentity(anchorProvider));

  return {
    // MagicWallet Link
    ...MagicWallet,
    // Solana-wallet
    ...SolanaWallet,
    publicAddress: getPublicAddress(),
    connecting: getLoading(),
    connected: getConnected(),
    connect,
    disconnect,
    anchorProvider,
    umi,
    metaplex,
  };
};

export default useSolana;
