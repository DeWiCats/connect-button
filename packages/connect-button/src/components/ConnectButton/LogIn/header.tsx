import {
  DialogActionButton,
  DialogHeader,
  DialogLogoWrapper,
} from "../../../components/Dialog";
import { Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import DeWiLogo from "../../../assets/dewi-logo-cut.png";
import { ComponentType } from "react";
import { Close } from "../../../assets/Icons";

const LogoWrapper = styled(DialogLogoWrapper)({
  alignItems: "flex-end",
  height: "72px",
  width: "72px",
  backgroundColor: "hsl(225, 3%, 76%)",
  "> img.dewi-logo": {
    filter: "grayscale(80%)",
    alignSelf: "end",
  },
});

type LogInHeaderProps = {
  handleClose: () => void;
  Logo?: ComponentType;
};

export const LogInHeader = ({ handleClose, Logo }: LogInHeaderProps) => {
  const { t } = useTranslation();

  return (
    <DialogHeader>
      <DialogHeader.Actions>
        <LogoWrapper>
          {Logo ? (
            <Logo />
          ) : (
            <img
              className="dewi-logo"
              alt="dewi-logo"
              src={DeWiLogo}
              height={60}
              width={60}
            />
          )}
        </LogoWrapper>
        <DialogActionButton
          className="end"
          onClick={handleClose}
          aria-label="close"
        >
          <Close />
        </DialogActionButton>
      </DialogHeader.Actions>
      <DialogHeader.Title>
        <Typography sx={{ textAlign: "center" }}>
          {t("connectWallet.login.title")}
        </Typography>
      </DialogHeader.Title>
    </DialogHeader>
  );
};
