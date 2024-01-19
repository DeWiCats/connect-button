import { ListItem, ListItemProps, Typography, styled } from "@mui/material";
import { Wallet } from "@solana/wallet-adapter-react";
import { MouseEventHandler, useMemo } from "react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useTranslation } from "react-i18next";
import { SolanaWallet } from "../../../assets/Icons";

const WalletButton = styled("button")({
  display: "flex",
  background: "transparent",
  gap: "1rem",
  justifyContent: "flex-start",
  padding: "0.5rem",
  border: "1px solid hsl(210, 8%, 31%)",
  color: "hsl(210, 17%, 98%)",
  flexGrow: 1,
  margin: "0.25rem 0",
  borderRadius: "0.5rem",
  fontSize: "1.125rem",
  fontWeight: 400,
});

const WalletText = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  color: "hsl(210, 17%, 98%)",
});

const ButtonListItem = styled(ListItem)({
  padding: "0",
});

interface WalletListItemProps
  extends Omit<ListItemProps, "onClick" | "button"> {
  onClick: MouseEventHandler<HTMLButtonElement>;
  wallet: Wallet;
}

export const WalletListItem = ({
  onClick,
  wallet,
  ...props
}: WalletListItemProps) => {
  const { t } = useTranslation();

  const walletText = wallet.adapter.connected
    ? t("connectWallet.wallets.connected")
    : t("connectWallet.wallets.detected");

  const notDetected = useMemo(
    () =>
      wallet.readyState === WalletReadyState.NotDetected ||
      wallet.readyState === WalletReadyState.Loadable,
    [wallet.readyState]
  );

  return (
    <ButtonListItem {...props}>
      <WalletButton
        disabled={
          walletText === t("connectWallet.wallets.connected") || notDetected
        }
        onClick={onClick}
        sx={{
          opacity: notDetected ? 0.75 : 1,
          "&:hover": notDetected ? {} : { background: "hsl(210, 9%, 23%)" },
        }}
      >
        <SolanaWallet wallet={wallet} />
        <WalletText>
          <Typography fontSize="1rem">{wallet.adapter.name}</Typography>
          {wallet.readyState === WalletReadyState.Installed && (
            <Typography fontSize="0.75rem">{walletText}</Typography>
          )}
          {notDetected && (
            <Typography fontSize="0.75rem">
              {t("connectWallet.wallets.notDetected")}
            </Typography>
          )}
        </WalletText>
      </WalletButton>
    </ButtonListItem>
  );
};
