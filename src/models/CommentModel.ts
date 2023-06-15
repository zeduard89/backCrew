import { Model, Column, Table, DataType } from "sequelize-typescript"
import { IComment } from "../types/types"

@Table({ tableName: "comments" })
export default class Comments extends Model<IComment> {
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
    defaultValue: null
  })
  date!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  displayComment!: boolean
}
