"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.AllowedModels = void 0;
exports.AllowedModels = {
    Users: 'user',
    Roles: 'role',
    Instructors: 'instructor',
    Students: 'student',
    Logs: "log",
    Categories: 'category',
    Courses: 'course',
    Wishlists: 'wishlist',
    Payments: 'payment',
    Enrollments: 'enrollment',
    Ratings: 'rating',
    Sections: 'section',
    Lessons: 'lesson',
    Videos: 'video',
    Articles: 'article',
    Quizzes: 'quiz',
    Comments: 'comment',
    Coupons: 'coupon',
    Messages: 'message',
    Certificates: 'certificate',
    CertificateTemplates: 'certificateTemplate',
};
exports.Permissions = {
    Read: 'get',
    Create: 'post',
    Update: 'patch',
    Delete: 'delete'
};
Object.freeze(exports.AllowedModels);
Object.freeze(exports.Permissions);
//# sourceMappingURL=ModelPermission.js.map