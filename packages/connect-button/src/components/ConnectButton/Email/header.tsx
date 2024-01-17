import {
  DialogActionButton,
  DialogHeader,
  DialogLogoWrapper,
} from "../../../components/Dialog";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowBack, Close, MailOutline } from "../../../assets/Icons";

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
          <ArrowBack />
        </DialogActionButton>
        <DialogLogoWrapper>
          <MailOutline size={40} />
        </DialogLogoWrapper>
        <DialogActionButton className="end" onClick={handleClose}>
          <Close />
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
