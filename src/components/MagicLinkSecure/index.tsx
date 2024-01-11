import MagicLink from "@assets/MagicLink";
import { styled } from "@mui/material";

const Secure = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  color: "hsl(210, 17%, 98%)",
  fontSize: "12px",
  opacity: "0.6",
  position: "absolute",
  right: 0,
  left: 0,
  bottom: "-2rem",
  "@media (max-width: 640px)": {
    top: "-2rem",
    bottom: "unset",
  },
});

export const MagicLinkSecure = () => {
  return (
    <Secure>
      secured by
      <MagicLink />
    </Secure>
  );
};
