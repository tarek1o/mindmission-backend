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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const inversify_1 = require("inversify");
let QuizService = class QuizService {
    constructor(quizRepository) {
        this.quizRepository = quizRepository;
    }
    count(args) {
        return this.quizRepository.count(args);
    }
    ;
    findMany(args) {
        return this.quizRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.quizRepository.findUnique(args);
    }
    ;
    async update(args) {
        return this.quizRepository.update(args);
    }
    delete(id) {
        return this.quizRepository.delete(id);
    }
    ;
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IQuizRepository'))
], QuizService);
//# sourceMappingURL=QuizService.js.map