"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = require("../container/DIContainer");
const QuizRepository_1 = require("../../../infrastructure/repositories/QuizRepository");
const QuizService_1 = require("../../../application/services/QuizService");
const QuizController_1 = require("../../controllers/QuizController");
DIContainer_1.container.bind('IQuizRepository').to(QuizRepository_1.QuizRepository).inSingletonScope();
DIContainer_1.container.bind('IQuizService').to(QuizService_1.QuizService).inSingletonScope();
DIContainer_1.container.bind('QuizController').to(QuizController_1.QuizController).inSingletonScope();
//# sourceMappingURL=quizDI.js.map