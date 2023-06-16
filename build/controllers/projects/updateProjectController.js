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
        // Compruebo que no exista un nombre igual
        const projectDBname = yield db_1.ProjectModel.findOne({
            where: { title: validatedProject.title }
        });
        if (projectDBname)
            throw new Error("El titulo ya existe");
        // Busco el projecto y lo edito
        const projectDB = yield db_1.ProjectModel.findOne({
            where: { id: validatedProject.id }
        });
        // Si no existe retorno mensaje
        if (!projectDB)
            throw new Error("Project no existe");
        // caso contrario Lo edito
        yield db_1.ProjectModel.update({
            // Aquí se proporcionan los valores a actualizar
            title: validatedProject.title || projectDB.title,
            description: validatedProject.description || projectDB.description,
            shortDescription: validatedProject.shortDescription || projectDB.shortDescription,
            fundingGoal: validatedProject.fundingGoal || projectDB.fundingGoal,
            fundingDayLeft: validatedProject.fundingDayLeft || projectDB.fundingDayLeft,
            category: validatedProject.category || projectDB.category
            // bank: validatedProject.banco || projectDB.banco,
            // account: validatedProject.cuenta || projectDB.cuenta,
            // location: validatedProject.country || projectDB.country
        }, {
            // Aquí se especifica la condición de búsqueda
            where: {
                id: validatedProject.id
            }
        });
        return {
            message: `Cambio exitoso del projecto con ID: ${projectDB.id}`
        };
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al guardar ImagenAzure";
        return { errorMessage };
    }
});
exports.default = updatedProjectController;
//# sourceMappingURL=updateProjectController.js.map