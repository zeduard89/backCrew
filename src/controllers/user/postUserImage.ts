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

export const uploadImageUser = async (req: Request, res: Response) => {
  try {
    // Verifico si req.file contiene los elementos
    if (!req.file) {
      throw new Error("No se ha proporcionado ningún archivo en la solicitud")
    }
    // Recibimos el nombre del contenedor
    const { email } = req.body
    const container = "azureusercontainer"
    // Recibimos el archivo (su nombre y el buffer)
    //      const { buffer, originalname } = req.file
    const { originalname } = req.file
    if (!container || !email)
      throw new Error(`Datos del contendor/email incompletos`)
    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (!containerExist) throw new Error(`No existe el container ${container}`)

    // Buscamos si existe la imagen
    const exist = await containerClient.getBlockBlobClient(email).exists()
    if (exist) throw new Error(`El elemento: ${email} ya existe`)

    console.log(originalname)
    // Guardamos el archivo con el nombre de la variable email
    // await containerClient.getBlockBlobClient(email).uploadData(buffer)
    // res.json({
    //   message: `La foto de perfil: ${email} fue creado Exitosamente`
    // })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    res.status(500).send(errorMessage)
  }
}
