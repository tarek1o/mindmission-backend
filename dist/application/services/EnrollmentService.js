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
exports.EnrollmentService = void 0;
const inversify_1 = require("inversify");
const Transaction_1 = require("../../infrastructure/services/Transaction");
let EnrollmentService = class EnrollmentService {
    constructor(enrollmentRepository, studentService, certificateService) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentService = studentService;
        this.certificateService = certificateService;
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
        return student === null || student === void 0 ? void 0 : student.id;
    }
    ;
    calcCurrentProgress(courseHours, completedLessonsTime) {
        const totalTimeForCompletedLessons = completedLessonsTime.reduce((curr, acc) => curr + acc.time, 0);
        const progress = +((totalTimeForCompletedLessons / courseHours) * 100).toFixed();
        return progress > 100 ? 100 : progress;
    }
    ;
    async createStudentCertificate(studentId, courseId, transaction) {
        await this.certificateService.create({
            data: {
                studentId,
                courseId,
            },
            select: {
                id: true,
            }
        }, transaction);
    }
    count(args) {
        return this.enrollmentRepository.count(args);
    }
    ;
    findMany(args) {
        return this.enrollmentRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.enrollmentRepository.findUnique(args);
    }
    ;
    findFirst(args) {
        return this.enrollmentRepository.findFirst(args);
    }
    ;
    async update(args, transaction) {
        const { courseId, userId, lessonId } = args.data;
        const studentId = await this.getStudentId(userId);
        return Transaction_1.Transaction.transact(async (prismaTransaction) => {
            var _a, _b;
            const enrollment = await this.enrollmentRepository.update({
                where: {
                    studentId_courseId: {
                        courseId,
                        studentId
                    }
                },
                data: {
                    completedLessons: {
                        connect: {
                            id: lessonId
                        }
                    }
                },
                select: {
                    id: true,
                    course: {
                        select: {
                            hours: true,
                            hasCertificate: true
                        }
                    },
                    completedLessons: {
                        select: {
                            time: true,
                        }
                    }
                },
            }, prismaTransaction);
            const progress = this.calcCurrentProgress((_a = enrollment.course) === null || _a === void 0 ? void 0 : _a.hours, enrollment.completedLessons);
            (progress === 100) && ((_b = enrollment.course) === null || _b === void 0 ? void 0 : _b.hasCertificate) && await this.createStudentCertificate(studentId, courseId, prismaTransaction);
            return this.enrollmentRepository.update({
                where: {
                    id: enrollment.id
                },
                data: {
                    progress
                },
                select: args.select,
                include: args.include
            }, prismaTransaction);
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.enrollmentRepository.delete(id, transaction);
    }
    ;
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IEnrollmentRepository')),
    __param(1, (0, inversify_1.inject)('IStudentService')),
    __param(2, (0, inversify_1.inject)('ICertificateService'))
], EnrollmentService);
//# sourceMappingURL=EnrollmentService.js.map