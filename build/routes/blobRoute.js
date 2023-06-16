"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const blob_1 = require("../controllers/azure/blob");
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", upload.single("file"), blob_1.uploadBlob); // Subir Archivo
router.get("/getAllFiles/:container", blob_1.getBlobList); // obtengo las urls del contenedor
router.get("/get/:container/:filename", blob_1.getBlob); // ver Archivo
router.get("/download/:container/:filename", blob_1.downloadBlob); // Para descargar los Archivos
router.delete("/delete", blob_1.deleteBlob); // Borrar un Archivo
//# sourceMappingURL=blobRoute.js.map