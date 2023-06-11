import { ProjectModel } from "../../config/db"
import { updateProject } from "../../types/types"

const updatedProjectController = async (
  validatedProject: updateProject
): Promise<object> => {
  try {
    // Busco el projecto y compruebo y edito
    const projectDB = await ProjectModel.findOne({
      where: { id: validatedProject.id }
    })
    if (!projectDB) return { message: "Project no existe" }

    const existingProject = await ProjectModel.update(
      {
        // Aquí se proporcionan los valores a actualizar
        title: validatedProject.title || projectDB.title,
        description: validatedProject.description || projectDB.description,
        fundingGoal: validatedProject.fundingGoal || projectDB.fundingGoal,
        fundingDayLeft:
          validatedProject.fundingDayLeft || projectDB.fundingDayLeft,
        categories: validatedProject.categories || projectDB.categories
        // comment: model
      },
      {
        // Aquí se especifica la condición de búsqueda
        where: {
          id: validatedProject.id
        }
      }
    )

    return existingProject
  } catch (error) {
    return { message: "Error Buscando el Projecto por name" }
  }
}

export default updatedProjectController
