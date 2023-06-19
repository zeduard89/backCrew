import { ProjectModel, UserModel } from "../../config/db"
import { IProject } from "../../types/types"
// import { BlobServiceClient } from "@azure/storage-blob"

// // Cargamos las variables de entorno con config y la ejecuto para conectar
// import dotenv from "dotenv"
// dotenv.config()
// const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
// if (!connectionString) {
//  throw new Error("Azure Storage connection string is not configured");
// }
// const blobService = BlobServiceClient.fromConnectionString(connectionString) // conexion

const createProjectController = async (
  validatedProject: IProject
): Promise<object> => {
  try {
    const { title, creatorId, ...rest } = validatedProject
    console.log(creatorId)
    const user = await UserModel.findOne({ where: { id: creatorId } })
    if (!user) throw new Error("User does not exist in DB")

    const allProjects = await ProjectModel.findAll()
    const newAllProjects = allProjects.filter(
      (project) =>
        project.title.toLowerCase().trim().replace(/\s/g, "") ===
        title.toLowerCase().trim().replace(/\s/g, "")
    )

    if (newAllProjects.length > 0) {
      throw new Error("Project exists")
    }

    const createdProject = await ProjectModel.create({
      title,
      creatorId,
      ...rest
    })

    // createdProject.creatorId = user.id
    // await createdProject.save()

    // ------------------------------------------------------------
    // if (user) await user.addUserModel(createdProject)
    // await createdProject.$set("user", user)
    // await user.$set("projects", [createdProject])
    // createdProject.user = user // Asignar el usuario al campo 'user' del proyecto
    // await createdProject.save() // Guardar el proyecto actualizado en la base de datos
    // -----------------------------------------------------------------------

    // //! Omitir este sector y sus elementos para limitar la creacion de Containers
    // // Ejemplo crew1 con id=1
    // const newIdProjectContainer = `crew${createdProject.id.toString()}`
    // // Buscamos si existe el contenedor, sino existe lo creo con el id del Project
    // const containerClient = blobService.getContainerClient(
    //   newIdProjectContainer
    // )
    // const containerExist = await containerClient.exists()
    // if (containerExist)
    // throw new Error(`The container: ${newIdProjectContainer} already exists`);

    // await blobService.createContainer(newIdProjectContainer)
    //! ---------------------------------
    return { message: `Project: ${createdProject.title} created successfully` }
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error "
    return { errorMessage }
  }
}

export default createProjectController
