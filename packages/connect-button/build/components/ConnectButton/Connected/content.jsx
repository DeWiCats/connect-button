"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedContent = void 0;
const material_1 = require("@mui/material");
const Dialog_1 = require("src/components/Dialog");
const react_i18next_1 = require("react-i18next");
const DisconnectWalletIcon_1 = __importDefault(require("src/assets/DisconnectWalletIcon"));
const CopyAddressIcon_1 = __importDefault(require("src/assets/CopyAddressIcon"));
const ChangeWalletIcon_1 = __importDefault(require("src/assets/ChangeWalletIcon"));
const ConnectedContent = ({ changeWallet, handleClose, disconnect, publicAddress, magicLogin = false, }) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const handleCopyAddress = async () => {
        await navigator.clipboard.writeText(publicAddress);
        handleClose();
    };
    const handleDisconnect = async () => {
        await disconnect();
        handleClose();
    };
    return (<Dialog_1.DialogContent id="wallet-menu" sx={{ gap: "0.5rem" }}>
      <ConnectedListItem onClick={handleCopyAddress} Icon={CopyAddressIcon_1.default} text={t("connectWallet.connected.copyAddress")}/>
      {!magicLogin && (<ConnectedListItem onClick={changeWallet} Icon={ChangeWalletIcon_1.default} text={t("connectWallet.connected.changeWallet")}/>)}
      <ConnectedListItem onClick={handleDisconnect} Icon={DisconnectWalletIcon_1.default} text={t("connectWallet.connected.disconnect")}/>
    </Dialog_1.DialogContent>);
};
exports.ConnectedContent = ConnectedContent;
const ListItemButton = (0, material_1.styled)("button")({
    display: "flex",
    background: "transparent",
    gap: "1rem",
    justifyContent: "flex-start",
    padding: "0.5rem",
    width: "100%",
    margin: 0,
    border: "1px solid #2C2E33",
    alignItems: "center",
    color: "#F8F9FA",
    borderRadius: "0.75rem",
    fontSize: "1.125rem",
    fontWeight: 400,
    "&:hover": {
        background: "#26272c",
    },
});
const ConnectedListItem = ({ onClick, Icon, text }) => {
    return (<ListItemButton onClick={onClick}>
      <Icon />
      <material_1.Typography fontSize="1rem">{text}</material_1.Typography>
    </ListItemButton>);
};
//# sourceMappingURL=content.jsx.map