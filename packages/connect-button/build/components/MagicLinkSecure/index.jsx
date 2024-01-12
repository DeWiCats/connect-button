"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicLinkSecure = void 0;
const MagicLink_1 = __importDefault(require("src/assets/MagicLink"));
const material_1 = require("@mui/material");
const Secure = (0, material_1.styled)("div")({
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
const MagicLinkSecure = () => {
    return (<Secure>
      secured by
      <MagicLink_1.default />
    </Secure>);
};
exports.MagicLinkSecure = MagicLinkSecure;
//# sourceMappingURL=index.jsx.map