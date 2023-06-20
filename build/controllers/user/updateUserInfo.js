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
exports.updateUserInfo = void 0;
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
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, updateName, updateLastName, updateEmail } = req.body;
        // Contenedor Defalult de los usuarios
        const containerName = "azureusercontainer";
        // Compruebo si existe el usuario
        const user = yield db_1.UserModel.findOne({ where: { id } });
        if (user == null) {
            throw new Error("User not found");
        }
        // Si exite un REQ FILE, lo guardo con el id del usuario
        if (req.file) {
            // Recibimos el archivo (su nombre y el buffer)
            const { originalname, buffer } = req.file;
            // Me quedo con la extension de la imagen, para luego hacer ID+ extension de la imagen
            const parts = originalname.split(".");
            const extension = parts.pop();
            // Buscamos si existe el contenedor
            const containerClient = blobService.getContainerClient(containerName);
            const containerExist = yield containerClient.exists();
            if (!containerExist) {
                throw new Error(`The container: ${containerName} does not exist`);
            }
            // Buscamos si existe la imagen
            const blobClient = yield containerClient.getBlockBlobClient(id);
            const blobExist = yield blobClient.exists();
            if (blobExist) {
                // Si existe la guardo encima
                yield containerClient
                    .getBlockBlobClient(id + "." + extension)
                    .uploadData(buffer, {
                    blobHTTPHeaders: {
                        blobContentType: req.file.mimetype
                    }
                });
            }
            else {
                // Sino, guardo la imagen en el depósito sin pisar ninguna imagen
                // f5d769fa-5c29-4a60-aab3-99d32a55d063 + jpg
                yield containerClient
                    .getBlockBlobClient(id + "." + extension)
                    .uploadData(buffer);
            }
            const blobUrl = blobClient.url;
            console.log(blobUrl);
            const updateId = id;
            yield db_1.UserModel.update({
                name: updateName || user.name,
                lastName: updateLastName || user.lastName,
                email: updateEmail || user.email,
                avatar: blobUrl + "." + extension || user.avatar
            }, {
                where: {
                    id: updateId
                }
            });
        }
        const updateId = id;
        yield db_1.UserModel.update({
            name: updateName || user.name,
            lastName: updateLastName || user.lastName,
            email: updateEmail || user.email
        }, {
            where: {
                id: updateId
            }
        });
        res.status(200).send({ data: user });
    }
    catch (error) {
        const errorMessage = error.message || "Unknown error deleting user";
        res.status(409).send(errorMessage);
    }
});
exports.updateUserInfo = updateUserInfo;
//# sourceMappingURL=updateUserInfo.js.map