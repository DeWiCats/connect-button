"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHeader = void 0;
const Dialog_1 = require("src/components/Dialog");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const react_i18next_1 = require("react-i18next");
const EmailHeader = ({ handleClose, onBack }) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    return (<Dialog_1.DialogHeader>
      <Dialog_1.DialogHeader.Actions>
        <Dialog_1.DialogActionButton className="start" onClick={onBack}>
          <icons_material_1.ArrowBackIosNew fontSize="small"/>
        </Dialog_1.DialogActionButton>
        <Dialog_1.DialogLogoWrapper>
          <icons_material_1.MailOutline sx={{ color: "#66A9F1", fontSize: "2.5rem" }}/>
        </Dialog_1.DialogLogoWrapper>
        <Dialog_1.DialogActionButton className="end" onClick={handleClose}>
          <icons_material_1.Close fontSize="small"/>
        </Dialog_1.DialogActionButton>
      </Dialog_1.DialogHeader.Actions>
      <Dialog_1.DialogHeader.Title>
        <material_1.Typography sx={{ maxWidth: "15.125rem" }}>
          {t("connectWallet.email.title")}
        </material_1.Typography>
      </Dialog_1.DialogHeader.Title>
    </Dialog_1.DialogHeader>);
};
exports.EmailHeader = EmailHeader;
//# sourceMappingURL=header.jsx.map