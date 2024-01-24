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
exports.CertificateService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const inversify_1 = require("inversify");
const APIError_1 = __importDefault(require("../../presentation/errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../../presentation/enums/HTTPStatusCode"));
let CertificateService = class CertificateService {
    constructor(certificateRepository, certificateTemplateService, enrollmentRepository) {
        this.certificateRepository = certificateRepository;
        this.certificateTemplateService = certificateTemplateService;
        this.enrollmentRepository = enrollmentRepository;
    }
    ;
    async getEnrollmentInfo(courseId, studentId) {
        const enrollment = await this.enrollmentRepository.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                }
            },
            select: {
                student: {
                    select: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                },
                course: {
                    select: {
                        title: true,
                        hours: true,
                        instructor: {
                            select: {
                                user: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!enrollment) {
            throw new APIError_1.default('This student is not enrolled in this course', HTTPStatusCode_1.default.BadRequest);
        }
        return {
            courseTitle: enrollment.course.title,
            courseHours: enrollment.course.hours,
            instructorName: `${enrollment.course.instructor.user.firstName} ${enrollment.course.instructor.user.lastName}`,
            studentName: `${enrollment.student.user.firstName} ${enrollment.student.user.lastName}`
        };
    }
    ;
    async generateCertificateCode() {
        const certificateCode = crypto_1.default.randomBytes(16).toString('hex').toUpperCase();
        const isCodeExist = await this.findUnique({
            where: {
                certificateCode
            },
            select: {
                certificateCode: true
            }
        });
        if (isCodeExist) {
            return await this.generateCertificateCode();
        }
        return certificateCode;
    }
    ;
    async getCertificateTemplate() {
        return await this.certificateTemplateService.findFirst({
            where: {
                isDefault: true
            },
            select: {
                templateURL: true
            }
        });
    }
    async generateCertificate(certificate, templateURL) {
        const generateCertificateURL = process.env.GenerateCertificateURL || '';
        const response = await fetch(generateCertificateURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.assign(Object.assign({}, certificate), { templateURL }))
        });
        if (response.status !== HTTPStatusCode_1.default.Created) {
            const error = await response.json();
            throw error;
        }
        const result = await response.json();
        return result.data[0];
    }
    count(args) {
        return this.certificateRepository.count(args);
    }
    ;
    findMany(args) {
        return this.certificateRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.certificateRepository.findUnique(args);
    }
    ;
    async create(args, transaction) {
        const { courseId, studentId } = args.data;
        const isCertificateExist = await this.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
            select: args.select,
            include: args.include
        });
        if (isCertificateExist) {
            return isCertificateExist;
        }
        const certificateTemplate = await this.getCertificateTemplate();
        if (!certificateTemplate) {
            throw new APIError_1.default('Their is no default template can be used to generate a certificate, please contact with admin to provide one', HTTPStatusCode_1.default.BadRequest);
        }
        const { courseTitle, courseHours, instructorName, studentName } = await this.getEnrollmentInfo(courseId, studentId);
        const certificateCode = await this.generateCertificateCode();
        const { imgUrl, pdfUrl } = await this.generateCertificate({ certificateCode, courseTitle, courseHours, instructorName, studentName }, certificateTemplate.templateURL);
        return this.certificateRepository.create({
            data: {
                courseTitle,
                courseHours,
                instructorName,
                studentName,
                certificateCode,
                imgUrl,
                pdfUrl,
                course: {
                    connect: {
                        id: courseId
                    }
                },
                student: {
                    connect: {
                        id: studentId
                    }
                }
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    async update(args, transaction) {
        const { id, imgUrl, pdfUrl } = args.data;
        return this.certificateRepository.update({
            where: {
                id
            },
            update: {
                imgUrl,
                pdfUrl
            },
            select: args.select,
            include: args.include
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.certificateRepository.delete(id, transaction);
    }
    ;
};
exports.CertificateService = CertificateService;
exports.CertificateService = CertificateService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICertificateRepository')),
    __param(1, (0, inversify_1.inject)('ICertificateTemplateService')),
    __param(2, (0, inversify_1.inject)('IEnrollmentRepository'))
], CertificateService);
//# sourceMappingURL=CertificateService.js.map