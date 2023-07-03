import { ProjectModel } from "../../config/db"
import { updateProject } from "../../types/types"

const updatedProjectController = async (
  validatedProject: updateProject
): Promise<string> => {
  try {
    // Compruebo que no exista un nombre igual
    const projectDBname = await ProjectModel.findOne({
      where: { title: validatedProject.title }
    })
    if (projectDBname) {
      throw new Error("The title already exists")
    }
    // Busco el projecto y lo edito
    const projectDB = await ProjectModel.findOne({
      where: { id: validatedProject.id }
    })
    // Si no existe retorno mensaje
    if (!projectDB) {
      throw new Error("Project does not exist")
    } // caso contrario Lo edito
    await ProjectModel.update(
      {
        // Aquí se proporcionan los valores a actualizar
        title: validatedProject.title || projectDB.title,
        description: validatedProject.description || projectDB.description,
        shortDescription:
          validatedProject.shortDescription || projectDB.shortDescription,
        fundingGoal: validatedProject.fundingGoal || projectDB.fundingGoal,
        fundingDayLeft:
          validatedProject.fundingDayLeft || projectDB.fundingDayLeft,
        category: validatedProject.category || projectDB.category
        // bank: validatedProject.banco || projectDB.banco,
        // account: validatedProject.cuenta || projectDB.cuenta,
        // location: validatedProject.country || projectDB.country
      },
      {
        // Aquí se especifica la condición de búsqueda
        where: {
          id: validatedProject.id
        }
      }
    )

    return `Successful update of the project with ID: ${projectDB.id}`
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while updating project"
    return errorMessage
  }
}

export default updatedProjectController
