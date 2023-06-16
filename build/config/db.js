"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.CommentModel = exports.ProjectModel = exports.UserModel = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
exports.UserModel = UserModel_1.default;
const ProjectModel_1 = __importDefault(require("../models/ProjectModel"));
exports.ProjectModel = ProjectModel_1.default;
const CommentModel_1 = __importDefault(require("../models/CommentModel"));
exports.CommentModel = CommentModel_1.default;
const AdminModel_1 = __importDefault(require("../models/AdminModel"));
exports.AdminModel = AdminModel_1.default;
dotenv_1.default.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const sequelize = new sequelize_typescript_1.Sequelize(`postgres://${DB_USER !== null && DB_USER !== void 0 ? DB_USER : ""}:${DB_PASSWORD !== null && DB_PASSWORD !== void 0 ? DB_PASSWORD : ""}@${DB_HOST !== null && DB_HOST !== void 0 ? DB_HOST : ""}:${DB_PORT !== null && DB_PORT !== void 0 ? DB_PORT : ""}/${DB_NAME !== null && DB_NAME !== void 0 ? DB_NAME : ""}`, {
    logging: false,
    native: false,
    models: [UserModel_1.default, ProjectModel_1.default, CommentModel_1.default, AdminModel_1.default]
});
exports.sequelize = sequelize;
sequelize.addModels([UserModel_1.default, ProjectModel_1.default, CommentModel_1.default, AdminModel_1.default]);
//# sourceMappingURL=db.js.map