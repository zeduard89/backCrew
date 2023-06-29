import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript"
import { IComment } from "../types/types"
import { UserModel, ProjectModel } from "../config/db"

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
    allowNull: false,
    defaultValue: true
  })
  displayComment!: boolean

  // 1: N user-comment----------------
  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  userId!: string

  @BelongsTo(() => UserModel, "userId") // Asigna un alias único a la asociación
  CommentUser!: UserModel

  // 1:N project-comment
  @ForeignKey(() => ProjectModel)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  projectId!: string

  @BelongsTo(() => ProjectModel, "projectId") // Asigna un alias único a la asociación
  paymentProject!: ProjectModel
}
