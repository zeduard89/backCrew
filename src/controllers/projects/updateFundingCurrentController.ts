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
    if (!projectDB) throw new Error("Project no existe")

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
          title: validatedProject.title
        }
      }
    )

    return {
      message: `Se modifico Correctamente el valor de fundingCurrent y fundingPercentage`
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default updatedProjectController
