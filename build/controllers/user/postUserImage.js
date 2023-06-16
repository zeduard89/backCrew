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
exports.uploadImageUser = void 0;
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
const uploadImageUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifico si req.file contiene los elementos
        if (!req.file) {
            throw new Error("No se ha proporcionado ningún archivo en la solicitud");
        }
        // Recibimos el nombre del contenedor
        const { email } = req.body;
        const container = "azureusercontainer";
        // Recibimos el archivo (su nombre y el buffer)
        const { buffer } = req.file;
        if (!container || !email)
            throw new Error(`Datos del contendor/email incompletos`);
        // Buscamos si existe el contenedor
        const containerClient = blobService.getContainerClient(container);
        const containerExist = yield containerClient.exists();
        if (!containerExist)
            throw new Error(`No existe el container ${container}`);
        // Buscamos si existe la imagen
        const exist = yield containerClient.getBlockBlobClient(email).exists();
        if (exist)
            throw new Error(`El elemento: ${email} ya existe`);
        // Guardamos el archivo con el nombre de la variable email
        yield containerClient.getBlockBlobClient(email).uploadData(buffer);
        res.json({
            message: `La foto de perfil: ${email} fue creado Exitosamente`
        });
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al guardar ImagenAzure";
        res.status(500).send(errorMessage);
    }
});
exports.uploadImageUser = uploadImageUser;
//# sourceMappingURL=postUserImage.js.map