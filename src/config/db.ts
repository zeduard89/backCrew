import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import UserModel from "../models/User"

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

sequelize.addModels([UserModel])

export { sequelize, UserModel }
