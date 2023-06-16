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
const getProyectByNameController = (validatedName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busco todos los projects, filtro y generalizo la escritura al buscarlos
        const allProjects = yield db_1.ProjectModel.findAll();
        const projectByName = allProjects.filter((project) => project.title.toLowerCase().trim().replace(/\s/g, "") ===
            validatedName.toLowerCase().trim().replace(/\s/g, ""));
        // Si el nombre exacto no existe en la DB, busco coincidencia
        if (!projectByName || projectByName.length === 0) {
            const newAllProjects = allProjects.filter((project) => {
                return project.title
                    .toLowerCase()
                    .trim()
                    .replace(/\s/g, "")
                    .includes(validatedName.toLowerCase().trim().replace(/\s/g, ""));
            });
            // Si obtengo un array vacio, retorno respusta STRING
            if (newAllProjects.length === 0)
                throw new Error("Project no existe");
            // Si obtengo resultados devuelvo un array de opciones
            const auxArray = [];
            newAllProjects.forEach((project) => auxArray.push(project.title));
            return auxArray;
        }
        // Limito la info del array
        const auxProject = {
            id: projectByName[0].id,
            title: projectByName[0].title,
            description: projectByName[0].description,
            shortDescription: projectByName[0].shortDescription,
            fundingCurrent: projectByName[0].fundingCurrent,
            fundingGoal: projectByName[0].fundingGoal,
            fundingGoalReached: projectByName[0].fundingGoalReached,
            fundingPercentage: projectByName[0].fundingPercentage,
            fundingDayLeft: projectByName[0].fundingDayLeft,
            likes: projectByName[0].likes,
            disLikes: projectByName[0].disLikes,
            category: projectByName[0].category,
            bank: projectByName[0].bank,
            account: projectByName[0].account,
            location: projectByName[0].location,
            projectFase: projectByName[0].projectFase
        };
        return auxProject;
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al guardar ImagenAzure";
        return { errorMessage };
    }
});
exports.default = getProyectByNameController;
//# sourceMappingURL=getProjectByNameHandler.js.map