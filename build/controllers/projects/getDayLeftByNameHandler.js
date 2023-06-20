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
const getLeftDayByNameController = (validatedName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProjects = yield db_1.ProjectModel.findAll();
        const existingProject = allProjects.filter((project) => project.title.toLowerCase().trim().replace(/\s/g, "") ===
            validatedName.toLowerCase().trim().replace(/\s/g, ""));
        if (!existingProject) {
            throw new Error("Project no existe");
        }
        //! Logica para fecha limite
        // Obtengo la cantidad de milisegundos desde 1/1/1970 hasta la creacion
        const createdAtDate = new Date(existingProject[0].createdAt).getTime();
        // Obtengo los milisegundos de la fecha limite impuesta
        const limitDays = existingProject[0].fundingDayLeft * 24 * 60 * 60 * 1000;
        // Sumo ambos valores (sin newDate es solo numerico)
        const deadlineDate = new Date(createdAtDate + limitDays);
        // Obtener días restantes
        const currentDate = new Date();
        const remainingTime = deadlineDate.getTime() - currentDate.getTime();
        const remainingDays = Math.ceil(remainingTime / (24 * 60 * 60 * 1000));
        // Obtener componentes individuales de la fecha límite
        const limitDate = {
            year: deadlineDate.getFullYear(),
            month: deadlineDate.getMonth() + 1,
            day: deadlineDate.getDate(),
            hours: deadlineDate.getHours(),
            minutes: deadlineDate.getMinutes(),
            seconds: deadlineDate.getSeconds(),
            daysLeft: remainingDays
        };
        return limitDate;
    }
    catch (error) {
        const errorMessage = error.message ||
            "Unknown error while searching for dayleft by name";
        return { errorMessage };
    }
});
exports.default = getLeftDayByNameController;
//# sourceMappingURL=getDayLeftByNameHandler.js.map