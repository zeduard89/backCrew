import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  BelongsToMany
} from "sequelize-typescript"
import { IUser } from "../types/types"
import { ProjectModel, UserFavoritesModel, PaymentsModel } from "../config/db"

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

  // Add country, city, postalCode, shortDescription, aboutMe
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  country!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  city!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  postalCode!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  shortDescription!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  aboutMe!: string

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

  // 1:N user-project
  @HasMany(() => ProjectModel)
  projects!: ProjectModel[]

  // 1:N usuario-payment
  @HasMany(() => PaymentsModel)
  userPayments!: PaymentsModel[]

  // N:N user-favorite-project
  @BelongsToMany(() => ProjectModel, () => UserFavoritesModel)
  favoriteProjects!: ProjectModel[]
}
