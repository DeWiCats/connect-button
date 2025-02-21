import React from "react";
import { Typography, styled } from "@mui/material";
import { DialogContent, DialogIconWrapper } from "../../../components/Dialog";
import { useTranslation } from "react-i18next";
import {
  ArrowFoward,
  WalletOutline,
  MailOutline,
  GoogleIcon,
} from "../../../assets/Icons";

const LogInButton = styled("button")({
  display: "grid",
  gridTemplateColumns: "repeat(3, auto)",
  background: "#25262B",
  fontFamily: "Space Grotesk",
  borderRadius: "0.75rem",
  padding: "0.5rem",
  fontWeight: "500",
  alignItems: "center",
  justifyItems: "start",
  width: "100%",
  margin: "0 !important",
  color: "#F8F9FA",
  textDecoration: "capitalize",
  border: "none",
  "&:hover": {
    background: "hsl(223, 6%, 23%)",
    svg: {
      opacity: 0.8,
    },
  },
});

const ArrowFowardIcon = styled(ArrowFoward)({
  color: "#F8F9FA",
  opacity: 0.2,
});

type LogInContentProps = {
  handleWalletLogIn: () => void;
  handleMagicLinkLogIn: () => void;
  disableMagicLink?: boolean;
  handleGoogleLogIn?: () => void;
  enableGoogle?: boolean;
};

export const LogInContent = ({
  handleWalletLogIn,
  handleMagicLinkLogIn,
  handleGoogleLogIn,
  disableMagicLink = false,
  enableGoogle = false,
}: LogInContentProps) => {
  const { t } = useTranslation();

  return (
    <DialogContent>
      {!disableMagicLink && (
        <LogInButton onClick={handleMagicLinkLogIn}>
          <DialogIconWrapper Icon={MailOutline} />
          <Typography>{t("connectWallet.login.email")}</Typography>
          <ArrowFowardIcon />
        </LogInButton>
      )}
      <LogInButton onClick={handleWalletLogIn}>
        <DialogIconWrapper Icon={WalletOutline} />
        <Typography>{t("connectWallet.login.wallet")}</Typography>
        <ArrowFowardIcon />
      </LogInButton>

      {enableGoogle && (
        <LogInButton onClick={handleGoogleLogIn}>
          <DialogIconWrapper Icon={GoogleIcon} />
          <Typography>{t("connectWallet.login.google")}</Typography>
          <ArrowFowardIcon />
        </LogInButton>
      )}
    </DialogContent>
  );
};
