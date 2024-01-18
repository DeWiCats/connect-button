import { ButtonProps } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  Fragment,
  ComponentType,
} from "react";
import useSolana from "../../hooks/useSolana";
import { ConnectWalletContext } from "../../provider/ConnectWallet/context";
import { useTranslation } from "react-i18next";
import { Button, IconButton } from "../../components/Button";
import ConnectDialog from "./ConnectDialog";
import { getPublicAddress } from "../../utils/helpers";
import useIsSmallScreen from "../../hooks/useIsSmallScreen";
import { WalletOutline, SolanaWallet } from "../../assets/Icons";

type ConnectButtonProps = {
  compresedView?: boolean;
  disableMagicLink?: boolean;
  logo?: ComponentType;
  connectLabel?: string;
} & ButtonProps;

const ConnectButton = ({
  compresedView = false,
  disableMagicLink = false,
  logo,
  connectLabel,
  ...rest
}: ConnectButtonProps) => {
  const { publicKey, wallet, magicAuthenticationStatus, restartSession } =
    useSolana();
  const { t } = useTranslation();
  const { walletDialogState, updateWalletDialogState } =
    useContext(ConnectWalletContext);

  const isSmallScreen = useIsSmallScreen(640);

  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const isConnected = !!wallet || !!publicKey;
    if (magicAuthenticationStatus === "authenticated") {
      handleClose();
      if (!isConnected || walletDialogState !== "connected") {
        updateWalletDialogState("connected");
      }
    } else if (
      magicAuthenticationStatus === "errored" &&
      walletDialogState === "authenticationCode"
    ) {
      updateWalletDialogState("email");
    } else {
      const isAuthCodeRelated = [
        "authenticationCode",
        "invalid-code",
        "pending",
      ].includes(magicAuthenticationStatus);
      const shouldUpdateState =
        walletDialogState !== "authenticationCode" &&
        (isAuthCodeRelated || magicAuthenticationStatus === "unauthenticated");

      if (shouldUpdateState) {
        restartMagicLinkStatus();
        updateWalletDialogState(isConnected ? "connected" : "logIn");
      }
    }
  }, []);

  const content = useMemo(() => {
    if (publicKey) {
      return getPublicAddress(publicKey.toBase58());
    }
    return t("connectWallet.connectButton");
  }, [publicKey, t]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const restartMagicLinkStatus = useCallback(() => {
    if (magicAuthenticationStatus === "errored") restartSession();
  }, [restartSession, magicAuthenticationStatus]);

  return (
    <Fragment>
      {isSmallScreen && compresedView ? (
        <IconButton
          id="connect-wallet-button"
          onClick={handleOpenDialog}
          aria-haspopup="true"
          size="medium"
          {...rest}
        >
          <WalletOutline />
        </IconButton>
      ) : (
        <Button
          startIcon={<SolanaWallet wallet={wallet} />}
          onClick={handleOpenDialog}
          aria-haspopup="true"
          size="large"
          id="connect-wallet-button"
          {...rest}
        >
          {content}
        </Button>
      )}
      <ConnectDialog
        open={open}
        handleClose={handleClose}
        disableMagicLink={disableMagicLink}
        logo={logo}
        connectLabel={connectLabel}
      />
    </Fragment>
  );
};

export { ConnectButton };
