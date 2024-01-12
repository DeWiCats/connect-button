import React from "react";
import { Typography, styled } from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { DialogContent, DialogIconWrapper } from "../../../components/Dialog";
import { useTranslation } from "react-i18next";
import WalletOutlineIcon from "../../../assets/WalletOutlineIcon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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

const ChevronRIcon = styled(ChevronRightIcon)({
  color: "#F8F9FA",
  opacity: 0.2,
});

type LogInContentProps = {
  handleWalletLogIn: () => void;
  handleMagicLinkLogIn: () => void;
};

export const LogInContent = ({
  handleWalletLogIn,
  handleMagicLinkLogIn,
}: LogInContentProps) => {
  const { t } = useTranslation();

  return (
    <DialogContent>
      <LogInButton onClick={handleMagicLinkLogIn}>
        <DialogIconWrapper Icon={MailOutline} />
        <Typography>{t("connectWallet.login.email")}</Typography>
        <ChevronRIcon />
      </LogInButton>
      <LogInButton onClick={handleWalletLogIn}>
        <DialogIconWrapper Icon={WalletOutlineIcon} />
        <Typography>{t("connectWallet.login.wallet")}</Typography>
        <ChevronRIcon />
      </LogInButton>
    </DialogContent>
  );
};
