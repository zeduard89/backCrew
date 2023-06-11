import { ProjectModel } from "../../config/db"
import { updateProject } from "../../types/types"

const updatedProjectController = async (
  validatedProject: updateProject
): Promise<object> => {
  try {
    // Compruebo que no exista un nombre igual
    const projectDBname = await ProjectModel.findOne({
      where: { title: validatedProject.title }
    })
    if (projectDBname) return { message: "El titulo ya existe" }

    // Busco el projecto y lo edito
    const projectDB = await ProjectModel.findOne({
      where: { id: validatedProject.id }
    })
    // Si no existe retorno mensaje
    if (!projectDB) return { message: "Project no existe" }
    // caso contrario Lo edito
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

    return {
      message: `Cambio exitoso del projecto ${projectDB.id}${existingProject}`
    }
  } catch (error) {
    return { message: "Error Buscando el Projecto por id" }
  }
}

export default updatedProjectController
