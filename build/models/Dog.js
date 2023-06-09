"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
exports.default = (sequelize) => {
    // defino el modelo
    sequelize.define('dog', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        bred_for: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        breed_group: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        origin: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        life_span: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        minHeight: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        maxHeight: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        minWeight: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        maxWeight: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    });
};
//# sourceMappingURL=Dog.js.map