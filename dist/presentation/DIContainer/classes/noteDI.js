"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const NoteRespository_1 = require("../../../infrastructure/repositories/NoteRespository");
const NoteService_1 = require("../../../application/services/NoteService");
const NoteController_1 = require("../../controllers/NoteController");
DIContainer_1.container.bind('INoteRepository').to(NoteRespository_1.NoteRepository).inSingletonScope();
DIContainer_1.container.bind('INoteService').to(NoteService_1.NoteService).inSingletonScope();
DIContainer_1.container.bind('NoteController').to(NoteController_1.NoteController).inSingletonScope();
//# sourceMappingURL=noteDI.js.map