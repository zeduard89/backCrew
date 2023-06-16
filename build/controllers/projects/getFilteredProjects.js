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
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
// sort
const sortByTrending = (a, b) => a.likes - b.likes;
const orderByMostFunding = (a, b) => a.fundingCurrent - b.fundingCurrent;
// function to slice array existingProjects
function divideArray(array, size) {
    if (array.length <= size) {
        return [array];
    }
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        result.push(chunk);
    }
    return result;
}
// Controller   
const getFilteredProjects = (validatedCategory, validatedSort, validatedQ, validatedP, validatedS) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let whereClause = {}; // Objet to record the filter orders
        // Category Filter
        if (validatedCategory !== "all") {
            whereClause = Object.assign(Object.assign({}, whereClause), { categories: {
                    [sequelize_1.Op.contains]: [validatedCategory],
                } });
        }
        // Query search
        if (validatedQ) {
            const words = validatedQ.split("_");
            const titleClauses = words.map((word) => ({
                title: {
                    [sequelize_1.Op.substring]: word,
                },
            }));
            whereClause = Object.assign(Object.assign({}, whereClause), { [sequelize_1.Op.and]: titleClauses });
        }
        let existingProjects = yield db_1.ProjectModel.findAll({ where: whereClause });
        if (existingProjects.length === 0) {
            throw new Error("No hay proyectos que cumplan los criterios de búsqueda");
        }
        // Trending sort & Most funded sort
        validatedSort === "trending"
            ? existingProjects = existingProjects.sort(sortByTrending)
            : existingProjects = existingProjects.sort(orderByMostFunding);
        // Slice existingProjects for deliver to Front by infiniteScroll
        const size = parseInt(validatedS);
        const dividedArrayProjects = divideArray(existingProjects, size);
        const validatedPIndex = parseInt(validatedP);
        if (validatedPIndex >= dividedArrayProjects.length) {
            throw new Error("No hay más projectos que mostrar");
        }
        if (validatedPIndex === dividedArrayProjects.length - 1) {
            return {
                projects: dividedArrayProjects[validatedPIndex],
                limit: "No hay más que mostrar",
            };
        }
        return {
            projects: dividedArrayProjects[validatedPIndex],
        };
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al obtener proyectos filtrados";
        return { errorMessage };
    }
});
exports.default = getFilteredProjects;
//# sourceMappingURL=getFilteredProjects.js.map