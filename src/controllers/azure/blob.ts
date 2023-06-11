import { Request, Response } from "express"
// esta clase me permite conectarme con azureCStore
import { BlobServiceClient } from "@azure/storage-blob"

// Cargamos las variables de entorno con config y la ejecuto para conectar
import dotenv from "dotenv"
dotenv.config()

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING // Obtén la cadena de conexión desde tus variables de entorno

if (!connectionString) {
  throw new Error("La cadena de conexión de Azure Storage no está configurada")
}
const blobService = BlobServiceClient.fromConnectionString(connectionString)

export const uploadBlob = async (req: Request, res: Response) => {
  try {
    console.log("hola")
    // Verifico si req.file contiene los elementos
    if (!req.file) {
      throw new Error("No se ha proporcionado ningún archivo en la solicitud")
    }
    // Recibimos el nombre del contenedor
    const { container } = req.body
    // Recibimos el archivo (su nombre y el buffer)
    const { originalname, buffer } = req.file

    // Buscamos el contenedor
    const containerClient = blobService.getContainerClient(container)

    // Guardamos el archivo
    await containerClient.getBlockBlobClient(originalname).uploadData(buffer)
    res.json({ message: "success" })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    res.status(500).send(errorMessage)
  }
}

// Funcion para ver el Blob
export const getBlob = async (req: Request, res: Response) => {
  try {
    const { container, filename } = req.params

    const containerClient = blobService.getContainerClient(container)

    // obtener el Archivo
    res.header("Content-Type", "image/jpg")
    const response = await containerClient
      .getBlockBlobClient(filename)
      .downloadToBuffer()

    res.send(response)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar ImagenesAzure"
    res.status(500).send(errorMessage)
  }
}

// Funcion para descargar o el Blob
export const downloadBlob = async (req: Request, res: Response) => {
  try {
    const { container, filename } = req.params

    const containerClient = blobService.getContainerClient(container)

    // Descargamos el Archivo
    const response = await containerClient
      .getBlockBlobClient(filename)
      .downloadToBuffer()

    res.send(response)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al Descarga ImagenAzure"
    res.status(400).send(errorMessage)
  }
}

// Funcion para Eliminar el Blob
export const deleteBlob = async (req: Request, res: Response) => {
  try {
    const { container, filename } = req.body

    const containerClient = blobService.getContainerClient(container)

    // Descargamos el Archivo
    const response = await containerClient
      .getBlockBlobClient(filename)
      .deleteIfExists()

    res.send(response)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al eliminar ImagenAzure"
    res.status(400).send(errorMessage)
  }
}
