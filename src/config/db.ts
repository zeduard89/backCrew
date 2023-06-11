import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import UserModel from "../models/UserModel"
import ProjectModel from "../models/ProjectModel"

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const sequelize = new Sequelize(
  `postgres://${DB_USER ?? ""}:${DB_PASSWORD ?? ""}@${DB_HOST ?? ""}:${
    DB_PORT ?? ""
  }/${DB_NAME ?? ""}`,
  {
    logging: false,
    native: false,
    models: [UserModel, ProjectModel]
  }
)

sequelize.addModels([UserModel])
sequelize.addModels([ProjectModel])

export { sequelize, UserModel, ProjectModel }
