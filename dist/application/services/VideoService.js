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
exports.VideoService = void 0;
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
let VideoService = class VideoService {
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    count(args) {
        return this.videoRepository.count(args);
    }
    ;
    findMany(args) {
        return this.videoRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.videoRepository.findUnique(args);
    }
    ;
    async update(args) {
        if (args.data.title) {
            args.data.slug = (0, slugify_1.default)(args.data.title.toString(), { lower: true, trim: true });
        }
        return this.videoRepository.update(args);
    }
    delete(id) {
        return this.videoRepository.delete(id);
    }
    ;
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IVideoRepository'))
], VideoService);
//# sourceMappingURL=VideoService.js.map