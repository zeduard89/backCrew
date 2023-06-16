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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const commentSchema_1 = require("../schemas/commentSchema");
const postCommentController_1 = __importDefault(require("../controllers/comments/postCommentController"));
const router = (0, express_1.Router)();
exports.router = router;
router.post("/commentProject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment } = req.body;
        if (!comment)
            throw new Error("Ingrese un valor valido");
        // Valido la informacion
        const validatedComment = commentSchema_1.validatorComment.parse(comment);
        const newComment = yield (0, postCommentController_1.default)(validatedComment);
        res.status(200).json(newComment);
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar proyecto por Id";
        res.status(400).send(errorMessage);
    }
}));
//# sourceMappingURL=commentRoute.js.map