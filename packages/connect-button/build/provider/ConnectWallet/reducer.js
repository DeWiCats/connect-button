"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DIALOG_STATE":
            return action.value;
        default:
            return state;
    }
};
exports.default = reducer;
//# sourceMappingURL=reducer.js.map