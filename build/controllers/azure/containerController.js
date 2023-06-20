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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listContainer = exports.deleteContainer = exports.createContainer = void 0;
// esta clase me permite conectarme con azureCStore
const storage_blob_1 = require("@azure/storage-blob");
// Cargamos las variables de entorno con config y la ejecuto para conectar
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!connectionString) {
    throw new Error("Azure Storage connection string is not configured");
}
const blobService = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString); // conexion
// Creo un contendor
const createContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { container } = req.body;
        if (!container)
            throw new Error("Please enter a valid container value");
        // Buscamos si existe el contenedor
        const containerClient = blobService.getContainerClient(container);
        const containerExist = yield containerClient.exists();
        if (containerExist) {
            throw new Error(`The container "${container}" already exists`);
        }
        yield blobService.createContainer(container);
        res.status(200).json({
            message: `The container "${container}" was created successfully`
        });
    }
    catch (error) {
        const errorMessage = error.message || "Unknown error while creating a container";
        res.status(500).send(errorMessage);
    }
});
exports.createContainer = createContainer;
// Borrar un contendor
const deleteContainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { container } = req.body;
        if (!container)
            throw new Error("Please enter a valid container value");
        // Buscamos si existe el contenedor
        const containerClient = blobService.getContainerClient(container);
        const containerExist = yield containerClient.exists();
        if (!containerExist) {
            throw new Error(`The container "${container}" does not exist`);
        }
        blobService.deleteContainer(container);
        res.json({
            message: `The container "${container}" was successfully deleted`
        });
    }
    catch (error) {
        const errorMessage = error.message || "Unknown error while deleting a container";
        res.status(500).send(errorMessage);
    }
});
exports.deleteContainer = deleteContainer;
// Listar un contendor
const listContainer = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        const containers = [];
        try {
            // blobService.listContainers( ); escribi y obtener el codigo del menssage
            for (var _d = true, _e = __asyncValues(blobService.listContainers()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const container = _c;
                containers.push(container.name);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (containers.length === 0) {
            throw new Error("There are no elements in the container");
        }
        res.json({ containers });
    }
    catch (error) {
        const errorMessage = error.message ||
            "Unknown error while retrieving the list of containers";
        res.status(500).send(errorMessage);
    }
});
exports.listContainer = listContainer;
//# sourceMappingURL=containerController.js.map