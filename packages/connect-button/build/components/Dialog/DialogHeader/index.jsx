"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogHeader = void 0;
const material_1 = require("@mui/material");
const react_1 = require("react");
const Container = (0, material_1.styled)("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "hsl(210, 17%, 98%)",
    gap: "1.375rem",
});
const Title = (0, material_1.styled)("div")({
    fontFamily: "Inter",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "1.375rem",
    width: "100%",
    fontSize: "1.25rem",
    color: "hsl(210, 17%, 98%)",
});
const ActionsWrapper = (0, material_1.styled)("div")(() => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "start",
    justifyItems: "center",
    width: "100%",
    '.start': {
        justifySelf: 'start',
    },
    '.end': {
        justifySelf: 'end',
    },
}));
const Actions = ({ children }) => {
    const count = react_1.Children.count(children);
    return (<ActionsWrapper>
      {count === 2 && <span />}
      {children}
    </ActionsWrapper>);
};
const DialogHeader = ({ children }) => {
    return <Container>{children}</Container>;
};
exports.DialogHeader = DialogHeader;
exports.DialogHeader.Title = Title;
exports.DialogHeader.Actions = Actions;
//# sourceMappingURL=index.jsx.map