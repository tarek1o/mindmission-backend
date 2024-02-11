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
exports.StudentService = void 0;
const inversify_1 = require("inversify");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let StudentService = class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async getStudentId(userId) {
        return this.findUnique({
            where: {
                userId
            },
            select: {
                id: true,
            }
        });
    }
    ;
    count(args) {
        return this.studentRepository.count(args);
    }
    ;
    findMany(args) {
        return this.studentRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.studentRepository.findUnique(args);
    }
    ;
    findFirst(args) {
        return this.studentRepository.findFirst(args);
    }
    ;
    async update(args, transaction) {
        const { userId, enrolledCourses, wishlistCourse } = args.data;
        const student = await this.getStudentId(userId);
        if (!student) {
            throw new APIError_1.default('This student is not exist', HTTPStatusCode_1.default.BadRequest);
        }
        const studentId = student.id;
        return this.studentRepository.update({
            where: {
                id: studentId
            },
            data: {
                enrollmentCourses: enrolledCourses ? {
                    upsert: enrolledCourses === null || enrolledCourses === void 0 ? void 0 : enrolledCourses.map(id => {
                        return {
                            where: {
                                studentId_courseId: {
                                    studentId,
                                    courseId: id
                                }
                            },
                            update: {
                                course: {
                                    connect: {
                                        id
                                    }
                                }
                            },
                            create: {
                                course: {
                                    connect: {
                                        id
                                    }
                                }
                            },
                        };
                    })
                } : undefined,
                wishlistCourses: wishlistCourse ? {
                    [wishlistCourse.operation]: {
                        id: wishlistCourse.courseId
                    }
                } : undefined
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IStudentRepository'))
], StudentService);
//# sourceMappingURL=StudentService.js.map