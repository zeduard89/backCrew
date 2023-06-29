import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import UserModel from "../models/UserModel"
import ProjectModel from "../models/ProjectModel"
import CommentModel from "../models/CommentModel"
import AdminModel from "../models/AdminModel"
import UserFavoritesModel from "../models/UserFavoritesModel"
import PaymentsModel from "../models/PaymentsModel"

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
      PaymentsModel
    ]
  }
)

sequelize.addModels([
  UserModel,
  ProjectModel,
  CommentModel,
  AdminModel,
  UserFavoritesModel,
  PaymentsModel
])

// 1:1 Esto permite que un usuario tenga un perfil asociado.

// UserModel.hasOne(ProfileModel, { foreignKey: 'profileId' });
// ProfileModel.belongsTo(UserModel, { foreignKey: 'userId'})

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

// Comments
UserModel.hasMany(CommentModel, { foreignKey: "userId" })
CommentModel.belongsTo(UserModel, { foreignKey: "userId", targetKey: "id" })

ProjectModel.hasMany(CommentModel, { foreignKey: "projectId" })
ProjectModel.belongsTo(ProjectModel, {
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
  PaymentsModel
}

//     Ejemplo de uso de los métodos de relación
//     const project = new ProjectModel();
//     project.title = "Nuevo proyecto";
//     await foundUser.$add('favoriteProjects', project); // Agregar un proyecto a la lista de favoritos

//     const favoriteProjects = await foundUser.$get('favoriteProjects'); // Obtener la lista de proyectos favoritos

//     const projectCount = await foundUser.$count('favoriteProjects'); // Contar la cantidad de proyectos favoritos

//     const hasFavoriteProjects = await foundUser.$has('favoriteProjects'); // Verificar si tiene proyectos favoritos

//     const projectToRemove = favoriteProjects[0];
//     await foundUser.$remove('favoriteProjects', projectToRemove); // Eliminar un proyecto de la lista de favoritos

//     const newProject = await foundUser.$create('favoriteProjects', { title: 'Nuevo proyecto' }); // Crear un nuevo proyecto y agregarlo a la lista de favoritos
