import { ProjectModel } from "../../config/db"

const getAllProjects = async (): Promise<object> => {
  try {
    const existingProject = await ProjectModel.findAll()

    if (Object.keys(existingProject).length === 0) {
      return { message: "No hay proyectos en la DB" }
    }
    return existingProject
  } catch (error) {
    return { message: "Error Buscando todos los Projectos" }
  }
}

export default getAllProjects
