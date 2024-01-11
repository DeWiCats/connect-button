"use client";

import SparkleIcon from "@assets/SparkleIcon";
import { ArrowBackIosNew, Close } from "@mui/icons-material";
import { Typography } from "@mui/material";
import useSolana from "@hooks/useSolana";
import {
  DialogActionButton,
  DialogHeader,
  DialogLogoWrapper,
} from "@components/Dialog";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

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
          <ArrowBackIosNew fontSize="small" />
        </DialogActionButton>
        <DialogLogoWrapper className="center">
          <SparkleIcon size={42} color={"hsl(214, 61%, 53%"} />
        </DialogLogoWrapper>
        <DialogActionButton className="end" onClick={handleCloseButton}>
          <Close fontSize="small" />
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
