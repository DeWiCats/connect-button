import WalletOutlineIcon from "src/assets/WalletOutlineIcon";
import {
  DialogActionButton,
  DialogHeader,
  DialogLogoWrapper,
} from "src/components/Dialog";
import { ArrowBackIosNew, Close } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type WalletsHeaderProps = {
  handleClose: () => void;
  onBack: () => void;
};

export const WalletsHeader = ({ handleClose, onBack }: WalletsHeaderProps) => {
  const { t } = useTranslation();

  return (
    <DialogHeader>
      <DialogHeader.Actions>
        <DialogActionButton className="start" onClick={onBack}>
          <ArrowBackIosNew fontSize="small" />
        </DialogActionButton>
        <DialogLogoWrapper>
          <WalletOutlineIcon size={30} color="#66A9F1" />
        </DialogLogoWrapper>
        <DialogActionButton className="end" onClick={handleClose}>
          <Close fontSize="small" />
        </DialogActionButton>
      </DialogHeader.Actions>
      <DialogHeader.Title>
        <Typography sx={{ maxWidth: "15.125rem" }}>
          {t("connectWallet.wallets.title")}
        </Typography>
      </DialogHeader.Title>
    </DialogHeader>
  );
};
