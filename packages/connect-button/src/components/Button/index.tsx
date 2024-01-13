"use client";

import { Button as MaterialButton, styled } from "@mui/material";

const Button = styled(MaterialButton)(() => ({
  textTransform: "none",
  color: "hsl(220, 9%, 7%) !important",
  minWidth: "unset",
  fontWeight: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  background: "hsl(210, 17%, 95%) !important",
  border: "1px solid hsl(210, 12%, 83%)",
  borderRadius: "62rem",
  "&:disabled": {
    opacity: 0.6,
  },
  "&:hover": {
    backgroundColor: "hsl(216, 14%, 93%) !important",
    borderColor: "var(--dewi_colors_gray_5)",
    color: "hsl(214, 9%, 15%)",
  },
  "&:active": {
    backgroundColor: "hsl(210, 12%, 83%) !important",
    color: "hsl(220, 9%, 7%) !important",
  },
  "&:focus": {
    color: "hsl(214, 9%, 15%) !important",
    outline: "4px solid hsl(214, 61%, 53%)",
  },
}));

export default Button;
