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
exports.CertificateTemplateController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const RequestManager_1 = require("../services/RequestManager");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const APIError_1 = __importDefault(require("../errorHandlers/APIError"));
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let CertificateTemplateController = class CertificateTemplateController {
    constructor(certificateTemplateService, logService) {
        this.certificateTemplateService = certificateTemplateService;
        this.logService = logService;
        this.getAllCertificateTemplates = (0, express_async_handler_1.default)(async (request, response, next) => {
            const findOptions = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const promiseResult = await Promise.all([
                this.certificateTemplateService.findMany(findOptions),
                this.certificateTemplateService.count({ where: findOptions.where })
            ]);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All certificate templates are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
        });
        this.getCertificateTemplateById = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const certificateTemplate = await this.certificateTemplateService.findUnique({
                where: {
                    id: +request.params.id,
                },
                select,
            });
            if (!certificateTemplate) {
                throw new APIError_1.default('This certificate template does not exist', HTTPStatusCode_1.default.BadRequest);
            }
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The certificate template is retrieved successfully', [certificateTemplate]));
        });
        this.createCertificateTemplate = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const createdCertificateTemplate = await this.certificateTemplateService.create({ data: Object.assign({}, request.body.input), select });
            this.logService.log("ADD", 'CERTIFICATE_TEMPLATE', createdCertificateTemplate, request.user);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The certificate template is created successfully', [createdCertificateTemplate]));
        });
        this.updateCertificateTemplate = (0, express_async_handler_1.default)(async (request, response, next) => {
            const { select } = RequestManager_1.RequestManager.findOptionsWrapper(request);
            const updatedCertificateTemplate = await this.certificateTemplateService.update({ data: Object.assign(Object.assign({}, request.body.input), { id: +request.params.id }), select });
            this.logService.log("UPDATE", 'CERTIFICATE_TEMPLATE', Object.assign(Object.assign({}, request.body.input), { id: +request.params.id }), request.user);
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'The certificate template is updated successfully', [updatedCertificateTemplate]));
        });
        this.deleteCertificateTemplate = (0, express_async_handler_1.default)(async (request, response, next) => {
            const deletedCertificateTemplate = await this.certificateTemplateService.delete(+request.params.id);
            this.logService.log("DELETE", 'CERTIFICATE_TEMPLATE', deletedCertificateTemplate, request.user);
            response.status(HTTPStatusCode_1.default.NoContent).json();
        });
    }
    ;
};
exports.CertificateTemplateController = CertificateTemplateController;
exports.CertificateTemplateController = CertificateTemplateController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICertificateTemplateService')),
    __param(1, (0, inversify_1.inject)('ILogService'))
], CertificateTemplateController);
//# sourceMappingURL=CertificateTemplateController.js.map