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
exports.StatisticsController = void 0;
const inversify_1 = require("inversify");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
let StatisticsController = class StatisticsController {
    constructor(courseService, ratingService, instructorService, enrollmentService) {
        this.courseService = courseService;
        this.ratingService = ratingService;
        this.instructorService = instructorService;
        this.enrollmentService = enrollmentService;
        this.getMainStatistics = (0, express_async_handler_1.default)(async (request, response, next) => {
            const promiseResult = await Promise.all([
                this.getAvailableCoursesCount(),
                this.getSuccessfulLearnsCount(),
                this.getFiveStarInstructorsCount(),
                this.getRatingAvgForAllCourses(),
            ]);
            const [availableCoursesCount, successfulLearnsCount, fiveStarInstructorsCount, ratingAvgForAllCourses] = promiseResult;
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All statistics are retrieved successfully', [
                {
                    availableCoursesCount,
                    successfulLearnsCount,
                    fiveStarInstructorsCount,
                    ratingAvgForAllCourses
                }
            ]));
        });
    }
    async getAvailableCoursesCount() {
        return this.courseService.count({
            where: {
                isApproved: {
                    equals: true
                },
                isDraft: {
                    equals: false
                },
            }
        });
    }
    ;
    async getSuccessfulLearnsCount() {
        return this.enrollmentService.count({
            where: {
                progress: {
                    equals: 100
                }
            }
        });
    }
    ;
    async getRatingAvgForAllCourses() {
        var _a;
        const aggregateResult = await this.ratingService.aggregate({
            _avg: {
                courseRate: true
            },
        });
        return ((_a = aggregateResult._avg) === null || _a === void 0 ? void 0 : _a.courseRate) || 0;
    }
    ;
    async getFiveStarInstructorsCount() {
        return this.instructorService.count({
            where: {
                ratings: {
                    every: {
                        instructorRate: {
                            gte: 4.5
                        }
                    }
                }
            },
        });
    }
    ;
};
exports.StatisticsController = StatisticsController;
exports.StatisticsController = StatisticsController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('ICourseService')),
    __param(1, (0, inversify_1.inject)("IRatingService")),
    __param(2, (0, inversify_1.inject)("IInstructorService")),
    __param(3, (0, inversify_1.inject)("IEnrollmentService"))
], StatisticsController);
//# sourceMappingURL=StatisticsController.js.map