"use strict";
"use client";
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
const material_1 = require("@mui/material");
const CustomButton = (0, material_1.styled)(material_1.Button)(() => ({
    textTransform: "none",
    // fontSize: {
    //   small: "0.875rem",
    //   medium: "1rem",
    //   large: "1.125rem",
    //   "extra-large": "1.25rem",
    // }[size || "medium"],
    // padding: {
    //   small: "0 0.75rem",
    //   medium: "0 1rem",
    //   large: "0 1.375rem",
    //   extraLarge: "0 1.375rem",
    // }[size || "medium"],
    color: "hsl(220, 9%, 7%) !important",
    minWidth: "unset",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    background: "hsl(210, 17%, 95%) !important",
    border: "1px solid hsl(210, 12%, 83%)",
    borderRadius: "62rem",
    "&:disabled": {
        opacity: 0.6,
    },
    "&:hover": {
        backgroundColor: "hsl(216, 14%, 93%) !important",
        borderColor: "var(--dewi_colors_gray_5)",
        color: "hsl(214, 9%, 15%)",
    },
    "&:active": {
        backgroundColor: "hsl(210, 12%, 83%) !important",
        color: "hsl(220, 9%, 7%) !important",
    },
    "&:focus": {
        color: "hsl(214, 9%, 15%) !important",
        outline: "4px solid hsl(214, 61%, 53%)",
    },
    // [variant === "outlined" && "&"]: {
    //   backgroundColor: "hsl(230, 8%, 16%) !important",
    //   color: "var(--dewi_colors_gray_3) !important",
    //   border: "1px solid hsl(223, 6%, 23%)",
    //   "&:hover": {
    //     backgroundColor: "hsl(225, 7%, 11%) !important",
    //     borderColor: "var(--dewi_colors_dark_5)",
    //     color: "hsl(214, 9%, 15%)",
    //   },
    //   "&:active": {
    //     backgroundColor: "hsl(223, 6%, 23%) !important",
    //   },
    //   "&:focus": {
    //     color: "var(--dewi_colors_gray_3) !important",
    //     outline: "4px solid hsl(214, 61%, 53%)",
    //   },
    // },
}));
const Button = (_a) => {
    var { size = "medium", disabled = false, children, variant } = _a, rest = __rest(_a, ["size", "disabled", "children", "variant"]);
    return (<CustomButton variant={variant} size={size} disabled={disabled} {...rest} disableRipple>
      {children}
    </CustomButton>);
};
exports.default = Button;
//# sourceMappingURL=index.jsx.map