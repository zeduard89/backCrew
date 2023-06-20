"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../config/db");
const getProjectByIdController = (validatedName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busco todos los projects, filtro y generalizo la escritura al buscarlos
        const Project = yield db_1.ProjectModel.findByPk(validatedName);
        if (!Project)
            throw new Error("The project does not exist");
        return Project;
    }
    catch (error) {
        const errorMessage = error.message ||
            "Unknown error while searching for projects by Id";
        return { errorMessage };
    }
});
exports.default = getProjectByIdController;
//# sourceMappingURL=getProjectByIdController.js.map