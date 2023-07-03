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
import {
  UserModel,
  PaymentsModel,
  UserFavoritesModel,
  CommentModel,
  ImagesModel
} from "../config/db"

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
    allowNull: true,
    defaultValue: "titulo"
  })
  title!: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: "description"
  })
  description!: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: "shortDescription"
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
    allowNull: true,
    defaultValue: 0
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
    allowNull: true,
    defaultValue: 0
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
    allowNull: true,
    defaultValue: "Category"
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
    allowNull: true,
    defaultValue: true
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

  // 1:N project-comments
  @HasMany(() => CommentModel)
  projectComments!: CommentModel[]

  // 1:N project-comments
  @HasMany(() => ImagesModel)
  projectImages!: ImagesModel[]

  // 1:N project-user
  @BelongsTo(() => UserModel, "creatorId") // Asigna un alias único a la asociación
  user!: UserModel

  // N:N project-favorite-user
  @BelongsToMany(() => UserModel, () => UserFavoritesModel)
  favoriteUsers!: UserModel[]
}
