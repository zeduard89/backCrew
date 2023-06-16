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
exports.registerUser = void 0;
const db_1 = require("../../config/db");
const handleBcrypt_1 = require("../../utils/handleBcrypt");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastName, email, password } = req.body;
        const user = yield db_1.UserModel.findOne({ where: { email } });
        if (user != null) {
            throw new Error("Email already used");
        }
        const passwordHash = yield (0, handleBcrypt_1.encrypt)(password);
        const registerUser = yield db_1.UserModel.create({
            name,
            lastName,
            email,
            password: passwordHash,
            access: false
        });
        res.status(200).send({ registerUser });
    }
    catch (error) {
        const errorMessage = error.message || "Unknown error registering user";
        res.status(400).send(errorMessage);
    }
});
exports.registerUser = registerUser;
//# sourceMappingURL=postUserRegister.js.map