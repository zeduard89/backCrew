"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// import { loginUser } from "../controllers/user/postUserLogin"
const postUserRegister_1 = require("../controllers/user/postUserRegister");
const updateUserInfo_1 = require("../controllers/user/updateUserInfo");
const getUserInfo_1 = require("../controllers/user/getUserInfo");
const getAllUsers_1 = __importDefault(require("../controllers/user/getAllUsers"));
const getAllUserProjects_1 = __importDefault(require("../controllers/user/getAllUserProjects"));
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
exports.router = router;
// router.post("/login", loginUser)
router.post("/register", postUserRegister_1.registerUser);
router.get("/userDetails", getUserInfo_1.getUserInfo);
router.get("/getAllUsers", getAllUsers_1.default);
router.get("/getAllUsersProjects", getAllUserProjects_1.default);
router.put("/updateUserInfo", upload.single("file"), updateUserInfo_1.updateUserInfo);
//# sourceMappingURL=userRoute.js.map