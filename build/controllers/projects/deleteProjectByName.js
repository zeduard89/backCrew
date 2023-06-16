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
const deleteProyectByNameController = (validatedProject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectDB = yield db_1.ProjectModel.findOne({
            where: { title: validatedProject.title }
        });
        if (!projectDB)
            throw new Error("Projecto no encontrado");
        //* Si la condicion es FALSE la retorno a TRUE
        if (!validatedProject.displayProject) {
            const existingProject = yield db_1.ProjectModel.update({
                // Aquí se proporcionan los valores a actualizar
                displayProject: false
            }, {
                // Aquí se especifica la condición de búsqueda
                where: {
                    title: validatedProject.title
                }
            });
            if (!existingProject) {
                throw new Error("Project no existe");
            }
            return {
                message: `Cambio exitoso displayProject: ${validatedProject.displayProject}`
            };
        }
        //* Si la condicion es TRUE la retorno a FALSE
        const existingProject = yield db_1.ProjectModel.update({
            // Aquí se proporcionan los valores a actualizar
            displayProject: true
        }, {
            // Aquí se especifica la condición de búsqueda
            where: {
                title: validatedProject.title
            }
        });
        if (!existingProject) {
            throw new Error("Project no existe");
        }
        return {
            message: `Cambio exitoso displayProject: ${validatedProject.displayProject}`
        };
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al guardar ImagenAzure";
        return { errorMessage };
    }
});
exports.default = deleteProyectByNameController;
//# sourceMappingURL=deleteProjectByName.js.map