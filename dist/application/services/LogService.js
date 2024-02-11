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
exports.LogService = void 0;
const inversify_1 = require("inversify");
let LogService = class LogService {
    constructor(logRepository) {
        this.logRepository = logRepository;
    }
    count(args) {
        return this.logRepository.count(args);
    }
    ;
    findMany(args) {
        return this.logRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.logRepository.findUnique(args);
    }
    ;
    async log(operationType, ModelName, details, user) {
        var _a, _b;
        if (((_a = user === null || user === void 0 ? void 0 : user.role) === null || _a === void 0 ? void 0 : _a.slug) !== 'student' && ((_b = user === null || user === void 0 ? void 0 : user.role) === null || _b === void 0 ? void 0 : _b.slug) !== 'instructor') {
            const log = await this.logRepository.log({
                data: {
                    operationType,
                    ModelName,
                    details,
                    user: {
                        connect: {
                            id: user === null || user === void 0 ? void 0 : user.id,
                        }
                    }
                }
            });
            return log;
        }
        ;
    }
    ;
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ILogRepository'))
], LogService);
//# sourceMappingURL=LogService.js.map