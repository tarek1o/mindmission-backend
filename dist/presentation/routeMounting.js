"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeMounting = void 0;
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const roleRoute_1 = __importDefault(require("./routes/roleRoute"));
const authenticationRoute_1 = __importDefault(require("./routes/authenticationRoute"));
const modelPermissionRoute_1 = __importDefault(require("./routes/modelPermissionRoute"));
const logRoute_1 = __importDefault(require("./routes/logRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const instructorRoute_1 = __importDefault(require("./routes/instructorRoute"));
const routeMounting = (app) => {
    app.use(`${process.env.apiVersion}/auth`, authenticationRoute_1.default);
    app.use(`${process.env.apiVersion}/users`, userRoute_1.default);
    app.use(`${process.env.apiVersion}/roles`, roleRoute_1.default);
    app.use(`${process.env.apiVersion}/logs`, logRoute_1.default);
    app.use(`${process.env.apiVersion}/permissions`, modelPermissionRoute_1.default);
    app.use(`${process.env.apiVersion}/categories`, categoryRoute_1.default);
    app.use(`${process.env.apiVersion}/instructors`, instructorRoute_1.default);
    // app.use(`${process.env.apiVersion}/whatsApp`, whatsAppRoute);
};
exports.routeMounting = routeMounting;
//# sourceMappingURL=routeMounting.js.map