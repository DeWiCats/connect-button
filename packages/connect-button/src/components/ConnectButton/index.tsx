import { ButtonProps } from "@mui/material";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSolana from "../../hooks/useSolana";
import { ConnectWalletContext } from "../../provider/ConnectWallet/context";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import Button from "../../components/Button";
import ConnectDialog from "./ConnectDialog";
import { getPublicAddress } from "../../utils/helpers";

const WalletIcon = dynamic(
  () =>
    import("@solana/wallet-adapter-material-ui").then(
      (module) => module.WalletIcon
    ),
  { ssr: false }
);

const ConnectButton: FC<ButtonProps> = ({ ...rest }) => {
  const { publicAddress, wallet, status, restartSession } = useSolana();
  const { t } = useTranslation();
  const { walletDialogState, updateWalletDialogState } =
    useContext(ConnectWalletContext);

  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const isConnected = !!wallet || !!publicAddress;
    if (status === "authenticated") {
      handleClose();
      if (!isConnected || walletDialogState !== "connected") {
        updateWalletDialogState("connected");
      }
    } else if (
      status === "errored" &&
      walletDialogState === "authenticationCode"
    ) {
      updateWalletDialogState("email");
    } else {
      const isAuthCodeRelated = [
        "authenticationCode",
        "invalid-code",
        "pending",
      ].includes(status);
      const shouldUpdateState =
        walletDialogState !== "authenticationCode" &&
        (isAuthCodeRelated || status === "unauthenticated");

      if (shouldUpdateState) {
        restartMagicLinkStatus();
        updateWalletDialogState(isConnected ? "connected" : "logIn");
      }
    }
  }, []);

  const content = useMemo(() => {
    if (publicAddress) {
      return getPublicAddress(publicAddress);
    }
    return t("connectWallet.connectButton");
  }, [publicAddress, t]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const restartMagicLinkStatus = useCallback(() => {
    if (status === "errored") restartSession();
  }, [restartSession, status]);

  return (
    <>
      <Button
        startIcon={<WalletIcon wallet={wallet} />}
        onClick={handleOpenDialog}
        aria-haspopup="true"
        size="large"
        id="connect-wallet-button"
        {...rest}
      >
        {content}
      </Button>
      <ConnectDialog open={open} handleClose={handleClose} />
    </>
  );
};

export { ConnectButton };
