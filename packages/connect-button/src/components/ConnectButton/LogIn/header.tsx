import {
  DialogActionButton,
  DialogHeader,
  DialogLogoWrapper,
} from "../../../components/Dialog";
import { Close } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import DeWiLogo from "../../../assets/dewi-logo-cut.png";

const LogoWrapper = styled(DialogLogoWrapper)({
  alignItems: "flex-end",
  backgroundColor: "hsl(225, 3%, 76%)",
  "> img": {
    filter: "grayscale(80%)",
  },
});

type LogInHeaderProps = {
  handleClose: () => void;
};

export const LogInHeader = ({ handleClose }: LogInHeaderProps) => {
  const { t } = useTranslation();

  return (
    <DialogHeader>
      <DialogHeader.Actions>
        <LogoWrapper>
          <img alt="dewi-logo" src={DeWiLogo} width={59} height={59} />
        </LogoWrapper>
        <DialogActionButton
          className="end"
          onClick={handleClose}
          aria-label="close"
        >
          <Close fontSize="small" />
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
