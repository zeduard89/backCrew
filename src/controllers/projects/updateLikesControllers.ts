import { ProjectModel } from "../../config/db"
import { updateLikes } from "../../types/types"

const updateLikesController = async (
  validatedProject: updateLikes
): Promise<string> => {
  try {
    // Busco el projecto y compruebo y edito
    const projectDB = await ProjectModel.findOne({
      where: { id: validatedProject.id }
    })
    if (!projectDB) {
      throw new Error("The project does not exist")
    }
    // Actualizo fundingCurrent
    const newLikes = validatedProject.likes + projectDB.likes
    const newDisLikes = validatedProject.disLikes + projectDB.disLikes

    await ProjectModel.update(
      {
        // Aquí se proporcionan los valores a actualizar
        likes: newLikes,
        disLikes: newDisLikes
      },
      {
        // Aquí se especifica la condición de búsqueda
        where: {
          id: validatedProject.id
        }
      }
    )
    return "Successfully modified the values of likes"
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while updating likes"
    return errorMessage
  }
}

export default updateLikesController
