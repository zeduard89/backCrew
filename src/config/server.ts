import express, { ErrorRequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// Importacion de Rutas Dinamicas
import { router } from '../routes/index'

const server = express()

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

// Rutas
server.use('/', router)

// Error catching middleware.
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status: number = err.status !== undefined ? err.status : 500
  const message: string = err.message !== undefined ? err.message : String(err)
  console.error(err)
  res.status(status).send(message)
}

server.use(errorHandler)

export default server
