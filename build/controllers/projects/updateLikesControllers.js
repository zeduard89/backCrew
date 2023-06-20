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
const updateLikesController = (validatedProject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busco el projecto y compruebo y edito
        const projectDB = yield db_1.ProjectModel.findOne({
            where: { title: validatedProject.title }
        });
        if (!projectDB) {
            throw new Error("The project does not exist");
        }
        // Actualizo fundingCurrent
        const newLikes = validatedProject.likes + projectDB.likes;
        const newDisLikes = validatedProject.disLikes + projectDB.disLikes;
        yield db_1.ProjectModel.update({
            // Aquí se proporcionan los valores a actualizar
            likes: newLikes,
            disLikes: newDisLikes
        }, {
            // Aquí se especifica la condición de búsqueda
            where: {
                title: validatedProject.title
            }
        });
        return {
            message: `Successfully modified the values of likes: ${newLikes} and dislikes: ${newDisLikes}`
        };
    }
    catch (error) {
        const errorMessage = error.message || "Unknown error while updating likes";
        return { errorMessage };
    }
});
exports.default = updateLikesController;
//# sourceMappingURL=updateLikesControllers.js.map