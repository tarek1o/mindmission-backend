import express from "express"
import cors from 'cors';
import compression from 'compression';
import app from "./presentation/config/Express";
import server from "./presentation/config/ServerCreator";
import Logger from "./presentation/logger";
import container from "./presentation/DIContainer/DI";
import { RealTimeManager } from "./presentation/services/RealTimeManager";
import notFoundRoutes from "./presentation/errorHandlers/NotFoundRoutesHandler";
import GlobalError from "./presentation/errorHandlers/GlobalErrorHandler"
import UnhandledRejection from "./presentation/errorHandlers/UnhandledRejectionHandler";
import { routeMounting } from "./presentation/routeMounting";
import { upsertMainItemsIntoDB } from "./infrastructure/config/upsertMainItemsIntoDB";
import { seeding } from "./presentation/seed";

app.use(cors());
app.options('*', cors());
app.use(express.json({limit: "50kb"}));
app.use(Logger());
app.use(compression());

// container.get<RealTimeManager>('RealTimeManager');

// upsertMainItemsIntoDB();
// seeding();

routeMounting(app);

app.all('*', notFoundRoutes.catchRoute);

app.use(GlobalError.catchError);

UnhandledRejection.catchError(server);