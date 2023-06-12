import { ProjectModel } from "../../config/db"

const getProyectByNameController = async (
  validatedName: string
): Promise<object> => {
  try {
    const existingProject = await ProjectModel.findOne({
      where: {
        title: validatedName
      }
    })
    if (!existingProject) {
      throw new Error("Project no existe")
    }

    return existingProject
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default getProyectByNameController
