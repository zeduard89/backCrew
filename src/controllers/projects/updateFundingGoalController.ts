import { ProjectModel } from "../../config/db"
import { updateFundingGoalIProyect } from "../../types/types"

const updatedProjectController = async (
  validatedProject: updateFundingGoalIProyect
): Promise<object> => {
  try {
    // Busco el projecto y compruebo y edito
    const projectDB = await ProjectModel.findOne({
      where: { title: validatedProject.title }
    })
    if (!projectDB) return { message: "Project no existe" }

    // Busco current de DB y de front , sumos y aplico
    const newFundingCurrent =
      validatedProject.addToFundingCurrent + projectDB.fundingCurrent
    const existingProject = await ProjectModel.update(
      {
        // Aquí se proporcionan los valores a actualizar
        fundingCurrent: newFundingCurrent
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
