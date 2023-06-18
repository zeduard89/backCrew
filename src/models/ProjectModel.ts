import {
  Model,
  Column,
  Table,
  DataType,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript"
import { IProject } from "../types/types"
import { UserModel } from "../config/db"

@Table({ tableName: "projects" })
export default class ProjectModel extends Model<IProject> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true
  })
  id!: number

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
    references: {
      model: UserModel,
      key: "id"
    }
  })
  creatorId!: string

  @BelongsTo(() => UserModel)
  creator!: UserModel
}
