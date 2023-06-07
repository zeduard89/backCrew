import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import DogModel from '../models/Dog'
import TemperamentsModel from '../models/Temperaments'

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const sequelize = new Sequelize(`postgres://${DB_USER ?? ''}:${DB_PASSWORD ?? ''}@${DB_HOST ?? ''}:${DB_PORT ?? ''}/${DB_NAME ?? ''}`, {
  logging: false,
  native: false
})

const Dog = DogModel(sequelize)
const Temperaments = TemperamentsModel(sequelize)

export { sequelize, Dog, Temperaments }
