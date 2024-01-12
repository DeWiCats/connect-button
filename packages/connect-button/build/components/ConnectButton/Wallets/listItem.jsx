"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletListItem = void 0;
const material_1 = require("@mui/material");
const wallet_adapter_material_ui_1 = require("@solana/wallet-adapter-material-ui");
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const react_i18next_1 = require("react-i18next");
const WalletButton = (0, material_1.styled)("button")({
    display: "flex",
    background: 'transparent',
    gap: "1rem",
    justifyContent: "flex-start",
    padding: "0.5rem",
    border: "1px solid hsl(210, 8%, 31%)",
    color: "hsl(210, 17%, 98%)",
    flexGrow: 1,
    margin: '0.25rem 0',
    borderRadius: "0.5rem",
    fontSize: "1.125rem",
    fontWeight: 400,
    "&:hover": {
        background: "hsl(210, 9%, 23%)",
    },
});
const WalletText = (0, material_1.styled)("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    color: "hsl(210, 17%, 98%)",
});
const ButtonListItem = (0, material_1.styled)(material_1.ListItem)({
    padding: '0',
});
const WalletListItem = (_a) => {
    var { onClick, wallet } = _a, props = __rest(_a, ["onClick", "wallet"]);
    const { t } = (0, react_i18next_1.useTranslation)();
    const walletText = wallet.adapter.connected
        ? t("connectWallet.wallets.connected")
        : t("connectWallet.wallets.detected");
    return (<ButtonListItem {...props}>
      <WalletButton disabled={walletText === t("connectWallet.wallets.connected")} onClick={onClick}>
        <wallet_adapter_material_ui_1.WalletIcon wallet={wallet}/>
        <WalletText>
          <material_1.Typography fontSize="1rem">{wallet.adapter.name}</material_1.Typography>
          {wallet.readyState === wallet_adapter_base_1.WalletReadyState.Installed && (<material_1.Typography fontSize="0.75rem">{walletText}</material_1.Typography>)}
        </WalletText>
      </WalletButton>
    </ButtonListItem>);
};
exports.WalletListItem = WalletListItem;
//# sourceMappingURL=listItem.jsx.map