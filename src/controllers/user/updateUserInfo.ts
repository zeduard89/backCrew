import { Request, Response } from "express"
import { UserModel } from "../../config/db"
import { IUpdateUser } from "../../types/types"
import { BlobServiceClient } from "@azure/storage-blob"
import {
  validatorCountry,
  validatorCity,
  validatorPostalCode,
  validatorShortDescription,
  validatorAboutMe
} from "../../schemas/userSchemas"

// Cargamos las variables de entorno con config y la ejecuto para conectar
import dotenv from "dotenv"
dotenv.config()

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING // Obtén la cadena de conexión desde tus variables de entorno

if (!connectionString) {
  throw new Error("Azure Storage connection string is not configured")
}
const blobService = BlobServiceClient.fromConnectionString(connectionString)

export const updateUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      id,
      updateName,
      updateLastName,
      updateEmail,
      updateCountry,
      updateCity,
      updatePostalCode,
      updateShortDescription,
      updateAboutMe
    }: IUpdateUser = req.body

    // Validar los campos
    validatorCountry.parse(updateCountry)
    validatorCity.parse(updateCity)
    validatorPostalCode.parse(updatePostalCode)
    validatorShortDescription.parse(updateShortDescription)
    validatorAboutMe.parse(updateAboutMe)

    // Contenedor Defalult de los usuarios
    const containerName = "azureusercontainer"

    // Compruebo si existe el usuario
    const user = await UserModel.findOne({ where: { id } })
    if (user == null) {
      throw new Error("User not found")
    }

    // Si exite un REQ FILE, lo guardo con el id del usuario
    if (req.file) {
      // Recibimos el archivo (su nombre y el buffer)
      const { originalname, buffer } = req.file
      // Me quedo con la extension de la imagen, para luego hacer ID+ extension de la imagen
      const parts = originalname.split(".")
      const extension = parts.pop()

      // Buscamos si existe el contenedor
      const containerClient = blobService.getContainerClient(containerName)
      const containerExist = await containerClient.exists()
      if (!containerExist) {
        throw new Error(`The container: ${containerName} does not exist`)
      }
      // Buscamos si existe la imagen
      const blobClient = await containerClient.getBlockBlobClient(id)
      const blobExist = await blobClient.exists()
      if (blobExist) {
        // Si existe la guardo encima
        await containerClient
          .getBlockBlobClient(id + "." + extension)
          .uploadData(buffer, {
            blobHTTPHeaders: {
              blobContentType: req.file.mimetype
            }
          })
      } else {
        // Sino, guardo la imagen en el depósito sin pisar ninguna imagen
        // f5d769fa-5c29-4a60-aab3-99d32a55d063 + jpg
        await containerClient
          .getBlockBlobClient(id + "." + extension)
          .uploadData(buffer)
      }
      const blobUrl = blobClient.url
      console.log(blobUrl)
      const updateId = id
      await UserModel.update(
        {
          name: updateName || user.name,
          lastName: updateLastName || user.lastName,
          email: updateEmail || user.email,
          avatar: blobUrl + "." + extension || user.avatar,
          country: updateCountry || user.country,
          city: updateCity || user.city,
          postalCode: updatePostalCode || user.postalCode,
          shortDescription: updateShortDescription || user.shortDescription,
          aboutMe: updateAboutMe || user.aboutMe
        },
        {
          where: {
            id: updateId
          }
        }
      )
    }

    const updateId = id

    await UserModel.update(
      {
        name: updateName || user.name,
        lastName: updateLastName || user.lastName,
        email: updateEmail || user.email,
        country: updateCountry || user.country,
        city: updateCity || user.city,
        postalCode: updatePostalCode || user.postalCode,
        shortDescription: updateShortDescription || user.shortDescription,
        aboutMe: updateAboutMe || user.aboutMe
      },
      {
        where: {
          id: updateId
        }
      }
    )

    res.status(200).send({ message: "Update was successfully" })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error deleting user"
    res.status(409).send(errorMessage)
  }
}
