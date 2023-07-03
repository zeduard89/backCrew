import {
  Model,
  Column,
  Table,
  DataType,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript"
import { IImages } from "../types/types"
import { ProjectModel } from "../config/db"

@Table({ tableName: "images", timestamps: false })
export default class Images extends Model<IImages> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
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
  url!: string

  @ForeignKey(() => ProjectModel)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  projectId!: string

  @BelongsTo(() => ProjectModel, "projectId") // Asigna un alias único a la asociación
  imagesProject!: ProjectModel
}
