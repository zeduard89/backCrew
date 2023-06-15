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
    if (projectDBname) throw new Error("El titulo ya existe")

    // Busco el projecto y lo edito
    const projectDB = await ProjectModel.findOne({
      where: { id: validatedProject.id }
    })
    // Si no existe retorno mensaje
    if (!projectDB) throw new Error("Project no existe")
    // caso contrario Lo edito
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
        categories: validatedProject.categories || projectDB.categories,
        banco: validatedProject.banco || projectDB.banco,
        cuenta: validatedProject.cuenta || projectDB.cuenta
      },
      {
        // Aquí se especifica la condición de búsqueda
        where: {
          id: validatedProject.id
        }
      }
    )

    return {
      message: `Cambio exitoso del projecto con ID: ${projectDB.id}`
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default updatedProjectController
