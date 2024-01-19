"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertMainItemsIntoDB = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../domain/db"));
const ModelPermission_1 = require("../../presentation/types/ModelPermission");
const upsertMainItemsIntoDB = async () => {
    const { firstName, lastName, email, password } = process.env;
    const allowedModelsForInstructor = [
        {
            modelName: ModelPermission_1.AllowedModels.Users,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Instructors,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Students,
            permissions: [ModelPermission_1.Permissions.Read]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Categories,
            permissions: [ModelPermission_1.Permissions.Read]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Courses,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Enrollments,
            permissions: [ModelPermission_1.Permissions.Read]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Sections,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Lessons,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Videos,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Articles,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Quizzes,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Ratings,
            permissions: [ModelPermission_1.Permissions.Read]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Comments,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
    ];
    const allowedModelsForStudent = [
        {
            modelName: ModelPermission_1.AllowedModels.Users,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Students,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Instructors,
            permissions: [ModelPermission_1.Permissions.Read]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Categories,
            permissions: [ModelPermission_1.Permissions.Read]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Courses,
            permissions: [ModelPermission_1.Permissions.Read]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Sections,
            permissions: [ModelPermission_1.Permissions.Read]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Lessons,
            permissions: [ModelPermission_1.Permissions.Read]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Comments,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Wishlists,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Payments,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Enrollments,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Update]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Ratings,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
    ];
    const allowedModelsForSuperAdmin = [
        {
            modelName: ModelPermission_1.AllowedModels.Roles,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Users,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Instructors,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Students,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Logs,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Categories,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Courses,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Sections,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Lessons,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Enrollments,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Ratings,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Comments,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Coupons,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Create, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
        {
            modelName: ModelPermission_1.AllowedModels.Messages,
            permissions: [ModelPermission_1.Permissions.Read, ModelPermission_1.Permissions.Update, ModelPermission_1.Permissions.Delete]
        },
    ];
    await Promise.all([
        db_1.default.role.upsert({
            where: {
                slug: 'super-admin',
            },
            update: {
                allowedModels: allowedModelsForSuperAdmin
            },
            create: {
                name: 'Super Admin',
                slug: 'super-admin',
                description: "This is highly privileged and authoritative user role within a system or organization's administrative hierarchy.",
                allowedModels: allowedModelsForSuperAdmin,
                users: {
                    create: {
                        firstName: firstName || "Tarek",
                        lastName: lastName || "Eslam",
                        email: email || "tarekeslam159@gmail.com",
                        password: bcrypt_1.default.hashSync(password || "Ta123456789*", 10),
                        admin: {
                            create: {}
                        }
                    }
                }
            },
        }),
        db_1.default.role.upsert({
            where: {
                slug: 'instructor',
            },
            update: {
                allowedModels: allowedModelsForInstructor
            },
            create: {
                name: 'Instructor',
                slug: 'instructor',
                allowedModels: allowedModelsForInstructor
            },
        }),
        db_1.default.role.upsert({
            where: {
                slug: 'student',
            },
            update: {
                allowedModels: allowedModelsForStudent
            },
            create: {
                name: 'Student',
                slug: 'student',
                allowedModels: allowedModelsForStudent
            },
        })
    ]);
    console.log("The main items are upsert into the database successfully ✅");
};
exports.upsertMainItemsIntoDB = upsertMainItemsIntoDB;
//# sourceMappingURL=upsertMainItemsIntoDB.js.map