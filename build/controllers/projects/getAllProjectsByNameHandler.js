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
const getAllProyectByNameController = (validatedName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busco todos los projects, filtro y generalizo la escritura al buscarlos
        const allProjects = yield db_1.ProjectModel.findAll();
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
        // Limito la info del array
        const auxArray = [];
        newAllProjects.map((project) => {
            const auxProject = {
                id: project.id,
                title: project.title,
                description: project.description,
                shortDescription: project.shortDescription,
                fundingCurrent: project.fundingCurrent,
                fundingGoal: project.fundingGoal,
                fundingGoalReached: project.fundingGoalReached,
                fundingPercentage: project.fundingPercentage,
                fundingDayLeft: project.fundingDayLeft,
                likes: project.likes,
                disLikes: project.disLikes,
                category: project.category,
                bank: project.bank,
                account: project.account,
                location: project.location,
                projectFase: project.projectFase
            };
            return auxArray.push(auxProject);
        });
        return auxArray;
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al guardar ImagenAzure";
        return { errorMessage };
    }
});
exports.default = getAllProyectByNameController;
//# sourceMappingURL=getAllProjectsByNameHandler.js.map