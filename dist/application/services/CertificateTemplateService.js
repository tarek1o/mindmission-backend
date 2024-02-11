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
exports.CertificateTemplateService = void 0;
const inversify_1 = require("inversify");
let CertificateTemplateService = class CertificateTemplateService {
    constructor(certificateTemplateRepository) {
        this.certificateTemplateRepository = certificateTemplateRepository;
    }
    count(args) {
        return this.certificateTemplateRepository.count(args);
    }
    ;
    findMany(args) {
        return this.certificateTemplateRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.certificateTemplateRepository.findUnique(args);
    }
    ;
    findFirst(args) {
        return this.certificateTemplateRepository.findFirst(args);
    }
    ;
    create(args, transaction) {
        const { templateURL, isDefault } = args.data;
        return this.certificateTemplateRepository.create({
            data: {
                templateURL,
                isDefault
            },
            select: args.select,
        }, transaction);
    }
    ;
    update(args, transaction) {
        const { id, templateURL, isDefault } = args.data;
        return this.certificateTemplateRepository.update({
            where: {
                id
            },
            update: {
                templateURL,
                isDefault
            },
            select: args.select,
        }, transaction);
    }
    ;
    delete(id, transaction) {
        return this.certificateTemplateRepository.delete(id, transaction);
    }
    ;
};
exports.CertificateTemplateService = CertificateTemplateService;
exports.CertificateTemplateService = CertificateTemplateService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICertificateTemplateRepository'))
], CertificateTemplateService);
//# sourceMappingURL=CertificateTemplateService.js.map