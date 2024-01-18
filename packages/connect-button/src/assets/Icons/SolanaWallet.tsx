import type { Wallet } from "@solana/wallet-adapter-react";
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";

export type SolanaWalletProps = {
  wallet: { adapter: Pick<Wallet["adapter"], "icon" | "name"> } | null;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const SolanaWallet = ({ wallet, ...props }: SolanaWalletProps) => {
  return (
    wallet && (
      <img
        height={25}
        width={25}
        src={wallet.adapter.icon}
        alt={`${wallet.adapter.name} icon`}
        {...props}
      />
    )
  );
};
