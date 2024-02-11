"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const MessageRepository_1 = require("../../../infrastructure/repositories/MessageRepository");
const MessageService_1 = require("../../../application/services/MessageService");
const MessageController_1 = require("../../controllers/MessageController");
DIContainer_1.container.bind('IMessageRepository').to(MessageRepository_1.MessageRepository).inSingletonScope();
DIContainer_1.container.bind('IMessageService').to(MessageService_1.MessageService).inSingletonScope();
DIContainer_1.container.bind('MessageController').to(MessageController_1.MessageController).inSingletonScope();
//# sourceMappingURL=messageDI.js.map