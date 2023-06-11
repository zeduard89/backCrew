import { ProjectModel } from "../../config/db"
import { updateFundingCurrentIProyect } from "../../types/types"

const updatedProjectController = async (
  validatedProject: updateFundingCurrentIProyect
): Promise<object> => {
  try {
    // Busco el projecto y compruebo y edito
    const projectDB = await ProjectModel.findOne({
      where: { title: validatedProject.title }
    })
    if (!projectDB) return { message: "Project no existe" }

    // Actualizo fundingCurrent
    const newFundingCurrent =
      validatedProject.addToFundingCurrent + projectDB.fundingCurrent
    // Actualizo fundingPercentage
    const newFundingPercentage =
      (100 * newFundingCurrent) / projectDB.fundingGoal

    const existingProject = await ProjectModel.update(
      {
        // Aquí se proporcionan los valores a actualizar
        fundingCurrent: newFundingCurrent,
        fundingPercentage: newFundingPercentage
      },
      {
        // Aquí se especifica la condición de búsqueda
        where: {
          title: validatedProject.title
        }
      }
    )

    return existingProject
  } catch (error) {
    return { message: "Error Buscando el Projecto por name" }
  }
}

export default updatedProjectController
