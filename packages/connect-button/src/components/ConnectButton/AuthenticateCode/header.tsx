import { Typography } from "@mui/material";
import useSolana from "../../../hooks/useSolana";
import {
  DialogActionButton,
  DialogHeader,
  DialogLogoWrapper,
} from "../../../components/Dialog";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { ArrowBack, Close, Sparkle } from "../../../assets/Icons";

type WalletsHeaderProps = {
  handleClose: () => void;
  onBack: () => void;
};

export const AuthenticateCodeHeader = ({
  handleClose,
  onBack,
}: WalletsHeaderProps) => {
  const { metadata } = useSolana();
  const { t } = useTranslation();

  const handleCloseButton = useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <DialogHeader>
      <DialogHeader.Actions>
        <DialogActionButton onClick={onBack}>
          <ArrowBack />
        </DialogActionButton>
        <DialogLogoWrapper className="center">
          <Sparkle size={42} color={"hsl(214, 61%, 53%"} />
        </DialogLogoWrapper>
        <DialogActionButton className="end" onClick={handleCloseButton}>
          <Close />
        </DialogActionButton>
      </DialogHeader.Actions>
      <DialogHeader.Title>
        <Typography fontSize={19}>
          {t("connectWallet.authenticateCode.title")}
        </Typography>
        <Typography fontSize={19} fontWeight={700}>
          {!!metadata && metadata?.email}
        </Typography>
      </DialogHeader.Title>
    </DialogHeader>
  );
};
