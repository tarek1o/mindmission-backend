"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DI_1 = __importDefault(require("../dependencyInjection/DI"));
const idValidation_1 = require("../middlewares/express-validator/idValidation");
const sectionValidator_1 = require("../middlewares/express-validator/sectionValidator");
const { isAuthenticated, isAuthorized } = DI_1.default.get('Authorization');
const { getAllSections, getSectionById, createSection, updateSection, deleteSection } = DI_1.default.get('SectionController');
const sectionRouter = express_1.default.Router();
sectionRouter.route("/get")
    .post(isAuthenticated, isAuthorized('Section', 'GET'), getAllSections);
sectionRouter.route("/get/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Section', 'GET'), getSectionById);
sectionRouter.route("/add")
    .post(isAuthenticated, isAuthorized('Section', 'POST'), sectionValidator_1.addSectionValidation, createSection);
sectionRouter.route("/update/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Section', 'PATCH'), sectionValidator_1.updateSectionValidation, updateSection);
sectionRouter.route("/delete/:id")
    .post(idValidation_1.idValidation, isAuthenticated, isAuthorized('Section', 'DELETE'), deleteSection);
exports.default = sectionRouter;
//# sourceMappingURL=sectionRoutes.js.map