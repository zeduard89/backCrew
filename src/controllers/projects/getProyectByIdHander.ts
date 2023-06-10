import { ProjectModel } from "../../config/db"

const getProyectByIdController = async (id: string): Promise<object> => {
  try {
    const existingProject = await ProjectModel.findByPk(id)
    if (!existingProject) {
      return { message: "Project no existe" }
    }

    return existingProject
  } catch (error) {
    return { message: "Error Buscando el Projecto por ID" }
  }
}

export default getProyectByIdController
