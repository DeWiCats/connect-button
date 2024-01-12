"use client";

import useSolana from "src/hooks/useSolana";
import React, { useCallback } from "react";
import { DialogContent, DialogErrorMessage } from "src/components/Dialog";
import { useTranslation } from "react-i18next";
import PinInput from "src/components/PinInput";
import ExclamationSolid from "src/assets/ExclamationSolid";

type AuthenticateCodeContentProp = {
  error: boolean;
};

export const AuthenticateCodeContent = ({
  error,
}: AuthenticateCodeContentProp) => {
  const { handleLoginCode } = useSolana();
  const { t } = useTranslation();

  const handleOnResult = useCallback(
    (value: string) => {
      handleLoginCode(value);
    },
    [handleLoginCode]
  );

  return (
    <DialogContent>
      <PinInput onComplete={handleOnResult} error={error} />
      {error && (
        <DialogErrorMessage
          Icon={ExclamationSolid}
          message={t("connectWallet.authenticateCode.error")}
        />
      )}
    </DialogContent>
  );
};
