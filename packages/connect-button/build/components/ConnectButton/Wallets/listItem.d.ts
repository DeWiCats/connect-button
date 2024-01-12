import { ListItemProps } from "@mui/material";
import { Wallet } from "@solana/wallet-adapter-react";
import { MouseEventHandler } from "react";
interface WalletListItemProps extends Omit<ListItemProps, "onClick" | "button"> {
    onClick: MouseEventHandler<HTMLButtonElement>;
    wallet: Wallet;
}
export declare const WalletListItem: ({ onClick, wallet, ...props }: WalletListItemProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=listItem.d.ts.map