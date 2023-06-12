import { Request, Response } from "express"
// esta clase me permite conectarme con azureCStore
import {
  BlobServiceClient,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential
} from "@azure/storage-blob"

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
    // Verifico si req.file contiene los elementos
    if (!req.file) {
      throw new Error("No se ha proporcionado ningún archivo en la solicitud")
    }
    // Recibimos el nombre del contenedor
    const { container, name } = req.body
    // Recibimos el archivo (su nombre y el buffer)
    const { originalname, buffer } = req.file
    if (!container || !name)
      throw new Error(`Datos del contendor/name incompletos`)
    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (!containerExist) throw new Error(`No existe el container ${container}`)

    // Buscamos si existe la imagen
    const exist = await containerClient
      .getBlockBlobClient(originalname)
      .exists()
    if (exist) throw new Error(`El elemento: ${originalname} ya existe`)

    // Guardamos el archivo con el nombre de la variable name
    await containerClient.getBlockBlobClient(name).uploadData(buffer)
    res.json({
      message: `El elemento: ${name} fue creado Exitosamente`
    })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    res.status(500).send(errorMessage)
  }
}

// Funcion para ver el Blob (Buffer de imagen que renderizar en web con url)
export const getBlobList = async (req: Request, res: Response) => {
  try {
    const { container } = req.params

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (!containerExist) throw new Error(`No existe el container: ${container}`)

    // Lista los blobs dentro del contenedor
    const blobList = containerClient.listBlobsFlat()

    // Itera sobre la lista de blobs y genera la URL con firma de acceso compartido (SAS) para cada uno
    const blobUrls = []
    for await (const blob of blobList) {
      const blobClient = containerClient.getBlobClient(blob.name)

      // Genero el permisos para podes acceder a al elemento
      const sasPermissions = new BlobSASPermissions()
      sasPermissions.read = true // Set the desired permissions
      if (!process.env.ACCOUNT_NAME || !process.env.ACCOUNT_KEY)
        throw new Error("Error en acreditacion Azure")
      const sasExpiresOn = new Date(new Date().valueOf() + 86400 * 1000) // Expires in 24 hours
      const sharedKeyCredential = new StorageSharedKeyCredential(
        process.env.ACCOUNT_NAME,
        process.env.ACCOUNT_KEY
      )

      // Genero el token con los detalles necesario
      const sasToken = generateBlobSASQueryParameters(
        {
          containerName: containerClient.containerName,
          blobName: blobClient.name,
          permissions: sasPermissions,
          startsOn: new Date(),
          expiresOn: sasExpiresOn,
          contentDisposition: "inline" // Establece el valor "inline" para mostrar el archivo en el navegador
        },
        sharedKeyCredential
      ).toString()
      // Pusheo en un array los objetos para tenernos ordenados
      const blobUrlWithSAS = blobClient.url + "?" + sasToken
      blobUrls.push({
        name: blobClient.name,
        url: blobUrlWithSAS
      })
      // Termino la iteracion de los elementos
    }
    res.status(200).json(blobUrls)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar ImagenesAzure"
    res.status(500).send(errorMessage)
  }
}

// Funcion para ver el Blob (Buffer de imagen que renderizar en web con url)
export const getBlob = async (req: Request, res: Response) => {
  try {
    const { container, filename } = req.params

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (!containerExist) throw new Error(`No existe el container: ${container}`)

    // Buscamos si existe la imagen
    const exist = await containerClient.getBlockBlobClient(filename).exists()
    if (!exist) throw new Error(`El elemento: ${filename} no existe`)

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

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (!containerExist) throw new Error(`No existe el container: ${container}`)

    // Buscamos si existe la imagen
    const exist = await containerClient.getBlockBlobClient(filename).exists()
    if (!exist) throw new Error(`El elemento: ${filename} no existe`)

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

    // comprobar si existe el container
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (!containerExist) throw new Error(`No existe el container: ${container}`)

    // Comprobar si existe la imagen
    const exist = await containerClient.getBlockBlobClient(filename).exists()
    if (!exist) {
      throw new Error(`No se encuentra el archivo ${filename} en el deposito`) // El error es un String
    }
    // Descargamos el Archivo
    await containerClient.getBlockBlobClient(filename).deleteIfExists()

    res.send({ message: `Se borro con exito el archivo ${filename}` })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al eliminar ImagenAzure"
    res.status(400).send(errorMessage)
  }
}
