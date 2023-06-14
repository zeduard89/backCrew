import { ProjectModel } from "../../config/db"
import { IProject } from "../../types/types"
import { BlobServiceClient } from "@azure/storage-blob"

// Cargamos las variables de entorno con config y la ejecuto para conectar
import dotenv from "dotenv"
dotenv.config()
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
if (!connectionString) {
  throw new Error("La cadena de conexión de Azure Storage no está configurada")
}
const blobService = BlobServiceClient.fromConnectionString(connectionString) // conexion

const createProjectController = async (
  validatedProject: IProject
): Promise<object> => {
  try {
    const { title, ...rest } = validatedProject
    const existingProject = await ProjectModel.findOne({ where: { title } })
    if (existingProject) {
      throw new Error("El Proyecto ya existe ")
    }

    const createdProject = await ProjectModel.create({
      title,
      ...rest
    })

    //! Omitir este sector y sus elementos para limitar la creacion de Containers
    // Ejemplo crew1 con id=1
    const newIdProjectContainer = `crew${createdProject.id.toString()}`
    // Buscamos si existe el contenedor, sino existe lo creo con el id del Project
    const containerClient = blobService.getContainerClient(
      newIdProjectContainer
    )
    const containerExist = await containerClient.exists()
    if (containerExist)
      throw new Error(`El container: ${newIdProjectContainer} ya existe`)

    await blobService.createContainer(newIdProjectContainer)
    //! ---------------------------------
    return createdProject
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default createProjectController