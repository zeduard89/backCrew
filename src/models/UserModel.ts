import { Model, Column, Table, DataType } from "sequelize-typescript"
import { IUser } from "../types/types"

@Table({ tableName: "users" })
export default class User extends Model<IUser> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  id!: string
}
