"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogContent = void 0;
const material_1 = require("@mui/material");
exports.DialogContent = (0, material_1.styled)(material_1.DialogActions)({
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    padding: 0,
    "& > :not(:first-of-type)": {
        margin: 0,
    },
});
//# sourceMappingURL=index.jsx.map