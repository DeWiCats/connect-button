"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsContent = void 0;
const Dialog_1 = require("src/components/Dialog");
const useSolana_1 = __importDefault(require("src/hooks/useSolana"));
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const listItem_1 = require("./listItem");
const WalletsContent = ({ featuredWallets = 3, handleClose, }) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const { wallets, select } = (0, useSolana_1.default)();
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const [featured, more] = (0, react_1.useMemo)(() => {
        const installed = [];
        const loadable = [];
        const notDetected = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const wallet of wallets) {
            if (wallet.readyState === wallet_adapter_base_1.WalletReadyState.NotDetected) {
                notDetected.push(wallet);
            }
            else if (wallet.readyState === wallet_adapter_base_1.WalletReadyState.Loadable) {
                loadable.push(wallet);
            }
            else if (wallet.readyState === wallet_adapter_base_1.WalletReadyState.Installed) {
                installed.push(wallet);
            }
        }
        const orderedWallets = [...installed, ...loadable, ...notDetected];
        return [
            orderedWallets.slice(0, featuredWallets),
            orderedWallets.slice(featuredWallets),
        ];
    }, [wallets, featuredWallets]);
    const handleWalletClick = (0, react_1.useCallback)((_, walletName) => {
        select(walletName);
        handleClose();
    }, [select, handleClose]);
    const handleExpandClick = (0, react_1.useCallback)(() => setExpanded(!expanded), [setExpanded, expanded]);
    return (<Dialog_1.DialogContent>
      <material_1.List sx={{ width: "100%" }}>
        {featured.map((wallet) => (<listItem_1.WalletListItem key={wallet.adapter.name} onClick={(event) => handleWalletClick(event, wallet.adapter.name)} wallet={wallet}/>))}
        {more.length ? (<material_1.Collapse in={expanded} timeout="auto" unmountOnExit>
            {more.map((wallet) => (<listItem_1.WalletListItem key={wallet.adapter.name} onClick={(event) => handleWalletClick(event, wallet.adapter.name)} wallet={wallet}/>))}
          </material_1.Collapse>) : null}
      </material_1.List>
      {more.length ? (<material_1.ListItem sx={{ justifyContent: "flex-end" }}>
          <material_1.Button size="medium" onClick={handleExpandClick}>
            {expanded
                ? t("connectWallet.wallets.lessOptions")
                : t("connectWallet.wallets.moreOptions")}
            {expanded ? (<icons_material_1.ArrowDropUp fontSize="medium"/>) : (<icons_material_1.ArrowDropDown fontSize="medium"/>)}
          </material_1.Button>
        </material_1.ListItem>) : null}
    </Dialog_1.DialogContent>);
};
exports.WalletsContent = WalletsContent;
//# sourceMappingURL=content.jsx.map