import {
  Model,
  Column,
  Table,
  DataType,
  BelongsTo,
  HasMany,
  ForeignKey,
  BelongsToMany
} from "sequelize-typescript"
import { IProject } from "../types/types"
import { UserModel, PaymentsModel, UserFavoritesModel } from "../config/db"

@Table({ tableName: "projects" })
export default class Project extends Model<IProject> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataType.UUIDV4
  })
  id!: string

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  })
  title!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  shortDescription!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    defaultValue: 0
  })
  fundingCurrent!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  fundingGoal!: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  fundingGoalReached!: boolean

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    defaultValue: 0
  })
  fundingPercentage!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  fundingDayLeft!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0
  })
  likes!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0
  })
  disLikes!: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  category!: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  bank!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: false
  })
  account!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: false
  })
  location!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0
  })
  projectFase!: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  displayProject!: boolean

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  creatorId!: string

  // 1:N project-payment
  @HasMany(() => PaymentsModel)
  projectPayments!: PaymentsModel[]

  // 1:N project-user
  @BelongsTo(() => UserModel, "creatorId") // Asigna un alias único a la asociación
  user!: UserModel

  // N:N project-favorite-user
  @BelongsToMany(() => UserModel, () => UserFavoritesModel)
  favoriteUsers!: UserModel[]
}
