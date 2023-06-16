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
exports.getUserInfo = void 0;
const db_1 = require("../../config/db");
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield db_1.UserModel.findOne({ where: { email } });
        if (user == null) {
            throw new Error("User not found");
        }
        if ((user === null || user === void 0 ? void 0 : user.access) === true) {
            res.status(200).json({ user });
        }
        else
            throw new Error("Access denied");
    }
    catch (error) {
        const errorMessage = error.message || "Unknown error searching for user";
        res.status(409).send(errorMessage);
    }
});
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=getUserInfo.js.map