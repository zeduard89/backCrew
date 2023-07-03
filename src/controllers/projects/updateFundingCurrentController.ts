import { ProjectModel } from "../../config/db"
import { updateFundingCurrentIProyect } from "../../types/types"

const updatedProjectController = async (
  validatedProject: updateFundingCurrentIProyect
): Promise<string> => {
  try {
    // Busco el projecto y compruebo y edito
    const projectDB = await ProjectModel.findOne({
      where: { id: validatedProject.id }
    })
    if (!projectDB) {
      throw new Error("Project does not exist")
    }
    // Actualizo fundingCurrent
    const newFundingCurrent =
      validatedProject.addToFundingCurrent + projectDB.fundingCurrent
    // Actualizo fundingPercentage
    const newFundingPercentage =
      (100 * newFundingCurrent) / projectDB.fundingGoal

    await ProjectModel.update(
      {
        // Aquí se proporcionan los valores a actualizar
        fundingCurrent: newFundingCurrent,
        fundingPercentage: newFundingPercentage
      },
      {
        // Aquí se especifica la condición de búsqueda
        where: {
          id: validatedProject.id
        }
      }
    )

    return "Successfully modified the value of fundingCurrent and fundingPercentage"
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while updating founding project"
    return errorMessage
  }
}

export default updatedProjectController
