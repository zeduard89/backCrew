"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const diaryServices = __importStar(require("../controllers/diaryServices"));
const utils_1 = __importDefault(require("../utils/utils"));
const router = express_1.Router();
exports.router = router;
router.get('/', (_req, res) => {
    res.send(diaryServices.getEntriesWithouSensitiveInfo());
});
router.get('/:id', (req, res) => {
    const diary = diaryServices.findById(+req.params.id);
    return (diary != null)
        ? res.send(diary)
        : res.sendStatus(404);
});
router.post('/', (req, res) => {
    try {
        const newDiaryEntry = utils_1.default(req.body);
        const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);
        res.json(addedDiaryEntry);
    }
    catch (error) {
        res.status(400).send(error.message || 'Error Desconocido');
    }
});
//# sourceMappingURL=diaries.js.map