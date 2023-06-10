import { Model, Column, Table, DataType } from "sequelize-typescript"
import { IProject } from "../types/types"

@Table({ tableName: "proyects" })
export default class User extends Model<IProject> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4
  })
  id!: string

  @Column({
    type: DataType.STRING,
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
}
