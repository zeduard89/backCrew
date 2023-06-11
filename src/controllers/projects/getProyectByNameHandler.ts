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
      return { message: "Project no existe" }
    }

    return existingProject
  } catch (error) {
    return { message: "Error Buscando el Projecto por ID" }
  }
}

export default getProyectByNameController
