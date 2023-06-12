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
    if (!projectDB) throw new Error("El Project no existe")

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
          title: validatedProject.title
        }
      }
    )
    return {
      message: `Se modifico Correctamente el valor de likes: ${newLikes} y disLikes: ${newDisLikes}`
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default updateLikesController
