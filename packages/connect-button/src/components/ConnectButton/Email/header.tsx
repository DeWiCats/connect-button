import {
  DialogActionButton,
  DialogHeader,
  DialogLogoWrapper,
} from "src/components/Dialog";
import { ArrowBackIosNew, Close, MailOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type WalletsHeaderProps = {
  handleClose: () => void;
  onBack: () => void;
};

export const EmailHeader = ({ handleClose, onBack }: WalletsHeaderProps) => {
  const { t } = useTranslation();

  return (
    <DialogHeader>
      <DialogHeader.Actions>
        <DialogActionButton className="start" onClick={onBack}>
          <ArrowBackIosNew fontSize="small" />
        </DialogActionButton>
        <DialogLogoWrapper>
          <MailOutline sx={{ color: "#66A9F1", fontSize: "2.5rem" }} />
        </DialogLogoWrapper>
        <DialogActionButton className="end" onClick={handleClose}>
          <Close fontSize="small" />
        </DialogActionButton>
      </DialogHeader.Actions>
      <DialogHeader.Title>
        <Typography sx={{ maxWidth: "15.125rem" }}>
          {t("connectWallet.email.title")}
        </Typography>
      </DialogHeader.Title>
    </DialogHeader>
  );
};
