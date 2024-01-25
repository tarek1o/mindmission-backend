"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../DIContainer/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const noteValidator_1 = require("../middlewares/express-validator/noteValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllNotes, getNoteById, upsertNote, deleteNote } = DI_1.default.get('NoteController');
const noteRouter = express_1.default.Router();
noteRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Note', 'GET'), getAllNotes);
noteRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Note', 'GET'), getNoteById);
noteRouter.route("/upsert")
    .post(isAuthenticated, isAuthorized('Note', 'POST'), noteValidator_1.upsertNoteValidation, upsertNote);
noteRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Note', 'DELETE'), deleteNote);
exports.default = noteRouter;
//# sourceMappingURL=noteRoutes.js.map