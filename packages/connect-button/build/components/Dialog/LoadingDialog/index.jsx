"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingDialog = void 0;
const material_1 = require("@mui/material");
const LoadingSpinner_1 = __importDefault(require("src/components/LoadingSpinner"));
const DialogWrapper = (0, material_1.styled)("div")({
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
const LoadingDialog = () => {
    return (<DialogWrapper>
      <LoadingSpinner_1.default size={40}/>
      {/** TODO: Localize! */}
      <material_1.Typography>submitting...</material_1.Typography>
    </DialogWrapper>);
};
exports.LoadingDialog = LoadingDialog;
//# sourceMappingURL=index.jsx.map