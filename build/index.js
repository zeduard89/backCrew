"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./config/server"));
const db_1 = require("./config/db");
require("dotenv/config");
let PORT;
if (process.env.PORT != null)
    PORT = process.env.PORT;
else
    PORT = '3002';
// Syncing all the models at once.
db_1.sequelize.sync({ force: false })
    .then(() => {
    server_1.default.listen(PORT, () => {
        console.log('Master, servidor levantado en el puerto', PORT);
    });
})
    .catch((error) => {
    console.error('Error al sincronizar los modelos de Sequelize:', error);
});
//# sourceMappingURL=index.js.map