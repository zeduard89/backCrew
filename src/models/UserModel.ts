import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  BelongsToMany
} from "sequelize-typescript"
import { IUser } from "../types/types"
import { ProjectModel, UserFavoritesModel } from "../config/db"

@Table({ tableName: "users" })
export default class User extends Model<IUser> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  lastName!: string

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email!: string

  // @Column({
  //   type: DataType.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false
  // })
  // verified!: boolean

  // @Column({
  //   type: DataType.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false
  // })
  // access!: boolean

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false
  // })
  // password!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: false
  })
  avatar!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: false
  })
  date!: string

  @HasMany(() => ProjectModel)
  projects!: ProjectModel[]

  @BelongsToMany(() => ProjectModel, () => UserFavoritesModel)
  favoriteProjects!: ProjectModel[]
}
