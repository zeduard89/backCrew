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
const projectSchemas_1 = require("../../schemas/projectSchemas");
const getAllUserProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creatorId = req.query.creatorId;
        projectSchemas_1.validatorString.parse(creatorId);
        if (!creatorId || creatorId === undefined) {
            throw new Error("UserId is required");
        }
        const user = yield db_1.UserModel.findByPk(creatorId);
        if (!user) {
            throw new Error("User not found");
        }
        const findedUser = yield db_1.UserModel.findOne({
            where: { id: user.id },
            include: [db_1.ProjectModel]
        });
        if (!findedUser || !findedUser.projects) {
            throw new Error("No Projects found");
        }
        return res.status(200).json(findedUser.projects);
    }
    catch (error) {
        console.error("Error fetching projects for user:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
});
exports.default = getAllUserProjects;
//# sourceMappingURL=getAllUserProjects.js.map