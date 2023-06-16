import { Request, Response } from "express"
// esta clase me permite conectarme con azureCStore
import { BlobServiceClient } from "@azure/storage-blob"

// Cargamos las variables de entorno con config y la ejecuto para conectar
import dotenv from "dotenv"
dotenv.config()
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
if (!connectionString) {
  throw new Error("Azure Storage connection string is not configured")
}
const blobService = BlobServiceClient.fromConnectionString(connectionString) // conexion

// Creo un contendor
export const createContainer = async (req: Request, res: Response) => {
  try {
    const { container } = req.body
    if (!container) throw new Error("Please enter a valid container value")

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (containerExist) {
      throw new Error(`The container "${container}" already exists`)
    }
    await blobService.createContainer(container)

    res.status(200).json({
      message: `The container "${container}" was created successfully`
    })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while creating a container"
    res.status(500).send(errorMessage)
  }
}

// Borrar un contendor
export const deleteContainer = async (req: Request, res: Response) => {
  try {
    const { container } = req.body
    if (!container) throw new Error("Please enter a valid container value")

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (!containerExist) {
      throw new Error(`The container "${container}" does not exist`)
    }
    blobService.deleteContainer(container)

    res.json({
      message: `The container "${container}" was successfully deleted`
    })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while deleting a container"
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
    if (containers.length === 0) {
      throw new Error("There are no elements in the container")
    }
    res.json({ containers })
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while retrieving the list of containers"
    res.status(500).send(errorMessage)
  }
}
