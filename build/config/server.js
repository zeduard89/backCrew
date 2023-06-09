"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
// Importacion de Rutas Dinamicas
const index_1 = require("../routes/index");
const server = express_1.default();
server.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(body_parser_1.default.json({ limit: '50mb' }));
server.use(cookie_parser_1.default());
server.use(morgan_1.default('dev'));
server.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// Rutas
server.use('/', index_1.router);
// Error catching middleware.
const errorHandler = (err, _req, res, _next) => {
    const status = err.status !== undefined ? err.status : 500;
    const message = err.message !== undefined ? err.message : String(err);
    console.error(err);
    res.status(status).send(message);
};
server.use(errorHandler);
exports.default = server;
//# sourceMappingURL=server.js.map