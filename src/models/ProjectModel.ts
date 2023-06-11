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
    type: DataType.FLOAT,
    allowNull: false
  })
  fundingCurrent!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0
  })
  fundingGoal!: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  fundingGoalReached!: boolean

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  fundingPercentage!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  fundingDayLeft!: number

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false
  })
  categories!: string[]

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null
  })
  image!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  displayProject!: boolean
}
