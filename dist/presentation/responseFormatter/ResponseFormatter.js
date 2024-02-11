"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFormatter = void 0;
class ResponseFormatter {
    static formate(success, message, result = [], totalCount = 1, skip = 0, take = 0) {
        return {
            success: success,
            message: message,
            itemsPerPage: result.length,
            totalItems: totalCount,
            page: Math.floor(skip / take) + 1 || 1,
            pages: Math.ceil(totalCount / (result.length || 1)),
            data: result
        };
    }
    ;
}
exports.ResponseFormatter = ResponseFormatter;
;
//# sourceMappingURL=ResponseFormatter.js.map