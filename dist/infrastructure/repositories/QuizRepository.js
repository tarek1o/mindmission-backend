"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRepository = void 0;
const inversify_1 = require("inversify");
const db_1 = __importDefault(require("../../domain/db"));
let QuizRepository = class QuizRepository {
    constructor() { }
    count(args) {
        return db_1.default.quiz.count(args);
    }
    findMany(args) {
        return db_1.default.quiz.findMany(args);
    }
    findUnique(args) {
        return db_1.default.quiz.findUnique(args);
    }
    create(args) {
        return db_1.default.quiz.create(args);
    }
    update(args) {
        return db_1.default.quiz.update(args);
    }
    delete(id) {
        return db_1.default.quiz.delete({
            where: {
                id,
            }
        });
    }
};
exports.QuizRepository = QuizRepository;
exports.QuizRepository = QuizRepository = __decorate([
    (0, inversify_1.injectable)()
], QuizRepository);
//# sourceMappingURL=QuizRepository.js.map