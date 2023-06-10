import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import userModel from "../models/User"
import projectModel from "../models/Project"

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const sequelize = new Sequelize(
  `postgres://${DB_USER ?? ""}:${DB_PASSWORD ?? ""}@${DB_HOST ?? ""}:${
    DB_PORT ?? ""
  }/${DB_NAME ?? ""}`,
  {
    logging: false,
    native: false
  }
)

//Utilizo el modelo y lo presento a Sequelize, para que lo pueda usar donde lo necesita
//! Creamos las tablas
userModel(sequelize)
projectModel(sequelize)

export { sequelize, userModel, projectModel }
