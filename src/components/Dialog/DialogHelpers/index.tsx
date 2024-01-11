import { IconButton as Button, styled } from "@mui/material";
import { CSSProperties } from "react";

export const DialogActionButton = styled('button')({
  background: "#2C2E33",
  width: "32px",
  height: "32px",
  borderRadius: '999px',
  paddding: "0.25rem",
  color: "#CFD4D9",
  "&:hover": {
    background: "#36393e",
  },
});

const IconWrapper = styled("div")({
  background: "hsl(225, 7%, 11%)",
  paddding: "0.125rem",
  color: "hsl(210, 17%, 98%)",
  width: "48px",
  height: "48px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  "> .MuiSvgIcon-root, > svg": {
    height: "1.6rem",
    width: "1.6rem",
  },
});

type CircleIconProps = {
  Icon: any; // TODO: replace any with correct type
  style?: CSSProperties;
};

export const DialogIconWrapper = ({ Icon, style }: CircleIconProps) => {
  return (
    <IconWrapper style={style}>
      <Icon />
    </IconWrapper>
  );
};

export const DialogLogoWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "999px",
  height: "4.5rem",
  width: "4.5rem",
  overflow: "hidden",
  backgroundColor: "rgba(54, 111, 188, 0.20)",
});
