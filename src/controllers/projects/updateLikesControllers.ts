import { ProjectModel } from "../../config/db"
import { updateLikes } from "../../types/types"

const updateLikesController = async (
  validatedProject: updateLikes
): Promise<object> => {
  try {
    // Busco el projecto y compruebo y edito
    const projectDB = await ProjectModel.findOne({
      where: { title: validatedProject.title }
    })
    if (!projectDB) return { message: "Project no existe" }

    // Actualizo fundingCurrent
    const newLikes = validatedProject.likes + projectDB.likes
    const newDisLikes = validatedProject.disLikes + projectDB.disLikes

    const existingProject = await ProjectModel.update(
      {
        // Aquí se proporcionan los valores a actualizar
        likes: newLikes,
        disLikes: newDisLikes
      },
      {
        // Aquí se especifica la condición de búsqueda
        where: {
          title: validatedProject.title
        }
      }
    )
    console.log(existingProject)
    return {
      message: `Se modifico Correctamente el valor de likes: ${newLikes} y disLikes: ${newDisLikes}`
    }
  } catch (error) {
    return { message: "Error actualizando likes" }
  }
}

export default updateLikesController
