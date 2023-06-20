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
const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingProject = yield db_1.ProjectModel.findAll();
        if (Object.keys(existingProject).length === 0) {
            throw new Error("There are no projects in the DB");
        }
        return existingProject;
    }
    catch (error) {
        const errorMessage = error.message || "Unknown error while retrieving all projects";
        return { errorMessage };
    }
});
exports.default = getAllProjects;
//# sourceMappingURL=getAllProjects.js.map