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
const updatedProjectController = (validatedProject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busco el projecto y compruebo y edito
        const projectDB = yield db_1.ProjectModel.findOne({
            where: { title: validatedProject.title }
        });
        if (!projectDB) {
            throw new Error("Project does not exist");
        }
        // Actualizo fundingCurrent
        const newFundingCurrent = validatedProject.addToFundingCurrent + projectDB.fundingCurrent;
        // Actualizo fundingPercentage
        const newFundingPercentage = (100 * newFundingCurrent) / projectDB.fundingGoal;
        yield db_1.ProjectModel.update({
            // Aquí se proporcionan los valores a actualizar
            fundingCurrent: newFundingCurrent,
            fundingPercentage: newFundingPercentage
        }, {
            // Aquí se especifica la condición de búsqueda
            where: {
                title: validatedProject.title
            }
        });
        return {
            message: `Successfully modified the value of fundingCurrent and fundingPercentage`
        };
    }
    catch (error) {
        const errorMessage = error.message ||
            "Unknown error while updating founding project";
        return { errorMessage };
    }
});
exports.default = updatedProjectController;
//# sourceMappingURL=updateFundingCurrentController.js.map