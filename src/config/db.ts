
import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const sequelize = new Sequelize(`postgres://${DB_USER ?? ''}:${DB_PASSWORD ?? ''}@${DB_HOST ?? ''}:${DB_PORT ?? ''}/${DB_NAME ?? ''}`, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: false,
  native: false
})

const basename = path.basename(__filename)
const modelDefiners: Array<() => void> = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
const modelFiles = fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')

for (const file of modelFiles) {
  const modelDefiner = require(path.join(__dirname, '/models', file)).default
  modelDefiners.push(modelDefiner)
}

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize))

// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperaments } = sequelize.models

Dog.belongsToMany(Temperaments, { through: 'DogTemperament' })
Temperaments.belongsToMany(Dog, { through: 'DogTemperament' })

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

export { sequelize, Dog, Temperaments }
