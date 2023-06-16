import { ProjectModel } from "../../config/db"
import { IProject } from "../../types/types"
// import { BlobServiceClient } from "@azure/storage-blob"

// // Cargamos las variables de entorno con config y la ejecuto para conectar
// import dotenv from "dotenv"
// dotenv.config()
// const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
// if (!connectionString) {
//   throw new Error("La cadena de conexión de Azure Storage no está configurada")
// }
// const blobService = BlobServiceClient.fromConnectionString(connectionString) // conexion

const createProjectController = async (
  validatedProject: IProject
): Promise<object> => {
  try {
    const { title, ...rest } = validatedProject
    console.log(validatedProject)

    const allProjects = await ProjectModel.findAll()
    const newAllProjects = allProjects.filter(
      (project) =>
        project.title.toLowerCase().trim().replace(/\s/g, "") ===
        title.toLowerCase().trim().replace(/\s/g, "")
    )

    if (newAllProjects.length > 0) {
      throw new Error("Project  existe")
    }

    const createdProject = await ProjectModel.create({
      title,
      ...rest
    })

    // //! Omitir este sector y sus elementos para limitar la creacion de Containers
    // // Ejemplo crew1 con id=1
    // const newIdProjectContainer = `crew${createdProject.id.toString()}`
    // // Buscamos si existe el contenedor, sino existe lo creo con el id del Project
    // const containerClient = blobService.getContainerClient(
    //   newIdProjectContainer
    // )
    // const containerExist = await containerClient.exists()
    // if (containerExist)
    //   throw new Error(`El container: ${newIdProjectContainer} ya existe`)

    // await blobService.createContainer(newIdProjectContainer)
    //! ---------------------------------
    return { message: `Proyecto: ${createdProject.title} Creado con exito` }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default createProjectController
