import { DialogProps } from "@mui/material";
import React, { Fragment, useCallback, useContext, useEffect } from "react";
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
} & DialogProps;

const ConnectDialog = ({
  handleClose,
  disableMagicLink,
  ...rest
}: ConnectDialogProps) => {
  const {
    connecting,
    publicAddress,
    wallet,
    disconnect,
    magicAuthenticationStatus,
    cancel,
    restartSession,
  } = useSolana();
  const { walletDialogState, updateWalletDialogState } =
    useContext(ConnectWalletContext);

  useEffect(() => {
    if (status === "authenticated") {
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
    const isConnected = !!wallet || !!publicAddress;
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
    publicAddress,
  ]);

  const getDialogHeader = () => {
    const headers = {
      logIn: <LogInHeader handleClose={handleClose} />,
      wallets: (
        <WalletsHeader
          handleClose={handleClose}
          onBack={() => {
            updateWalletDialogState(
              !!wallet ||
                !!publicAddress ||
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
          publicAddress={publicAddress}
        />
      ),
    };
    // @ts-ignore
    return headers[walletDialogState];
  };

  const getDialogContent = () => {
    const contents = {
      logIn: (
        <LogInContent
          handleWalletLogIn={() => updateWalletDialogState("wallets")}
          handleMagicLinkLogIn={() => updateWalletDialogState("email")}
          disableMagicLink={disableMagicLink}
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
          publicAddress={publicAddress}
          disconnect={async () => {
            await disconnect();
          }}
          magicLogin={magicAuthenticationStatus === "authenticated"}
        />
      ),
    };
    // @ts-ignore
    return contents[walletDialogState];
  };

  const dialogHeights = {
    logIn: disableMagicLink ? "12.75rem" : "17.875rem",
    wallets: "16rem",
    email: "16.8rem",
    authenticationCode: "15.6rem",
    connected: "14.625rem",
    default: "8.5rem",
  };
  const stateDialogHeight = connecting
    ? dialogHeights.default
    : // @ts-ignore
      dialogHeights[walletDialogState];

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
          {" "}
          {getDialogHeader()}
          {getDialogContent()}
          {
            // @ts-ignore
            ["authenticationCode", "email"].includes(walletDialogState) && (
              <MagicLinkSecure />
            )
          }
        </Fragment>
      )}
    </Dialog>
  );
};

export default ConnectDialog;
