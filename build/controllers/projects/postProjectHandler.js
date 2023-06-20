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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../config/db");
//! Omitir este sector y sus elementos para limitar la creacion de Containers
// import { BlobServiceClient } from "@azure/storage-blob"
// // Cargamos las variables de entorno con config y la ejecuto para conectar
// import dotenv from "dotenv"
// dotenv.config()
// const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
// if (!connectionString) {
//  throw new Error("Azure Storage connection string is not configured");
// }
// const blobService = BlobServiceClient.fromConnectionString(connectionString) // conexion
//! --------------------------------------------------------------------------------
const createProjectController = (validatedProject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, creatorId } = validatedProject, rest = __rest(validatedProject, ["title", "creatorId"]);
        console.log(creatorId);
        const user = yield db_1.UserModel.findOne({ where: { id: creatorId } });
        if (!user)
            throw new Error("User does not exist in DB");
        const allProjects = yield db_1.ProjectModel.findAll();
        const newAllProjects = allProjects.filter((project) => project.title.toLowerCase().trim().replace(/\s/g, "") ===
            title.toLowerCase().trim().replace(/\s/g, ""));
        if (newAllProjects.length > 0) {
            throw new Error("Project exists");
        }
        const createdProject = yield db_1.ProjectModel.create(Object.assign({ title,
            creatorId }, rest));
        //! Omitir este sector y sus elementos para limitar la creacion de Containers
        // // Ejemplo crew1 con id=1
        // const newIdProjectContainer = `crew${createdProject.id.toString()}`
        // // Buscamos si existe el contenedor, sino existe lo creo con el id del Project
        // const containerClient = blobService.getContainerClient(
        //   newIdProjectContainer
        // )
        // const containerExist = await containerClient.exists()
        // if (containerExist)
        // throw new Error(`The container: ${newIdProjectContainer} already exists`);
        // await blobService.createContainer(newIdProjectContainer)
        //! ---------------------------------
        return { message: `${createdProject.id}` };
    }
    catch (error) {
        const errorMessage = error.message || "Unknown error ";
        return { errorMessage };
    }
});
exports.default = createProjectController;
//# sourceMappingURL=postProjectHandler.js.map