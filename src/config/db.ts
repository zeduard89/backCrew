import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import UserModel from "../models/UserModel"
import ProjectModel from "../models/ProjectModel"
import CommentModel from "../models/CommentModel"
import AdminModel from "../models/AdminModel"

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const sequelize = new Sequelize(
  `postgres://${DB_USER ?? ""}:${DB_PASSWORD ?? ""}@${DB_HOST ?? ""}:${
    DB_PORT ?? ""
  }/${DB_NAME ?? ""}`,
  {
    logging: false,
    native: false,
    models: [UserModel, ProjectModel, CommentModel, AdminModel]
  }
)

sequelize.addModels([UserModel, ProjectModel, CommentModel, AdminModel])

//! Favoritos
// UserModel.belongsToMany(favoriteProjectModel, { through: "FavoriteProject" })
// FavoriteProjectModel.belongsToMany(UserModel, { through: "UserProject" })

// 1:1 Esto permite que un usuario tenga un perfil asociado.

// UserModel.hasOne(ProfileModel, { foreignKey: 'profileId' });
// ProfileModel.belongsTo(UserModel, { foreignKey: 'userId'

// 1:N Esto permite que un usuario tenga múltiples proyectos asociados.
UserModel.hasMany(ProjectModel, { foreignKey: "creatorId" })
ProjectModel.belongsTo(UserModel, { foreignKey: "creatorId" })

export { sequelize, UserModel, ProjectModel, CommentModel, AdminModel }
