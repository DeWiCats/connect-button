import type { Wallet } from "@solana/wallet-adapter-react";
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";

export interface SolanaWalletProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  wallet: { adapter: Pick<Wallet["adapter"], "icon" | "name"> } | null;
}

export const SolanaWallet: FC<SolanaWalletProps> = ({ wallet, ...props }) => {
  return (
    wallet && (
      <img
        height={25}
        src={wallet.adapter.icon}
        alt={`${wallet.adapter.name} icon`}
        {...props}
      />
    )
  );
};
