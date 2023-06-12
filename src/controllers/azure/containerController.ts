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
    const container = req.body
    if (!container)
      throw new Error("Por favor ingresar un valor de container valido")
    await blobService.createContainer(container)

    res.status(200).json({ message: "success" })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al crear un container"
    res.status(500).send(errorMessage)
  }
}

// Borrar un contendor
export const deleteContainer = (req: Request, res: Response) => {
  try {
    const { container } = req.body
    if (!container)
      throw new Error("Por favor ingresar un valor de container valido")
    blobService.deleteContainer(container)

    res.json({ message: "success" })
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

    res.json({ containers })
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Error desconocido al obtener lista de container"
    res.status(500).send(errorMessage)
  }
}
