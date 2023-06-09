"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
exports.default = (sequelize) => {
    // defino el modelo
    sequelize.define('temperaments', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }, { timestamps: false });
};
//# sourceMappingURL=Temperaments.js.map