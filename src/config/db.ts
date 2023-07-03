import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import UserModel from "../models/UserModel"
import ProjectModel from "../models/ProjectModel"
import CommentModel from "../models/CommentModel"
import AdminModel from "../models/AdminModel"
import UserFavoritesModel from "../models/UserFavoritesModel"
import PaymentsModel from "../models/PaymentsModel"
import ImagesModel from "../models/ImagesModel"

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const sequelize = new Sequelize(
  `postgres://${DB_USER ?? ""}:${DB_PASSWORD ?? ""}@${DB_HOST ?? ""}:${
    DB_PORT ?? ""
  }/${DB_NAME ?? ""}`,
  {
    dialect: "postgres",
    logging: false,
    native: false,
    models: [
      UserModel,
      ProjectModel,
      CommentModel,
      AdminModel,
      UserFavoritesModel,
      PaymentsModel,
      ImagesModel
    ]
  }
)

sequelize.addModels([
  UserModel,
  ProjectModel,
  CommentModel,
  AdminModel,
  UserFavoritesModel,
  PaymentsModel,
  ImagesModel
])

// 1:1 Esto permite que un usuario tenga un perfil asociado.

// ProjectModel.hasOne(ImagesModel, { foreignKey: 'PId' });
// ImagesModel.belongsTo(UserModel, { foreignKey: 'ImagesId'})

//! 1:N Esto permite que un usuario tenga múltiples proyectos asociados.
// creatorId, es un atributo de ProjectModel y tarjetkey apunta al id del UserModel
UserModel.hasMany(ProjectModel, { foreignKey: "creatorId" })
ProjectModel.belongsTo(UserModel, { foreignKey: "creatorId", targetKey: "id" })

// Payments
UserModel.hasMany(PaymentsModel, { foreignKey: "userId" })
PaymentsModel.belongsTo(UserModel, { foreignKey: "userId", targetKey: "id" })

ProjectModel.hasMany(PaymentsModel, { foreignKey: "projectId" })
PaymentsModel.belongsTo(ProjectModel, {
  foreignKey: "projectId",
  targetKey: "id"
})

// Comments (User/Project)
UserModel.hasMany(CommentModel, { foreignKey: "userId" })
CommentModel.belongsTo(UserModel, { foreignKey: "userId", targetKey: "id" })

ProjectModel.hasMany(CommentModel, { foreignKey: "projectId" })
CommentModel.belongsTo(ProjectModel, {
  foreignKey: "projectId",
  targetKey: "id"
})

// Images Model
ProjectModel.hasMany(ImagesModel, { foreignKey: "projectId" })
ImagesModel.belongsTo(ProjectModel, {
  foreignKey: "projectId",
  targetKey: "id"
})

export {
  sequelize,
  UserModel,
  ProjectModel,
  CommentModel,
  AdminModel,
  UserFavoritesModel,
  PaymentsModel,
  ImagesModel
}
