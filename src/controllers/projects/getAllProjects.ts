import { ProjectModel } from "../../config/db"

const getAllProjects = async (): Promise<object> => {
  try {
    const existingProject = await ProjectModel.findAll()

    if (Object.keys(existingProject).length === 0) {
      throw new Error("No hay proyectos en la DB")
    }
    return existingProject
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default getAllProjects
