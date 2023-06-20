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
exports.registerUser = void 0;
const db_1 = require("../../config/db");
const storage_blob_1 = require("@azure/storage-blob");
// Cargamos las variables de entorno con config y la ejecuto para conectar
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING; // Obtén la cadena de conexión desde tus variables de entorno
if (!connectionString) {
    throw new Error("Azure Storage connection string is not configured");
}
const blobService = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blobName = "userDefault.png";
    const containerName = "defaultcontainer";
    try {
        const { name, lastName, email, id } = req.body;
        const user = yield db_1.UserModel.findOne({ where: { email } });
        if (user != null) {
            throw new Error("Email already used");
        }
        // Buscamos si existe el contenedor
        const containerClient = blobService.getContainerClient(containerName);
        const containerExist = yield containerClient.exists();
        if (!containerExist) {
            throw new Error(`The container: ${containerName} does not exist`);
        }
        // Buscamos si existe la imagen
        const blobClient = yield containerClient.getBlockBlobClient(blobName);
        const blobExist = yield blobClient.exists();
        if (!blobExist) {
            throw new Error(`The element: ${blobName} does not exists`);
        }
        // Genero el permisos para podes acceder a al elemento
        const sasPermissions = new storage_blob_1.BlobSASPermissions();
        sasPermissions.read = true; // Set the desired permissions
        if (!process.env.ACCOUNT_NAME || !process.env.ACCOUNT_KEY) {
            throw new Error("Error in Azure accreditation");
        }
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
        const blobUrlWithSAS = blobClient.url + "?" + sasToken;
        const dateNow = new Date();
        const registerUser = yield db_1.UserModel.create({
            id,
            name,
            lastName,
            email,
            avatar: blobUrlWithSAS,
            date: dateNow.toString()
            // se puede sacar el pais "date": "Sun Jun 18 2023 02:11:25 GMT-0300 (Argentina Standard Time)",
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