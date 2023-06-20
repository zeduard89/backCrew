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
const projectSchemas_1 = require("../schemas/projectSchemas");
// Crear project
const postProjectHandler_1 = __importDefault(require("../controllers/projects/postProjectHandler"));
const postRandomProjectHandler_1 = __importDefault(require("../controllers/projects/postRandomProjectHandler"));
// Get by Id
const getProjectByIdController_1 = __importDefault(require("../controllers/projects/getProjectByIdController"));
// Get by Name
const getProjectByNameHandler_1 = __importDefault(require("../controllers/projects/getProjectByNameHandler"));
const getAllProjectsByNameHandler_1 = __importDefault(require("../controllers/projects/getAllProjectsByNameHandler"));
// Delete y getAll
const deleteProjectByName_1 = __importDefault(require("../controllers/projects/deleteProjectByName"));
const getAllProjects_1 = __importDefault(require("../controllers/projects/getAllProjects"));
// Update
const updateProjectController_1 = __importDefault(require("../controllers/projects/updateProjectController"));
const updateFundingCurrentController_1 = __importDefault(require("../controllers/projects/updateFundingCurrentController"));
// Varios
const getDayLeftByNameHandler_1 = __importDefault(require("../controllers/projects/getDayLeftByNameHandler"));
const updateLikesControllers_1 = __importDefault(require("../controllers/projects/updateLikesControllers"));
const getFilteredProjects_1 = __importDefault(require("../controllers/projects/getFilteredProjects"));
const getTwentyMostTrending_1 = __importDefault(require("../controllers/projects/getTwentyMostTrending"));
const getFiveMostFunding_1 = __importDefault(require("../controllers/projects/getFiveMostFunding"));
// 50 Projects controller
const getCreate50Projects_1 = __importDefault(require("../controllers/projects/getCreate50Projects"));
const router = (0, express_1.Router)();
exports.router = router;
//* Datos IMPORTANTES
//* Title es unico - displaysProject'habilita/deshabilita el projecto'
// Ruta crea un project.
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedProject = projectSchemas_1.projectValidator.parse(req.body);
        const newProject = yield (0, postProjectHandler_1.default)(validatedProject);
        res.status(200).json(newProject);
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar proyecto por Id";
        res.status(400).send(errorMessage);
    }
}));
// Llenar la DB.
router.post("/llenarDB", (req, res) => {
    try {
        const { usuarios } = req.query;
        if (usuarios === undefined)
            throw new Error("Ingrese todos los datos");
        const newProject = (0, postRandomProjectHandler_1.default)(+usuarios);
        res.status(200).json(newProject);
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar proyecto por Id";
        res.status(400).send(errorMessage);
    }
});
// Ruta UPDATE DATOS de un project.
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedProject = projectSchemas_1.updateProjectValidator.parse(req.body);
        const updatedProject = yield (0, updateProjectController_1.default)(validatedProject);
        res.status(200).json(updatedProject);
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar proyecto por Id";
        res.status(400).send(errorMessage);
    }
}));
// Ruta UPDATE fundingCurrent
router.put("/update/addToFundingCurrent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedProject = projectSchemas_1.updateFundingCurrentValidator.parse(req.body);
        const updatedProject = yield (0, updateFundingCurrentController_1.default)(validatedProject);
        res.status(200).json(updatedProject);
    }
    catch (error) {
        const errorMessage = error.message ||
            "Error desconocido al buscar proyecto por Id";
        res.status(400).send(errorMessage);
    }
}));
// Ruta UPDATE likes
router.put("/update/likes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedProject = projectSchemas_1.updateLikesValidator.parse(req.body);
        const updatedProject = yield (0, updateLikesControllers_1.default)(validatedProject);
        res.status(200).json(updatedProject);
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar proyecto por Id";
        res.status(400).send(errorMessage);
    }
}));
// Ruta busca por nombre (UNIDAD) o devuelve un array de posibles coincidencias
router.get("/search/byName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const validatedName = projectSchemas_1.validatorString.parse(name);
        if (name !== undefined) {
            const getProjectByName = yield (0, getProjectByNameHandler_1.default)(validatedName);
            res.status(200).json(getProjectByName);
        }
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar Project by ID";
        res.status(400).send(errorMessage);
    }
}));
// Ruta busca por ID
router.get("/search/byId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const validatedId = projectSchemas_1.validatorString.parse(id);
        if (id !== undefined) {
            const getProjectById = yield (0, getProjectByIdController_1.default)(validatedId);
            res.status(200).json(getProjectById);
        }
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar Project by ID";
        res.status(400).send(errorMessage);
    }
}));
// Filtra por nombre y devuelve un array con coincidencias o similitudes
router.get("/search/byNameGeneral", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const validatedName = projectSchemas_1.validatorString.parse(name);
        if (name !== undefined) {
            const getProjectByName = yield (0, getAllProjectsByNameHandler_1.default)(validatedName);
            res.status(200).json(getProjectByName);
        }
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar Project by ID";
        res.status(400).send(errorMessage);
    }
}));
// Route filter by name, category and sort (most founding and trending)
router.get("/searchProjects/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, sort, q, p, s /* country */ } = req.query;
        const validatedCategory = projectSchemas_1.validatorString.parse(category);
        const validatedSort = projectSchemas_1.validatorString.parse(sort);
        const validatedQ = projectSchemas_1.validatorQuerySearch.parse(q);
        const validatedP = projectSchemas_1.validatorString.parse(p);
        const validatedS = projectSchemas_1.validatorString.parse(s);
        // const validatedCountry = validatorString.parse(country)
        console.log(validatedP);
        const getProjectsFiltered = yield (0, getFilteredProjects_1.default)(validatedCategory, validatedSort, validatedQ, validatedP, validatedS
        // validatedCountry
        );
        res.status(200).json(getProjectsFiltered);
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar Project by ID";
        res.status(400).send(errorMessage);
    }
}));
// Ruta busca por name los Dias restantes
router.get("/search/daysleft", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const validatedName = projectSchemas_1.validatorString.parse(name);
        if (name !== undefined) {
            const getProjectByName = yield (0, getDayLeftByNameHandler_1.default)(validatedName);
            res.status(200).json(getProjectByName);
        }
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar Project by ID";
        res.status(400).send(errorMessage);
    }
}));
// Rutra que busca todos los projectos de la DB
router.get("/allProjects", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProjects = yield (0, getAllProjects_1.default)();
        res.status(200).json(allProjects);
    }
    catch (error) {
        const errorMessage = error.message ||
            "Error desconocido al buscar todos los Projectos";
        res.status(400).send(errorMessage);
    }
}));
// Search the five most funding projects
router.get("/fiveMostFunding", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fiveMostFunding = yield (0, getFiveMostFunding_1.default)();
        res.status(200).json(fiveMostFunding);
    }
    catch (error) {
        const errorMessage = error.message ||
            "Error desconocido al buscar los 5 proyectos más fondeados";
        res.status(400).send(errorMessage);
    }
}));
// Search the twenty most trending projects
router.get("/twentyMostTrending", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const twentyMostTrending = yield (0, getTwentyMostTrending_1.default)();
        res.status(200).json(twentyMostTrending);
    }
    catch (error) {
        const errorMessage = error.message ||
            "Error desconocido al buscar los 5 proyectos más fondeados";
        res.status(400).send(errorMessage);
    }
}));
// Ruta delete por name (actualiza booleano de displayProject)
router.delete("/deleteProject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedProject = projectSchemas_1.deleteProjectValidator.parse(req.body);
        const deleteProjectByName = yield (0, deleteProjectByName_1.default)(validatedProject);
        res.status(200).json(deleteProjectByName);
    }
    catch (error) {
        const errorMessage = error.message || "Error desconocido al buscar Project by ID";
        res.status(400).send(errorMessage);
    }
}));
// Create 50projects
router.get("/create50projects/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const c50Projects = yield (0, getCreate50Projects_1.default)();
        res.status(200).json(c50Projects);
    }
    catch (error) {
        const errorMessage = error.message || "Error al crear los Projectos";
        console.log(error);
        res.status(400).send(errorMessage);
    }
}));
// Controlador de rutas no especificadas
router.get("*", (_req, res) => {
    res.status(404).send("Route not found");
});
//# sourceMappingURL=projectRoute.js.map