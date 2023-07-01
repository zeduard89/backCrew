import { Request, Response } from "express"
import { UserModel } from "../../config/db"
import { IUser } from "../../types/types"
import main from "./emailNotificacionUser"
import {
  BlobServiceClient,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential
} from "@azure/storage-blob"
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

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const blobName = "userDefault.png"
  const containerName = "defaultcontainer"

  try {
    const {
      name,
      lastName,
      email,
      id,
      country,
      city,
      postalCode,
      shortDescription,
      aboutMe
    }: IUser = req.body

    // Validate country, city, postalCode, ShortDescription and aboutMe
    validatorCountry.parse(country)
    validatorCity.parse(city)
    validatorPostalCode.parse(postalCode)
    validatorShortDescription.parse(shortDescription)
    validatorAboutMe.parse(aboutMe)

    const user: IUser | null = await UserModel.findOne({ where: { email } })
    if (user != null) {
      throw new Error("Email already used")
    }

    // Buscamos si existe el contenedor
    const containerClient = blobService.getContainerClient(containerName)
    const containerExist = await containerClient.exists()
    if (!containerExist) {
      throw new Error(`The container: ${containerName} does not exist`)
    }
    // Buscamos si existe la imagen
    const blobClient = await containerClient.getBlockBlobClient(blobName)
    const blobExist = await blobClient.exists()
    if (!blobExist) {
      throw new Error(`The element: ${blobName} does not exists`)
    }
    // Genero el permisos para podes acceder a al elemento
    const sasPermissions = new BlobSASPermissions()
    sasPermissions.read = true // Set the desired permissions
    if (!process.env.ACCOUNT_NAME || !process.env.ACCOUNT_KEY) {
      throw new Error("Error in Azure accreditation")
    }
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
    const blobUrlWithSAS = blobClient.url + "?" + sasToken

    const dateNow = new Date()
    const newUser = await UserModel.create({
      id,
      name,
      lastName,
      email,
      avatar: blobUrlWithSAS,
      date: dateNow.toString(),
      // se puede sacar el pais "date": "Sun Jun 18 2023 02:11:25 GMT-0300 (Argentina Standard Time)",
      country,
      city,
      postalCode,
      shortDescription,
      aboutMe
    })

    main(newUser.name, newUser.lastName, newUser.email, newUser.country)

    res.status(200).send("User was registered successfully")
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error registering user"
    res.status(400).send(errorMessage)
  }
}
// import main from "./emailNotificacion"

// main(
//   newDetail.email,
//   newDetail.firstName,
//   newDetail.id,
//   title,
//   newDetail.transactionAmount,
//   newDetail.status
// )
