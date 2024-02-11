"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const RequestManager_1 = require("../services/RequestManager");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let NoteController = class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
        this.getAllNotes = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.noteService.findMany(findOptions),
                this.noteService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All notes are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getNoteById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const note = await this.noteService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
                include
            });
            if (!note) {
                throw new APIError_1.default('This note does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The note is retrieved successfully', [note]));
        });
        this.upsertNote = (0, express_async_handler_1.default)(async (request, response, next) => {
            var _a;
            const { select, include } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const updatedNote = await this.noteService.upsert({
                data: Object.assign(Object.assign({}, request.body.input), { userId: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id }),
                select,
                include,
            });
            response.status(HTTPStatusCode_1.default.Created).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The note is recorded successfully', [updatedNote]));
        });
        this.deleteNote = (0, express_async_handler_1.default)(async (request, response, next) => {
            await this.noteService.delete(+request.params.id);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
    ;
};
exports.NoteController = NoteController;
exports.NoteController = NoteController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('INoteService'))
], NoteController);
//# sourceMappingURL=NoteController.js.map