"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelPermissionController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ModelPermission_1 = require("../types/ModelPermission");
const ResponseFormatter_1 = require("../responseFormatter/ResponseFormatter");
const HTTPStatusCode_1 = __importDefault(require("../enums/HTTPStatusCode"));
class ModelPermissionController {
    constructor() {
        this.getAllModelPermissions = (0, express_async_handler_1.default)(async (request, response, next) => {
            response.status(HTTPStatusCode_1.default.OK).json(ResponseFormatter_1.ResponseFormatter.formate(true, 'All models and their permissions are retrieved successfully', [{
                    allowedModels: ModelPermission_1.AllowedModels,
                    permissions: ModelPermission_1.Permissions
                }]));
        });
    }
}
exports.ModelPermissionController = ModelPermissionController;
//# sourceMappingURL=ModelPermissionController.js.map