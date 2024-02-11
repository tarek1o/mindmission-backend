"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const Logger = () => {
    var _a;
    if (((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "development") {
        return (0, morgan_1.default)("combined", {
            stream: fs_1.default.createWriteStream("./access.log", {
                flags: "a",
            }),
        });
    }
    return (0, morgan_1.default)("dev");
};
exports.default = Logger;
//# sourceMappingURL=logger.js.map