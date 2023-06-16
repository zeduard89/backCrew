"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const postUserLogin_1 = require("../controllers/user/postUserLogin");
const postUserRegister_1 = require("../controllers/user/postUserRegister");
const updateUserDelete_1 = require("../controllers/user/updateUserDelete");
const postUserImage_1 = require("../controllers/user/postUserImage");
const getUserInfo_1 = require("../controllers/user/getUserInfo");
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
exports.router = router;
router.post("/login", postUserLogin_1.loginUser);
router.post("/register", postUserRegister_1.registerUser);
router.post("/uploadImage", upload.single("file"), postUserImage_1.uploadImageUser);
router.get("/user", getUserInfo_1.getUserInfo);
router.put("/delete", updateUserDelete_1.deleteUser);
//# sourceMappingURL=userRoute.js.map