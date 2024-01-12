"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateCodeHeader = void 0;
const SparkleIcon_1 = __importDefault(require("src/assets/SparkleIcon"));
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const useSolana_1 = __importDefault(require("src/hooks/useSolana"));
const Dialog_1 = require("src/components/Dialog");
const react_i18next_1 = require("react-i18next");
const react_1 = require("react");
const AuthenticateCodeHeader = ({ handleClose, onBack, }) => {
    const { metadata } = (0, useSolana_1.default)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const handleCloseButton = (0, react_1.useCallback)(() => {
        handleClose();
    }, [handleClose]);
    return (<Dialog_1.DialogHeader>
      <Dialog_1.DialogHeader.Actions>
        <Dialog_1.DialogActionButton onClick={onBack}>
          <icons_material_1.ArrowBackIosNew fontSize="small"/>
        </Dialog_1.DialogActionButton>
        <Dialog_1.DialogLogoWrapper className="center">
          <SparkleIcon_1.default size={42} color={"hsl(214, 61%, 53%"}/>
        </Dialog_1.DialogLogoWrapper>
        <Dialog_1.DialogActionButton className="end" onClick={handleCloseButton}>
          <icons_material_1.Close fontSize="small"/>
        </Dialog_1.DialogActionButton>
      </Dialog_1.DialogHeader.Actions>
      <Dialog_1.DialogHeader.Title>
        <material_1.Typography fontSize={19}>
          {t("connectWallet.authenticateCode.title")}
        </material_1.Typography>
        <material_1.Typography fontSize={19} fontWeight={700}>
          {!!metadata && (metadata === null || metadata === void 0 ? void 0 : metadata.email)}
        </material_1.Typography>
      </Dialog_1.DialogHeader.Title>
    </Dialog_1.DialogHeader>);
};
exports.AuthenticateCodeHeader = AuthenticateCodeHeader;
//# sourceMappingURL=header.jsx.map