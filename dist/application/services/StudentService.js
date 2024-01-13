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
    constructor(studentRepository, courseService) {
        this.studentRepository = studentRepository;
        this.courseService = courseService;
    }
    isStudentEnrollInThCourse(userId, courseId) {
        return this.studentRepository.findFirst({
            where: {
                userId,
                enrolledCourses: {
                    some: {
                        id: courseId
                    }
                }
            },
            select: {
                id: true
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
    async update(args) {
        const { userId, enrolledCourses, ratings, wishlistCourse } = args.data;
        let instructorId = 0;
        let studentId = 0;
        if (ratings) {
            const isCourseExist = await this.courseService.findUnique({
                where: {
                    id: ratings.courseId,
                },
                select: {
                    instructorId: true
                }
            });
            if (!isCourseExist) {
                throw new APIError_1.default("This course does not exist", HTTPStatusCode_1.default.BadRequest);
            }
            const student = await this.isStudentEnrollInThCourse(userId, ratings.courseId);
            if (!student) {
                throw new APIError_1.default('The current student cannot rate the course not enroll in', HTTPStatusCode_1.default.Forbidden);
            }
            studentId = student.id;
            instructorId = isCourseExist.instructorId;
        }
        return this.studentRepository.update({
            where: {
                userId
            },
            data: {
                ratings: ratings ? {
                    upsert: {
                        where: {
                            studentId_courseId_instructorId: {
                                studentId,
                                instructorId,
                                courseId: ratings.courseId,
                            },
                        },
                        update: {
                            commentForCourse: ratings.commentForCourse,
                            commentForInstructor: ratings.commentForInstructor,
                            courseRate: ratings.courseRate,
                            instructorRate: ratings.instructorRate
                        },
                        create: {
                            commentForCourse: ratings.commentForCourse,
                            commentForInstructor: ratings.commentForInstructor,
                            courseRate: ratings.courseRate,
                            instructorRate: ratings.instructorRate,
                            course: {
                                connect: {
                                    id: ratings.courseId
                                },
                            },
                            instructor: {
                                connect: {
                                    id: instructorId
                                }
                            }
                        }
                    }
                } : undefined,
                enrolledCourses: enrolledCourses ? {
                    connect: enrolledCourses === null || enrolledCourses === void 0 ? void 0 : enrolledCourses.map(id => {
                        return {
                            id
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
        });
    }
    ;
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IStudentRepository')),
    __param(1, (0, inversify_1.inject)("ICourseService"))
], StudentService);
//# sourceMappingURL=StudentService.js.map