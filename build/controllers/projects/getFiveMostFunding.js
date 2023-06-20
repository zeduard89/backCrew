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
// sort
const orderByMostFunding = (a, b) => b.fundingCurrent - a.fundingCurrent;
// Controller   
const getFiveMostFunding = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let existingProjects = yield db_1.ProjectModel.findAll();
        if (existingProjects.length === 0) {
            throw new Error("There are no projects with this parameters");
        }
        //  Most funded sort
        existingProjects = existingProjects.sort(orderByMostFunding);
        // Slice existingProjects for deliver to Front by most funded
        const fiveMostFunding = existingProjects.slice(0, 5);
        return fiveMostFunding;
    }
    catch (error) {
        const errorMessage = error.message || "Unknown error while fetching most funded projects.";
        return { errorMessage };
    }
});
exports.default = getFiveMostFunding;
//# sourceMappingURL=getFiveMostFunding.js.map