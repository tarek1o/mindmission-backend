"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeMounting = void 0;
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
const modelPermissionRoutes_1 = __importDefault(require("./routes/modelPermissionRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const instructorRoutes_1 = __importDefault(require("./routes/instructorRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const sectionRoutes_1 = __importDefault(require("./routes/sectionRoutes"));
const lessonRoutes_1 = __importDefault(require("./routes/lessonRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const videoRoutes_1 = __importDefault(require("./routes/videoRoutes"));
const quizRoutes_1 = __importDefault(require("./routes/quizRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const ratingRoutes_1 = __importDefault(require("./routes/ratingRoutes"));
const statisticsRoutes_1 = __importDefault(require("./routes/statisticsRoutes"));
const couponRoutes_1 = __importDefault(require("./routes/couponRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const routeMounting = (app) => {
    app.use(`${process.env.apiVersion}/auth`, authenticationRoutes_1.default);
    app.use(`${process.env.apiVersion}/users`, userRoutes_1.default);
    app.use(`${process.env.apiVersion}/roles`, roleRoutes_1.default);
    app.use(`${process.env.apiVersion}/logs`, logRoutes_1.default);
    app.use(`${process.env.apiVersion}/permissions`, modelPermissionRoutes_1.default);
    app.use(`${process.env.apiVersion}/categories`, categoryRoutes_1.default);
    app.use(`${process.env.apiVersion}/instructors`, instructorRoutes_1.default);
    app.use(`${process.env.apiVersion}/students`, studentRoutes_1.default);
    app.use(`${process.env.apiVersion}/courses`, courseRoutes_1.default);
    app.use(`${process.env.apiVersion}/sections`, sectionRoutes_1.default);
    app.use(`${process.env.apiVersion}/lessons`, lessonRoutes_1.default);
    app.use(`${process.env.apiVersion}/articles`, articleRoutes_1.default);
    app.use(`${process.env.apiVersion}/videos`, videoRoutes_1.default);
    app.use(`${process.env.apiVersion}/quizzes`, quizRoutes_1.default);
    app.use(`${process.env.apiVersion}/payments`, paymentRoutes_1.default);
    app.use(`${process.env.apiVersion}/ratings`, ratingRoutes_1.default);
    app.use(`${process.env.apiVersion}/statistics`, statisticsRoutes_1.default);
    app.use(`${process.env.apiVersion}/coupons`, couponRoutes_1.default);
    app.use(`${process.env.apiVersion}/comments`, commentRoutes_1.default);
    app.use(`${process.env.apiVersion}/messages`, messageRoutes_1.default);
    // app.use(`${process.env.apiVersion}/whatsApp`, whatsAppRoute);
};
exports.routeMounting = routeMounting;
//# sourceMappingURL=routeMounting.js.map