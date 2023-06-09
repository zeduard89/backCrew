<<<<<<< HEAD
import { Model, Column, Table, DataType } from 'sequelize-typescript'
=======
import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { IUser } from '../types/types'
>>>>>>> baabe852756649a344b2b4a17df5a0027af7b9ba

@Table({ tableName: 'users' })
export default class User extends Model<IUser> {
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
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  lastName!: string

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  verified!: boolean

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: false
  })
  image!: string
}
