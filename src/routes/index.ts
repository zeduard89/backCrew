import { Router } from "express"
import { readdirSync } from "fs"

// __dirname nos devuelve la ruta del directorio actual
const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (fileName: string): string => {
  const file: string = fileName.split(".").shift() ?? ""
  return file
}

// Funcion Async que se encarga de leer cuantos/cuales archivos hay en el directorio
// devolviendo un array de los nombre de estos archivos
const loadRouters = async (): Promise<void> => {
  const files = readdirSync(PATH_ROUTER)
  for (const fileName of files) {
    const cleanName = cleanFileName(fileName)
    if (cleanName !== "index") {
      const moduleRouter = await import(`./${cleanName}`)
      router.use(`/${cleanName}`, moduleRouter.router)
    }
  }
}

loadRouters()

export { router }
