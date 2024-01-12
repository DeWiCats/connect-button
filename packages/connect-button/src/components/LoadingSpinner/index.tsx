import { Box, styled } from "@mui/material";
// import {
//   DewiColorsBlue4,
//   DewiRadiusRounded,
//   DewiSpacing5,
// } from "@styles/tokens/dist/js/tokens";
// import { hslStringToRgba } from "@utils/helpers";
import Image from "next/image";

const Centered = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LogoCircle = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // borderRadius: DewiRadiusRounded,
  overflow: "hidden",
  height: "fit-content",
  width: "fit-content",
  // padding: DewiSpacing5,
  // backgroundColor: hslStringToRgba(DewiColorsBlue4, 0.2),
  "& > img": {
    "@keyframes rotate": {
      to: {
        transform: "rotate(0deg)",
      },
      from: {
        transform: "rotate(360deg)",
      },
    },
    animation: "rotate 1.5s infinite linear",
  },
});

export type LoadingSpinnerProps = {
  size?: number;
};

export default function LoadingSpinner({
  size = 20,
}: LoadingSpinnerProps): JSX.Element {
  return (
    <Centered>
      <LogoCircle>
        <Image
          alt="loading-spinner"
          src="/assets/spinner.png"
          width={size}
          height={size}
        />
      </LogoCircle>
    </Centered>
  );
}
