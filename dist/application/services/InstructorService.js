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
exports.InstructorService = void 0;
const inversify_1 = require("inversify");
const slugify_1 = __importDefault(require("slugify"));
let InstructorService = class InstructorService {
    constructor(instructorRepository) {
        this.instructorRepository = instructorRepository;
    }
    count(args) {
        return this.instructorRepository.count(args);
    }
    ;
    findMany(args) {
        return this.instructorRepository.findMany(args);
    }
    ;
    findUnique(args) {
        return this.instructorRepository.findUnique(args);
    }
    ;
    async update(args) {
        const { skills } = args.data;
        if (skills) {
            args.data.skills = {
                upsert: skills.map((skill) => {
                    const slug = (0, slugify_1.default)(skill.name, { lower: true, trim: true });
                    return {
                        where: {
                            slug_instructorId: {
                                instructorId: args.where.id,
                                slug,
                            },
                        },
                        update: {
                            name: skill.name,
                            slug
                        },
                        create: {
                            name: skill.name,
                            slug
                        }
                    };
                })
            };
        }
        return this.instructorRepository.update(args);
    }
    ;
};
exports.InstructorService = InstructorService;
exports.InstructorService = InstructorService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IInstructorRepository'))
], InstructorService);
//# sourceMappingURL=InstructorService.js.map