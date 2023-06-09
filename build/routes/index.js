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
exports.router = void 0;
const express_1 = require("express");
const fs_1 = require("fs");
// __dirname nos devuelve la ruta del directorio actual
const PATH_ROUTER = `${__dirname}`;
const router = express_1.Router();
exports.router = router;
const cleanFileName = (fileName) => {
    var _a;
    const file = (_a = fileName.split('.').shift()) !== null && _a !== void 0 ? _a : '';
    return file;
};
// Funcion Async que se encarga de leer cuantos/cuales archivos hay en el directorio
// devolviendo un array de los nombre de estos archivos
const loadRouters = () => __awaiter(void 0, void 0, void 0, function* () {
    const files = fs_1.readdirSync(PATH_ROUTER);
    for (const fileName of files) {
        const cleanName = cleanFileName(fileName);
        if (cleanName !== 'index') {
            const moduleRouter = yield Promise.resolve().then(() => __importStar(require(`./${cleanName}`)));
            router.use(`/${cleanName}`, moduleRouter.router);
        }
    }
});
loadRouters()
    .then(() => {
    console.log('Routers cargados exitosamente');
})
    .catch((error) => {
    console.error('Error al cargar los routers:', error);
});
//# sourceMappingURL=index.js.map