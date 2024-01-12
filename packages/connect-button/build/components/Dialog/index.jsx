"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.Dialog = exports.CustomDialog = void 0;
__exportStar(require("./DialogHeader"), exports);
__exportStar(require("./DialogContent"), exports);
__exportStar(require("./DialogHelpers"), exports);
__exportStar(require("./LoadingDialog"), exports);
__exportStar(require("./DialogErrorMessage"), exports);
const material_1 = require("@mui/material");
const react_1 = require("react");
// TODO: fix colors and dewi tokens
exports.CustomDialog = (0, material_1.styled)(material_1.Dialog)({
    "& .MuiBackdrop-root": {
        backdropFilter: "blur(5px)",
        background: "hsl(220, 9%, 7%)",
    },
    "& .MuiDialog-container": {
        alignItems: "center",
    },
    "& .MuiDialog-paper": {
        background: "hsl(225, 7%, 11%)",
        minWidth: "16rem",
        padding: "1.375rem",
        gap: "1.375rem",
        borderRadius: "1.3125rem",
        minHeight: "var(--dialog-paper-height, auto)",
        transition: "min-height 0.4s ease-in-out",
        boxSizing: "content-box",
        overflowY: "unset",
    },
    "& .MuiDialogContent-root": {
        padding: 0,
        "& .MuiCollapse-root": {
            "& .MuiList-root": {
                background: "hsl(230, 8%, 16%)",
            },
        },
        "& .MuiList-root": {
            padding: 0,
        },
    },
    "@media (max-width: 640px)": {
        "& .MuiDialog-container": {
            alignItems: "flex-end",
        },
        "& .MuiDialog-paper": {
            width: "100%",
            margin: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
    },
});
const Transition = (0, react_1.forwardRef)(function Transition(props, ref) {
    return <material_1.Slide direction="up" ref={ref} {...props}/>;
});
const Dialog = (_a) => {
    var { transitionProps } = _a, props = __rest(_a, ["transitionProps"]);
    return (<exports.CustomDialog {...props} TransitionComponent={Transition} TransitionProps={Object.assign({ timeout: 500 }, transitionProps)}>
      {props.children}
    </exports.CustomDialog>);
};
exports.Dialog = Dialog;
//# sourceMappingURL=index.jsx.map