"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temperaments = exports.Dog = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const Dog_1 = __importDefault(require("../models/Dog"));
const Temperaments_1 = __importDefault(require("../models/Temperaments"));
dotenv_1.default.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const sequelize = new sequelize_typescript_1.Sequelize(`postgres://${DB_USER !== null && DB_USER !== void 0 ? DB_USER : ''}:${DB_PASSWORD !== null && DB_PASSWORD !== void 0 ? DB_PASSWORD : ''}@${DB_HOST !== null && DB_HOST !== void 0 ? DB_HOST : ''}:${DB_PORT !== null && DB_PORT !== void 0 ? DB_PORT : ''}/${DB_NAME !== null && DB_NAME !== void 0 ? DB_NAME : ''}`, {
    logging: false,
    native: false
});
exports.sequelize = sequelize;
const Dog = Dog_1.default(sequelize);
exports.Dog = Dog;
const Temperaments = Temperaments_1.default(sequelize);
exports.Temperaments = Temperaments;
//# sourceMappingURL=db.js.map