"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
// import {
//   DewiColorsBlue4,
//   DewiRadiusRounded,
//   DewiSpacing5,
// } from "@styles/tokens/dist/js/tokens";
// import { hslStringToRgba } from "@utils/helpers";
const image_1 = __importDefault(require("next/image"));
const Centered = (0, material_1.styled)(material_1.Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
const LogoCircle = (0, material_1.styled)("div")({
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
function LoadingSpinner({ size = 20, }) {
    return (<Centered>
      <LogoCircle>
        <image_1.default alt="loading-spinner" src="/assets/spinner.png" width={size} height={size}/>
      </LogoCircle>
    </Centered>);
}
exports.default = LoadingSpinner;
//# sourceMappingURL=index.jsx.map