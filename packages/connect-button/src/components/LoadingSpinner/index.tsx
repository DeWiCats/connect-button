import { Box, styled } from "@mui/material";
import Spinner from "../../assets/spinner.png";

const Centered = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LogoCircle = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  height: "fit-content",
  width: "fit-content",
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
        <img
          alt="loading-spinner"
          src={Spinner.src}
          width={size}
          height={size}
        />
      </LogoCircle>
    </Centered>
  );
}
