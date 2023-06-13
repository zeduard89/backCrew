import { Request, Response } from "express"
// esta clase me permite conectarme con azureCStore
import { BlobServiceClient } from "@azure/storage-blob"

// Cargamos las variables de entorno con config y la ejecuto para conectar
import dotenv from "dotenv"
dotenv.config()
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
if (!connectionString) {
  throw new Error("La cadena de conexión de Azure Storage no está configurada")
}
const blobService = BlobServiceClient.fromConnectionString(connectionString) // conexion

// Creo un contendor
export const createContainer = async (req: Request, res: Response) => {
  try {
    const { container } = req.body
    if (!container)
      throw new Error("Por favor ingresar un valor de container valido")

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (containerExist) throw new Error(`El container: ${container} ya existe`)

    await blobService.createContainer(container)

    res
      .status(200)
      .json({ message: `El container: ${container} fue creado correctamente` })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al crear un container"
    res.status(500).send(errorMessage)
  }
}

// Borrar un contendor
export const deleteContainer = async (req: Request, res: Response) => {
  try {
    const { container } = req.body
    if (!container)
      throw new Error("Por favor ingresar un valor de container valido")

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (!containerExist) throw new Error(`El container: ${container} no existe`)

    blobService.deleteContainer(container)

    res.json({ message: `El container: ${container} fue eliminado con exito` })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al borrar un container"
    res.status(500).send(errorMessage)
  }
}

// Listar un contendor
export const listContainer = async (_req: Request, res: Response) => {
  try {
    const containers = []
    // blobService.listContainers( ); escribi y obtener el codigo del menssage
    for await (const container of blobService.listContainers()) {
      containers.push(container.name)
    }
    if (containers.length === 0)
      throw new Error("No hay elementos en el contenedor")

    res.json({ containers })
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Error desconocido al obtener lista de container"
    res.status(500).send(errorMessage)
  }
}
