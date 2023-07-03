import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany
} from "sequelize-typescript"
import { IComment } from "../types/types"
import { UserModel, ProjectModel, CommentModel } from "../config/db"

@Table({ tableName: "comments", timestamps: false })
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
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.TEXT,
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
    defaultValue: Date()
  })
  date!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
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
  commentUser!: UserModel

  // 1:N project-comment
  @ForeignKey(() => ProjectModel)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  projectId!: string

  @BelongsTo(() => ProjectModel, "projectId") // Asigna un alias único a la asociación
  commentProject!: ProjectModel

  @ForeignKey(() => Comments)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  parentId!: number

  @BelongsTo(() => Comments, "parentId")
  parentComment!: CommentModel

  @HasMany(() => Comments, "parentId")
  nestedComments!: CommentModel[]
}
