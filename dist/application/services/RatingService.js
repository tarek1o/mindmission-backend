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
exports.RatingService = void 0;
const inversify_1 = require("inversify");
let RatingService = class RatingService {
    constructor(ratingRepository) {
        this.ratingRepository = ratingRepository;
    }
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
    delete(id) {
        return this.ratingRepository.delete(id);
    }
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IRatingRepository'))
], RatingService);
//# sourceMappingURL=RatingService.js.map