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
exports.AuthenticateCodeContent = void 0;
const useSolana_1 = __importDefault(require("src/hooks/useSolana"));
const react_1 = __importStar(require("react"));
const Dialog_1 = require("src/components/Dialog");
const react_i18next_1 = require("react-i18next");
const PinInput_1 = __importDefault(require("src/components/PinInput"));
const ExclamationSolid_1 = __importDefault(require("src/assets/ExclamationSolid"));
const AuthenticateCodeContent = ({ error, }) => {
    const { handleLoginCode } = (0, useSolana_1.default)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const handleOnResult = (0, react_1.useCallback)((value) => {
        handleLoginCode(value);
    }, [handleLoginCode]);
    return (<Dialog_1.DialogContent>
      <PinInput_1.default onComplete={handleOnResult} error={error}/>
      {error && (<Dialog_1.DialogErrorMessage Icon={ExclamationSolid_1.default} message={t("connectWallet.authenticateCode.error")}/>)}
    </Dialog_1.DialogContent>);
};
exports.AuthenticateCodeContent = AuthenticateCodeContent;
//# sourceMappingURL=content.jsx.map