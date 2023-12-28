"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const CreateServer_1 = __importDefault(require("./config/CreateServer"));
const logger_1 = __importDefault(require("./logger"));
const NotFoundRoutesHandler_1 = __importDefault(require("./errorHandlers/NotFoundRoutesHandler"));
const GlobalErrorHandler_1 = __importDefault(require("./errorHandlers/GlobalErrorHandler"));
const UnhandledRejectionHandler_1 = __importDefault(require("./errorHandlers/UnhandledRejectionHandler"));
const routeMounting_1 = require("./routeMounting");
const app = (0, express_1.default)();
const server = CreateServer_1.default.create(app);
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use(express_1.default.json({ limit: "50kb" }));
app.use((0, logger_1.default)());
app.use((0, compression_1.default)());
// upsertMainItemsIntoDB();
// (async () => {
//   const avgCourseRatings = await prisma.course.findUnique({
//     where: {
//       id: 1
//     },
//     select: {
//       chapters: {
//         where: {
//           lessons: {
//             every: {
//               lessonType: 'VIDEO',
//             }
//           }
//         },
//         select: {
//           lessons: true
//         }
//       }
//     }
//   });
//   console.log(avgCourseRatings?.chapters[0].lessons);
// })();
(0, routeMounting_1.routeMounting)(app);
app.all('*', NotFoundRoutesHandler_1.default.catchRoute);
app.use(GlobalErrorHandler_1.default.catchError);
UnhandledRejectionHandler_1.default.catchError(server);
//# sourceMappingURL=index.js.map