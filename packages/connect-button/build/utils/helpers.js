"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_KEYS = exports.getPublicAddress = void 0;
const getPublicAddress = (publicAddress) => {
    if (!publicAddress)
        return undefined;
    return `${publicAddress.slice(0, 4)}..${publicAddress.slice(-4)}`;
};
exports.getPublicAddress = getPublicAddress;
exports.EVENT_KEYS = {
    BACKSPACE: "Backspace",
    LEFT_ARROW: "ArrowLeft",
    UP_ARROW: "ArrowUp",
    RIGHT_ARROW: "ArrowRight",
    DOWN_ARROW: "ArrowDown",
    LOWER_E: "e",
    UPPER_E: "E",
    MINUS: "-",
    PERIOD: ".",
};
//# sourceMappingURL=helpers.js.map