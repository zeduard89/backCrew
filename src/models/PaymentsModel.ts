import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript"
import { IPaymentDetail } from "../types/types"
import { UserModel, ProjectModel } from "../config/db"

@Table({ tableName: "payments", timestamps: false })
export default class Payments extends Model<IPaymentDetail> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  })
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  payerId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  currencyId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  operationType!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  orderId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  ordertype!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "firstName"
  })
  firstName?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "lastName"
  })
  lastName?: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "identificationNumber"
  })
  identificationNumber?: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  identificationType!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "phoneAreaCode"
  })
  phoneAreaCode?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "phoneNumber"
  })
  phoneNumber?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "phoneExtension"
  })
  phoneExtension?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "type"
  })
  type?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "entityType"
  })
  entityType?: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  paymentMetodId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  status!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  statusDetail!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  taxesAmount!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  transactionAmount!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  transactionAmountRefunded!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  transactionReceived!: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  dateApproved!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  dateCreated!: string

  // 1: N user-payment
  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  userId!: string

  @BelongsTo(() => UserModel, "userId") // Asigna un alias único a la asociación
  paymentUser!: UserModel

  // 1:N project-payment
  @ForeignKey(() => ProjectModel)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  projectId!: string

  @BelongsTo(() => ProjectModel, "projectId") // Asigna un alias único a la asociación
  paymentProject!: ProjectModel
}
