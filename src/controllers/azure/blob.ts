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
  throw new Error("Azure Storage connection string is not configured")
}
const blobService = BlobServiceClient.fromConnectionString(connectionString)

export const uploadBlob = async (req: Request, res: Response) => {
  try {
    // Verifico si req.file contiene los elementos
    if (!req.file) {
      throw new Error("No file has been provided in the request")
    }
    // Recibimos el nombre del contenedor
    const { container, name } = req.body
    // Recibimos el archivo (su nombre y el buffer)
    const { originalname, buffer } = req.file
    if (!container || !name) throw new Error(`Incomplete container/name data`)

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExists = await containerClient.exists()
    if (!containerExists) {
      throw new Error(`The container ${container} does not exist`)
    }

    // Buscamos si existe la imagen
    const exist = await containerClient
      .getBlockBlobClient(originalname)
      .exists()
    if (exist) {
      throw new Error(`The element: ${originalname} already exists`)
    }
    // Obtengo la extension de original name para usarla al final del name
    const extension = originalname.split(".").pop()

    // Guardamos el archivo con el nombre de la variable name
    await containerClient
      .getBlockBlobClient(name + "." + extension)
      .uploadData(buffer)
    res.json({
      message: `The element: ${name + "." + extension} was created successfully`
    })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while saving ImageAzure"
    res.status(500).send(errorMessage)
  }
}
//! ----
export const uploadBlobNew = async (
  file: Express.Multer.File,
  container: string,
  names: string
) => {
  try {
    // Verificar si se proporcionó un archivo
    if (!file) {
      throw new Error("No file has been provided")
    }
    const { originalname, buffer } = file

    // Verificar si se proporcionó el nombre del contenedor y el nombre del archivo
    if (!container || !names) {
      throw new Error("Incomplete container/name data")
    }

    // Buscar si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExists = await containerClient.exists()

    if (!containerExists) {
      throw new Error(`The container ${container} does not exist`)
    }

    // Buscar si existe la imagen
    const exist = await containerClient.getBlockBlobClient(names).exists()

    if (exist) {
      throw new Error(`The element: ${names} already exists`)
    }

    // Obtengo la extension de original name para usarla al final del name
    const extension = originalname.split(".").pop()

    // Guardamos el archivo con el nombre de la variable name
    await containerClient
      .getBlockBlobClient(names + "." + extension)
      .uploadData(buffer)

    // Subir el archivo al contenedor
    // await containerClient.getBlockBlobClient(name).uploadData(file.buffer)

    return {
      message: `The element: ${names} was created successfully`
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while saving ImageAzure"
    throw new Error(errorMessage)
  }
}

//! ----------

// Funcion para ver Listado URL
export const getBlobList = async (req: Request, res: Response) => {
  try {
    const { container } = req.params

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExist = await containerClient.exists()
    if (!containerExist) {
      throw new Error(`The container: ${container} does not exist`)
    }
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
        throw new Error("Error in Azure accreditation")
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
      (error as Error).message || "Unknown error while searching Azure URL list"
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
    if (!containerExist) {
      throw new Error(`The container "${container}" does not exist`)
    }
    // Buscamos si existe la imagen
    const exist = await containerClient.getBlockBlobClient(filename).exists()
    if (!exist) {
      throw new Error(`The element "${filename}" does not exist`)
    }
    // obtener el Archivo
    res.header("Content-Type", "image/jpg")
    const response = await containerClient
      .getBlockBlobClient(filename)
      .downloadToBuffer()
    res.send(response)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while retrieving Azure blob"
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
    if (!containerExist) {
      throw new Error(`The container "${container}" does not exist`)
    }
    // Buscamos si existe la imagen
    const exist = await containerClient.getBlockBlobClient(filename).exists()
    if (!exist) {
      throw new Error(`The element "${filename}" does not exist`)
    }
    // Descargamos el Archivo
    const response = await containerClient
      .getBlockBlobClient(filename)
      .downloadToBuffer()

    res.send(response)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while downloading ImageAzure"
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
    if (!containerExist) {
      throw new Error(`The container "${container}" does not exist`)
    }
    // Comprobar si existe la imagen
    const exist = await containerClient.getBlockBlobClient(filename).exists()
    if (!exist) {
      throw new Error(`The file "${filename}" is not found in the repository`)
    }
    // Descargamos el Archivo
    await containerClient.getBlockBlobClient(filename).deleteIfExists()

    res.send({ message: `The file "${filename}" was successfully deleted` })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while deleting ImageAzure"
    res.status(400).send(errorMessage)
  }
}

//! ----NO USE

export const uploadMultiBlob = async (req: Request, res: Response) => {
  try {
    // Verifico si req.files contiene los elementos
    if (!req.files) {
      throw new Error("No files have been provided in the request")
    }

    const files: Express.Multer.File[] = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files).reduce(
          (arr, fileArr) => arr.concat(fileArr),
          []
        )

    // Recibimos el nombre del contenedor y el nombre base
    const { container, name } = req.body
    if (!container || !name) {
      throw new Error(`Incomplete container/name data`)
    }

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(container)
    const containerExists = await containerClient.exists()
    if (!containerExists) {
      throw new Error(`The container ${container} does not exist`)
    }

    const uploadedFiles = []

    // Procesamos cada archivo en el array
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Verificamos si el archivo es válido
      if (!file || !file.originalname || !file.buffer) {
        throw new Error(`Invalid file at index ${i}`)
      }

      const { originalname, buffer } = file

      // Buscamos si existe la imagen
      const exist = await containerClient
        .getBlockBlobClient(originalname)
        .exists()
      if (exist) {
        throw new Error(`The element: ${originalname} already exists`)
      }

      // Obtengo la extensión del originalname para usarla al final del name
      const extension = originalname.split(".").pop()

      // Generamos el nombre único para el archivo
      const uniqueName = `${name}${i + 1}.${extension}`

      // Guardamos el archivo con el nombre único
      await containerClient.getBlockBlobClient(uniqueName).uploadData(buffer)
      uploadedFiles.push(uniqueName)
    }

    res.json({
      message: `The elements: ${uploadedFiles.join(
        ", "
      )} were created successfully`
    })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while saving ImageAzure"
    res.status(500).send(errorMessage)
  }
}
