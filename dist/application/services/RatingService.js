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
exports.RatingService = void 0;
const inversify_1 = require("inversify");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let RatingService = class RatingService {
    constructor(ratingRepository, enrollmentService) {
        this.ratingRepository = ratingRepository;
        this.enrollmentService = enrollmentService;
    }
    isStudentEnrollInThisCourse(userId, courseId) {
        return this.enrollmentService.findFirst({
            where: {
                student: {
                    userId
                },
                courseId
            },
            select: {
                studentId: true,
                course: {
                    select: {
                        instructorId: true
                    }
                }
            }
        });
    }
    ;
    aggregate(args) {
        return this.ratingRepository.aggregate(args);
    }
    count(args) {
        return this.ratingRepository.count(args);
    }
    ;
    findMany(args) {
        return this.ratingRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.ratingRepository.findUnique(args);
    }
    ;
    async upsert(args, transaction) {
        var _a;
        const { userId, courseId, commentForCourse, commentForInstructor, courseRate, instructorRate } = args.data;
        const enrollment = await this.isStudentEnrollInThisCourse(userId, courseId);
        if (!enrollment) {
            throw new APIError_1.default('The current student cannot rate the course not enroll in', HTTPStatusCode_1.default.Forbidden);
        }
        const studentId = enrollment.studentId;
        const instructorId = (_a = enrollment.course) === null || _a === void 0 ? void 0 : _a.instructorId;
        return this.ratingRepository.upsert({
            where: {
                studentId_courseId_instructorId: {
                    courseId,
                    studentId,
                    instructorId
                }
            },
            update: {
                commentForCourse,
                commentForInstructor,
                courseRate,
                instructorRate,
            },
            create: {
                commentForCourse,
                commentForInstructor,
                courseRate,
                instructorRate,
                student: {
                    connect: {
                        id: studentId
                    }
                },
                course: {
                    connect: {
                        id: courseId
                    }
                },
                instructor: {
                    connect: {
                        id: instructorId
                    }
                },
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.ratingRepository.delete(id, transaction);
    }
    ;
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IRatingRepository')),
    __param(1, (0, inversify_1.inject)('IEnrollmentService'))
], RatingService);
//# sourceMappingURL=RatingService.js.map