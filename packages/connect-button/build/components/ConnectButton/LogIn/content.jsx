"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInContent = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const Dialog_1 = require("src/components/Dialog");
const react_i18next_1 = require("react-i18next");
const WalletOutlineIcon_1 = __importDefault(require("src/assets/WalletOutlineIcon"));
const ChevronRight_1 = __importDefault(require("@mui/icons-material/ChevronRight"));
const LogInButton = (0, material_1.styled)("button")({
    display: "grid",
    gridTemplateColumns: "repeat(3, auto)",
    background: "#25262B",
    fontFamily: "Space Grotesk",
    borderRadius: "0.75rem",
    padding: "0.5rem",
    fontWeight: "500",
    alignItems: "center",
    justifyItems: "start",
    width: "100%",
    margin: "0 !important",
    color: "#F8F9FA",
    textDecoration: "capitalize",
    border: "none",
    "&:hover": {
        background: "hsl(223, 6%, 23%)",
        svg: {
            opacity: 0.8,
        },
    },
});
const ChevronRIcon = (0, material_1.styled)(ChevronRight_1.default)({
    color: "#F8F9FA",
    opacity: 0.2,
});
const LogInContent = ({ handleWalletLogIn, handleMagicLinkLogIn, }) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    return (<Dialog_1.DialogContent>
      <LogInButton onClick={handleMagicLinkLogIn}>
        <Dialog_1.DialogIconWrapper Icon={icons_material_1.MailOutline}/>
        <material_1.Typography>{t("connectWallet.login.email")}</material_1.Typography>
        <ChevronRIcon />
      </LogInButton>
      <LogInButton onClick={handleWalletLogIn}>
        <Dialog_1.DialogIconWrapper Icon={WalletOutlineIcon_1.default}/>
        <material_1.Typography>{t("connectWallet.login.wallet")}</material_1.Typography>
        <ChevronRIcon />
      </LogInButton>
    </Dialog_1.DialogContent>);
};
exports.LogInContent = LogInContent;
//# sourceMappingURL=content.jsx.map