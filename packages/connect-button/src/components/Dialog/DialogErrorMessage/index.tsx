import { Typography, styled } from "@mui/material";
import { ComponentType } from "react";

const ErrorMessage = styled("div")({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  width: "100%",
  gap: "0.5rem",
  color: "hsl(3, 75%, 63%)",
  "& > .MuiTypography-root": {
    fontSize: "1rem",
    lineHeight: "unset",
  },
});

type DialogErrorMessageProps = {
  Icon: ComponentType;
  message: string;
};

export const DialogErrorMessage = ({
  Icon,
  message,
}: DialogErrorMessageProps) => {
  return (
    <ErrorMessage>
      <Icon /> <Typography>{message}</Typography>
    </ErrorMessage>
  );
};
