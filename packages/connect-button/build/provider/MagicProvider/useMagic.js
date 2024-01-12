"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMagic = void 0;
const react_1 = require("react");
const provider_1 = require("./provider");
function useMagic() {
    const contextValues = (0, react_1.useContext)(provider_1.MagicContext);
    return contextValues;
}
exports.useMagic = useMagic;
//# sourceMappingURL=useMagic.js.map