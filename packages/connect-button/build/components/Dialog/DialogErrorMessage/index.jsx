"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogErrorMessage = void 0;
const material_1 = require("@mui/material");
const ErrorMessage = (0, material_1.styled)("div")({
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    gap: "0.5rem",
    color: "hsl(3, 75%, 63%)",
    "& > .MuiTypography-root": {
        fontSize: "1rem",
        lineHeight: "unset",
    },
});
const DialogErrorMessage = ({ Icon, message, }) => {
    return (<ErrorMessage>
      <Icon /> <material_1.Typography>{message}</material_1.Typography>
    </ErrorMessage>);
};
exports.DialogErrorMessage = DialogErrorMessage;
//# sourceMappingURL=index.jsx.map