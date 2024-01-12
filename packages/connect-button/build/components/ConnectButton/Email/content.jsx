"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailContent = void 0;
const useSolana_1 = __importDefault(require("src/hooks/useSolana"));
const material_1 = require("@mui/material");
const react_1 = require("react");
const Dialog_1 = require("src/components/Dialog");
const react_i18next_1 = require("react-i18next");
const ExclamationSolid_1 = __importDefault(require("src/assets/ExclamationSolid"));
const EmailField = (0, material_1.styled)(material_1.TextField)(({ error }) => ({
    width: "100%",
    "& .MuiInputBase-root": {
        background: "hsl(230, 8%, 16%)",
        borderRadius: "0.75rem",
        fontSize: "1rem",
        color: "#F8F9FA",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: error ? "#E75F59" : "#353A3F",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid hsl(210, 9%, 23%)",
    },
}));
const CustomConnectButton = (0, material_1.styled)(material_1.Button)({
    backgroundColor: "white !important",
    "&:disabled": {
        backgroundColor: "hsl(214, 9%, 15%) !important",
        color: "white",
    },
    "&:hover": {
        backgroundColor: "hsl(210, 6%, 56%) !important",
    },
    color: "hsl(220, 9%, 7%) !important",
    textTransform: "none",
    borderRadius: "31.26rem",
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "1.25rem",
    height: "2.75rem",
    marginTop: "1.25rem",
    width: "100%",
});
const EmailContent = () => {
    const { login, status } = (0, useSolana_1.default)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const [email, setEmail] = (0, react_1.useState)();
    const [isEmailValid, setIsEmailValid] = (0, react_1.useState)(true);
    const handleMagicLogIn = (0, react_1.useCallback)(() => {
        if (!email)
            return;
        login({
            email,
            showUI: false,
        });
    }, [login, email]);
    const validateEmailFormat = (0, react_1.useCallback)((newEmail) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(newEmail);
    }, []);
    const handleEmailChange = (0, react_1.useCallback)((event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        if (!isEmailValid) {
            setIsEmailValid(validateEmailFormat(newEmail));
        }
    }, [isEmailValid, validateEmailFormat]);
    const handleEmailBlur = (0, react_1.useCallback)(() => {
        if (!email)
            return;
        setIsEmailValid(validateEmailFormat(email));
    }, [email, validateEmailFormat]);
    const handleKeyPress = (0, react_1.useCallback)((event) => {
        if (event.key === "Enter") {
            if (!email)
                return;
            if (!validateEmailFormat(email)) {
                setIsEmailValid(false);
                return;
            }
            handleMagicLogIn();
        }
    }, [email, handleMagicLogIn, validateEmailFormat]);
    return (<Dialog_1.DialogContent>
      <EmailField onChange={handleEmailChange} onBlur={handleEmailBlur} type="email" name="email" autoComplete="email" placeholder="Email" value={email} error={!isEmailValid} onKeyDown={handleKeyPress}/>
      {(!isEmailValid || status === "errored") && (<Dialog_1.DialogErrorMessage Icon={ExclamationSolid_1.default} message={t("connectWallet.email.error")}/>)}
      <CustomConnectButton onClick={handleMagicLogIn} disabled={!isEmailValid}>
        {t("connectWallet.email.submit")}
      </CustomConnectButton>
    </Dialog_1.DialogContent>);
};
exports.EmailContent = EmailContent;
//# sourceMappingURL=content.jsx.map