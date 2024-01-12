import { Typography, styled } from "@mui/material";
import LoadingSpinner from "src/components/LoadingSpinner";

const DialogWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  flex: 1,
  gap: "1.45rem",
  color: "hsl(210, 17%, 98%)",
});

export const LoadingDialog = () => {
  return (
    <DialogWrapper>
      <LoadingSpinner size={40} />
      {/** TODO: Localize! */}
      <Typography>submitting...</Typography>
    </DialogWrapper>
  );
};
