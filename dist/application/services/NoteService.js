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
exports.NoteService = void 0;
const inversify_1 = require("inversify");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let NoteService = class NoteService {
    constructor(noteRepository, studentService) {
        this.noteRepository = noteRepository;
        this.studentService = studentService;
    }
    async getStudentId(userId) {
        const student = await this.studentService.findUnique({
            where: {
                userId
            },
            select: {
                id: true
            }
        });
        if (!student) {
            throw new APIError_1.default('This student does not exist', HTTPStatusCode_1.default.BadRequest);
        }
        return student.id;
    }
    count(args) {
        return this.noteRepository.count(args);
    }
    ;
    findMany(args) {
        return this.noteRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.noteRepository.findUnique(args);
    }
    ;
    async upsert(args, transaction) {
        const { time, content, lessonId, userId } = args.data;
        const studentId = await this.getStudentId(userId);
        return this.noteRepository.upsert({
            where: {
                time_lessonId_studentId: {
                    studentId,
                    lessonId,
                    time
                }
            },
            update: {
                content
            },
            create: {
                content,
                time,
                lesson: {
                    connect: {
                        id: lessonId
                    }
                },
                student: {
                    connect: {
                        id: studentId
                    }
                }
            },
            select: args.select,
            include: args.include,
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.noteRepository.delete(id, transaction);
    }
    ;
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('INoteRepository')),
    __param(1, (0, inversify_1.inject)('IStudentService'))
], NoteService);
//# sourceMappingURL=NoteService.js.map