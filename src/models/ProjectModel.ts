import { Model, Column, Table, DataType } from "sequelize-typescript"
import { IProject } from "../types/types"

@Table({ tableName: "projects" })
export default class Project extends Model<IProject> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id!: number

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  title!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description!: string

  @Column({
    type: DataType.STRING,
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
    allowNull: false
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
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false
  })
  categories!: string[]

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: false
  })
  banco!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: false
  })
  cuenta!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  displayProject!: boolean
}
