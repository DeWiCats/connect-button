"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInHeader = void 0;
const Dialog_1 = require("src/components/Dialog");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const image_1 = __importDefault(require("next/image"));
const react_i18next_1 = require("react-i18next");
const LogoWrapper = (0, material_1.styled)(Dialog_1.DialogLogoWrapper)({
    alignItems: "flex-end",
    backgroundColor: "hsl(225, 3%, 76%)",
    "> img": {
        filter: "grayscale(80%)",
    },
});
const LogInHeader = ({ handleClose }) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    return (<Dialog_1.DialogHeader>
      <Dialog_1.DialogHeader.Actions>
        <LogoWrapper>
          <image_1.default alt="dewi-logo" src="/assets/dewi-logo-cut.png" width={59} height={59}/>
        </LogoWrapper>
        <Dialog_1.DialogActionButton className="end" onClick={handleClose} aria-label="close">
          <icons_material_1.Close fontSize="small"/>
        </Dialog_1.DialogActionButton>
      </Dialog_1.DialogHeader.Actions>
      <Dialog_1.DialogHeader.Title>
        <material_1.Typography sx={{ textAlign: "center" }}>
          {t("connectWallet.login.title")}
        </material_1.Typography>
      </Dialog_1.DialogHeader.Title>
    </Dialog_1.DialogHeader>);
};
exports.LogInHeader = LogInHeader;
//# sourceMappingURL=header.jsx.map