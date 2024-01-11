import { DialogActions, styled } from "@mui/material";

export const DialogContent = styled(DialogActions)({
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
  padding: 0,
  "& > :not(:first-of-type)": {
    margin: 0,
  },
});
