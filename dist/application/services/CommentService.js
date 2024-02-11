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
exports.CommentService = void 0;
const inversify_1 = require("inversify");
let CommentService = class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    count(args) {
        return this.commentRepository.count(args);
    }
    ;
    findMany(args) {
        return this.commentRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.commentRepository.findUnique(args);
    }
    ;
    create(args, transaction) {
        const { content, lessonId, parentId, userId } = args.data;
        return this.commentRepository.create({
            data: {
                content,
                lesson: {
                    connect: {
                        id: lessonId,
                    }
                },
                parent: parentId ? {
                    connect: {
                        id: parentId
                    }
                } : undefined,
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    update(args, transaction) {
        const { id, content } = args.data;
        return this.commentRepository.update({
            where: {
                id
            },
            data: {
                content: content || undefined
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.commentRepository.delete(id, transaction);
    }
    ;
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICommentRepository'))
], CommentService);
//# sourceMappingURL=CommentService.js.map