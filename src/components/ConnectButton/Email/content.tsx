"use client";

import useSolana from "@hooks/useSolana";
import { Button, TextField, styled } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { DialogContent, DialogErrorMessage } from "@components/Dialog";
import { useTranslation } from "react-i18next";
import ExclamationSolid from "@assets/ExclamationSolid";

const EmailField = styled(TextField)(({ error }: { error: boolean }) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    background: "hsl(230, 8%, 16%)",
    borderRadius: "0.75rem",
    fontSize: "1rem",
    color: "#F8F9FA",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: error ? "#E75F59" : "#353A3F",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid hsl(210, 9%, 23%)",
  },
}));

const CustomConnectButton = styled(Button)({
  backgroundColor: "white !important",
  "&:disabled": {
    backgroundColor: "hsl(214, 9%, 15%) !important",
    color: "white",
  },
  "&:hover": {
    backgroundColor: "hsl(210, 6%, 56%) !important",
  },
  color: "hsl(220, 9%, 7%) !important",
  textTransform: "none",
  borderRadius: "31.26rem",
  fontSize: "1rem",
  fontWeight: "700",
  lineHeight: "1.25rem",
  height: "2.75rem",
  marginTop: "1.25rem",
  width: "100%",
});

export const EmailContent = () => {
  const { login, status } = useSolana();
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>();
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleMagicLogIn = useCallback(() => {
    if (!email) return;

    login({
      email,
      showUI: false,
    });
  }, [login, email]);

  const validateEmailFormat = useCallback((newEmail: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(newEmail);
  }, []);

  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newEmail = event.target.value;
      setEmail(newEmail);
      if (!isEmailValid) {
        setIsEmailValid(validateEmailFormat(newEmail));
      }
    },
    [isEmailValid, validateEmailFormat]
  );

  const handleEmailBlur = useCallback(() => {
    if (!email) return;

    setIsEmailValid(validateEmailFormat(email));
  }, [email, validateEmailFormat]);

  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        if (!email) return;

        if (!validateEmailFormat(email)) {
          setIsEmailValid(false);
          return;
        }
        handleMagicLogIn();
      }
    },
    [email, handleMagicLogIn, validateEmailFormat]
  );

  return (
    <DialogContent>
      <EmailField
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Email"
        value={email}
        error={!isEmailValid}
        onKeyDown={handleKeyPress}
      />
      {(!isEmailValid || status === "errored") && (
        <DialogErrorMessage
          Icon={ExclamationSolid}
          message={t("connectWallet.email.error")}
        />
      )}
      <CustomConnectButton onClick={handleMagicLogIn} disabled={!isEmailValid}>
        {t("connectWallet.email.submit")}
      </CustomConnectButton>
    </DialogContent>
  );
};
