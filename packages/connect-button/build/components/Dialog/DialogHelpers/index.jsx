"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogLogoWrapper = exports.DialogIconWrapper = exports.DialogActionButton = void 0;
const material_1 = require("@mui/material");
exports.DialogActionButton = (0, material_1.styled)("button")({
    background: "#2C2E33",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "999px",
    paddding: "0.25rem",
    color: "#CFD4D9",
    "&:hover": {
        background: "#36393e",
    },
});
const IconWrapper = (0, material_1.styled)("div")({
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
const DialogIconWrapper = ({ Icon, style }) => {
    return (<IconWrapper style={style}>
      <Icon />
    </IconWrapper>);
};
exports.DialogIconWrapper = DialogIconWrapper;
exports.DialogLogoWrapper = (0, material_1.styled)("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "999px",
    height: "4.5rem",
    width: "4.5rem",
    overflow: "hidden",
    backgroundColor: "rgba(54, 111, 188, 0.20)",
});
//# sourceMappingURL=index.jsx.map