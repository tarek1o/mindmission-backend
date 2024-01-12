"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const Express_1 = __importDefault(require("./config/Express"));
const ServerCreator_1 = __importDefault(require("./config/ServerCreator"));
const logger_1 = __importDefault(require("./logger"));
const DI_1 = __importDefault(require("./dependencyInjection/DI"));
const NotFoundRoutesHandler_1 = __importDefault(require("./errorHandlers/NotFoundRoutesHandler"));
const GlobalErrorHandler_1 = __importDefault(require("./errorHandlers/GlobalErrorHandler"));
const UnhandledRejectionHandler_1 = __importDefault(require("./errorHandlers/UnhandledRejectionHandler"));
const routeMounting_1 = require("./routeMounting");
Express_1.default.use((0, cors_1.default)());
Express_1.default.options('*', (0, cors_1.default)());
Express_1.default.use(express_1.default.json({ limit: "50kb" }));
Express_1.default.use((0, logger_1.default)());
Express_1.default.use((0, compression_1.default)());
DI_1.default.get('RealTimeManager');
// upsertMainItemsIntoDB();
(0, routeMounting_1.routeMounting)(Express_1.default);
Express_1.default.all('*', NotFoundRoutesHandler_1.default.catchRoute);
Express_1.default.use(GlobalErrorHandler_1.default.catchError);
UnhandledRejectionHandler_1.default.catchError(ServerCreator_1.default);
//# sourceMappingURL=index.js.map