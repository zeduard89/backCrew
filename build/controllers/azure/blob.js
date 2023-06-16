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
exports.deleteBlob = exports.downloadBlob = exports.getBlob = exports.getBlobList = exports.uploadBlob = void 0;
// esta clase me permite conectarme con azureCStore
const storage_blob_1 = require("@azure/storage-blob");
// Cargamos las variables de entorno con config y la ejecuto para conectar
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING; // Obtén la cadena de conexión desde tus variables de entorno
if (!connectionString) {
    throw new Error("La cadena de conexión de Azure Storage no está configurada");
}
const blobService = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
const uploadBlob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifico si req.file contiene los elementos
        if (!req.file) {
            throw new Error("No se ha proporcionado ningún archivo en la solicitud");
        }
        // Recibimos el nombre del contenedor
        const { container, name } = req.body;
        // Recibimos el archivo (su nombre y el buffer)
        const { originalname, buffer } = req.file;
        if (!container || !name)
            throw new Error(`Datos del contendor/name incompletos`);
        // Buscamos si existe el contenedor
        const containerClient = blobService.getContainerClient(container);
        const containerExist = yield containerClient.exists();
        if (!containerExist)
            throw new Error(`No existe el container ${container}`);
        // Buscamos si existe la imagen
        const exist = yield containerClient
            .getBlockBlobClient(originalname)
            .exists();
        if (exist)
            throw new Error(`El elemento: ${originalname} ya existe`);
        // Guardamos el archivo con el nombre de la variable name
        yield containerClient.getBlockBlobClient(name).uploadData(buffer);
        res.json({
            message: `El elemento: ${name} fue creado Exitosamente`
        });
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al guardar ImagenAzure";
        res.status(500).send(errorMessage);
    }
});
exports.uploadBlob = uploadBlob;
// Funcion para ver Listado URL
const getBlobList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        const { container } = req.params;
        // Buscamos si existe el contenedor
        const containerClient = blobService.getContainerClient(container);
        const containerExist = yield containerClient.exists();
        if (!containerExist)
            throw new Error(`No existe el container: ${container}`);
        // Lista los blobs dentro del contenedor
        const blobList = containerClient.listBlobsFlat();
        // Itera sobre la lista de blobs y genera la URL con firma de acceso compartido (SAS) para cada uno
        const blobUrls = [];
        try {
            for (var _d = true, blobList_1 = __asyncValues(blobList), blobList_1_1; blobList_1_1 = yield blobList_1.next(), _a = blobList_1_1.done, !_a; _d = true) {
                _c = blobList_1_1.value;
                _d = false;
                const blob = _c;
                const blobClient = containerClient.getBlobClient(blob.name);
                // Genero el permisos para podes acceder a al elemento
                const sasPermissions = new storage_blob_1.BlobSASPermissions();
                sasPermissions.read = true; // Set the desired permissions
                if (!process.env.ACCOUNT_NAME || !process.env.ACCOUNT_KEY)
                    throw new Error("Error en acreditacion Azure");
                const sasExpiresOn = new Date(new Date().valueOf() + 86400 * 1000); // Expires in 24 hours
                const sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(process.env.ACCOUNT_NAME, process.env.ACCOUNT_KEY);
                // Genero el token con los detalles necesario
                const sasToken = (0, storage_blob_1.generateBlobSASQueryParameters)({
                    containerName: containerClient.containerName,
                    blobName: blobClient.name,
                    permissions: sasPermissions,
                    startsOn: new Date(),
                    expiresOn: sasExpiresOn,
                    contentDisposition: "inline" // Establece el valor "inline" para mostrar el archivo en el navegador
                }, sharedKeyCredential).toString();
                // Pusheo en un array los objetos para tenernos ordenados
                const blobUrlWithSAS = blobClient.url + "?" + sasToken;
                blobUrls.push({
                    name: blobClient.name,
                    url: blobUrlWithSAS
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = blobList_1.return)) yield _b.call(blobList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        res.status(200).json(blobUrls);
    }
    catch (error) {
        const errorMessage = error.message ||
            "Error desconocido al buscar listado URL Azure";
        res.status(500).send(errorMessage);
    }
});
exports.getBlobList = getBlobList;
// Funcion para ver el Blob (Buffer de imagen que renderizar en web con url)
const getBlob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { container, filename } = req.params;
        // Buscamos si existe el contenedor
        const containerClient = blobService.getContainerClient(container);
        const containerExist = yield containerClient.exists();
        if (!containerExist)
            throw new Error(`No existe el container: ${container}`);
        // Buscamos si existe la imagen
        const exist = yield containerClient.getBlockBlobClient(filename).exists();
        if (!exist)
            throw new Error(`El elemento: ${filename} no existe`);
        // obtener el Archivo
        res.header("Content-Type", "image/jpg");
        const response = yield containerClient
            .getBlockBlobClient(filename)
            .downloadToBuffer();
        res.send(response);
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar ImagenesAzure";
        res.status(500).send(errorMessage);
    }
});
exports.getBlob = getBlob;
// Funcion para descargar o el Blob
const downloadBlob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { container, filename } = req.params;
        // Buscamos si existe el contenedor
        const containerClient = blobService.getContainerClient(container);
        const containerExist = yield containerClient.exists();
        if (!containerExist)
            throw new Error(`No existe el container: ${container}`);
        // Buscamos si existe la imagen
        const exist = yield containerClient.getBlockBlobClient(filename).exists();
        if (!exist)
            throw new Error(`El elemento: ${filename} no existe`);
        // Descargamos el Archivo
        const response = yield containerClient
            .getBlockBlobClient(filename)
            .downloadToBuffer();
        res.send(response);
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al Descarga ImagenAzure";
        res.status(400).send(errorMessage);
    }
});
exports.downloadBlob = downloadBlob;
// Funcion para Eliminar el Blob
const deleteBlob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { container, filename } = req.body;
        // comprobar si existe el container
        const containerClient = blobService.getContainerClient(container);
        const containerExist = yield containerClient.exists();
        if (!containerExist)
            throw new Error(`No existe el container: ${container}`);
        // Comprobar si existe la imagen
        const exist = yield containerClient.getBlockBlobClient(filename).exists();
        if (!exist) {
            throw new Error(`No se encuentra el archivo ${filename} en el deposito`); // El error es un String
        }
        // Descargamos el Archivo
        yield containerClient.getBlockBlobClient(filename).deleteIfExists();
        res.send({ message: `Se borro con exito el archivo ${filename}` });
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al eliminar ImagenAzure";
        res.status(400).send(errorMessage);
    }
});
exports.deleteBlob = deleteBlob;
//# sourceMappingURL=blob.js.map