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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const mui_one_time_password_input_1 = require("mui-one-time-password-input");
const Input = (0, material_1.styled)(mui_one_time_password_input_1.MuiOtpInput)(({ error }) => ({
    gap: "0.25rem",
    "& .MuiOtpInput-TextField-3": {
        marginRight: "1.25rem",
    },
    "& .MuiInputBase-root": {
        margin: 0,
        color: "#f9fafb",
        background: "#25262B",
        borderRadius: "0.75rem",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: error ? "#E75F59" : "#353A3F",
        width: "2.75rem",
        height: "2.75rem",
        textAlign: "center",
    },
}));
const PinInput = ({ onComplete, error = false }) => {
    const [value, setValue] = (0, react_1.useState)("");
    const handleChange = (newVal) => {
        setValue(newVal);
    };
    const handleValidInput = (character) => {
        return /\d/.test(character);
    };
    return (<Input validateChar={handleValidInput} length={6} value={value} onChange={handleChange} onComplete={onComplete} error={error}/>);
};
exports.default = PinInput;
//# sourceMappingURL=index.jsx.map