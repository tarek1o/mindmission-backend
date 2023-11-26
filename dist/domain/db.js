"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
    ],
});
if (((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "development") {
    prisma.$on('query', (e) => {
        // console.log(`Prisma query: \x1b[33m ${e.query.replace(/"public"\./g, '')} \x1b[0m`);
    });
}
exports.default = prisma;
//# sourceMappingURL=db.js.map