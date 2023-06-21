import { Model, Column, Table, ForeignKey } from "sequelize-typescript"
import { UserModel, ProjectModel } from "../config/db"
import { IUserFavorite } from "../types/types"

@Table({ tableName: "UserFavorites" })
export default class UserFavorite extends Model<IUserFavorite> {
  @ForeignKey(() => UserModel)
  @Column
  userId?: number

  @ForeignKey(() => ProjectModel)
  @Column
  projectId?: number
}
