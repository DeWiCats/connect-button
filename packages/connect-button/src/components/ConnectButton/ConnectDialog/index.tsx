import { DialogProps } from "@mui/material";
import {
  ComponentType,
  Fragment,
  useCallback,
  useContext,
  useEffect,
} from "react";
import useSolana from "../../../hooks/useSolana";
import { MagicLinkSecure } from "../../../components/MagicLinkSecure";
import { ConnectWalletContext } from "../../../provider/ConnectWallet/context";
import { Dialog, LoadingDialog } from "../../../components/Dialog";
import { LogInContent, LogInHeader } from "../LogIn";
import { WalletsContent, WalletsHeader } from "../Wallets";
import { EmailContent, EmailHeader } from "../Email";
import { ConnectedContent, ConnectedHeader } from "../Connected";
import {
  AuthenticateCodeContent,
  AuthenticateCodeHeader,
} from "../AuthenticateCode";

type ConnectDialogProps = {
  handleClose: () => void;
  disableMagicLink: boolean;
  enableGoogle: boolean;
  logo?: ComponentType;
  connectLabel?: string;
} & DialogProps;

const ConnectDialog = ({
  handleClose,
  disableMagicLink,
  enableGoogle,
  logo,
  connectLabel,
  ...rest
}: ConnectDialogProps) => {
  const {
    wallets,
    connected,
    connecting,
    publicKey,
    wallet,
    disconnect,
    magicAuthenticationStatus,
    cancel,
    restartSession,
    select,
  } = useSolana();
  const { walletDialogState, updateWalletDialogState } =
    useContext(ConnectWalletContext);

  useEffect(() => {
    if (!connected) {
      updateWalletDialogState("logIn");
    }
  }, [connected]);

  useEffect(() => {
    if (magicAuthenticationStatus === "authenticated") {
      handleClose();
      updateWalletDialogState("connected");
    }

    if (
      walletDialogState !== "authenticationCode" &&
      (magicAuthenticationStatus === "authenticationCode" ||
        magicAuthenticationStatus === "invalid-code" ||
        magicAuthenticationStatus === "pending")
    ) {
      updateWalletDialogState("authenticationCode");
    }

    if (
      magicAuthenticationStatus === "errored" &&
      walletDialogState === "authenticationCode"
    ) {
      updateWalletDialogState("email");
    }
  }, [magicAuthenticationStatus]);

  const restartMagicLinkStatus = useCallback(() => {
    if (magicAuthenticationStatus === "errored") restartSession();
  }, [restartSession, magicAuthenticationStatus]);

  const handleDialogClosed = useCallback(() => {
    const isConnected = !!wallet || !!publicKey;
    if (
      walletDialogState !== "authenticationCode" ||
      magicAuthenticationStatus === "unauthenticated"
    ) {
      restartMagicLinkStatus();
      updateWalletDialogState(isConnected ? "connected" : "logIn");
    }
  }, [
    walletDialogState,
    magicAuthenticationStatus,
    restartMagicLinkStatus,
    updateWalletDialogState,
    wallet,
    publicKey,
  ]);

  const getDialogHeader = () => {
    const headers = {
      logIn: (
        <LogInHeader
          handleClose={handleClose}
          Logo={logo}
          connectLabel={connectLabel}
        />
      ),
      wallets: (
        <WalletsHeader
          handleClose={handleClose}
          onBack={() => {
            updateWalletDialogState(
              !!wallet ||
                !!publicKey ||
                magicAuthenticationStatus === "authenticated"
                ? "connected"
                : "logIn"
            );
          }}
        />
      ),
      email: (
        <EmailHeader
          handleClose={handleClose}
          onBack={() => updateWalletDialogState("logIn")}
        />
      ),
      authenticationCode: (
        <AuthenticateCodeHeader
          handleClose={handleClose}
          onBack={() => {
            updateWalletDialogState("email");
            cancel();
          }}
        />
      ),
      connected: (
        <ConnectedHeader
          handleClose={handleClose}
          publicAddress={publicKey?.toBase58()}
        />
      ),
    };
    return headers[walletDialogState!];
  };

  const handleGoogleLogIn = useCallback(() => {
    console.log("wallets", wallets);
    const tipLinkWallet = wallets.find((wallet) =>
      wallet.adapter.name.includes("Google")
    );

    if (tipLinkWallet) {
      select(tipLinkWallet?.adapter.name);
      handleClose();
    }
  }, [select, handleClose, wallets]);

  const getDialogContent = () => {
    const contents = {
      logIn: (
        <LogInContent
          handleWalletLogIn={() => updateWalletDialogState("wallets")}
          handleMagicLinkLogIn={() => updateWalletDialogState("email")}
          handleGoogleLogIn={handleGoogleLogIn}
          disableMagicLink={disableMagicLink}
          enableGoogle={enableGoogle}
        />
      ),
      wallets: <WalletsContent handleClose={handleClose} />,
      email: <EmailContent />,
      authenticationCode: (
        <AuthenticateCodeContent
          error={magicAuthenticationStatus === "invalid-code"}
        />
      ),
      connected: (
        <ConnectedContent
          changeWallet={() => updateWalletDialogState("wallets")}
          handleClose={handleClose}
          publicAddress={publicKey?.toBase58()}
          disconnect={async () => {
            await disconnect();
          }}
          magicLogin={magicAuthenticationStatus === "authenticated"}
        />
      ),
    };
    return contents[walletDialogState!];
  };

  const dialogHeights = {
    logIn: disableMagicLink ? "12.75rem" : "17.875rem",
    wallets: "14.5rem",
    email: "16.8rem",
    authenticationCode: "15.6rem",
    connected: "14.625rem",
    default: "8.5rem",
  };
  const stateDialogHeight = connecting
    ? dialogHeights.default
    : dialogHeights[walletDialogState!];

  return (
    <Dialog
      {...rest}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          "--dialog-paper-height": stateDialogHeight,
        },
      }}
      transitionProps={{
        onExited: handleDialogClosed,
      }}
    >
      {connecting ? (
        <LoadingDialog />
      ) : (
        <Fragment>
          {getDialogHeader()}
          {getDialogContent()}
          {["authenticationCode", "email"].includes(walletDialogState!) && (
            <MagicLinkSecure />
          )}
        </Fragment>
      )}
    </Dialog>
  );
};

export default ConnectDialog;
