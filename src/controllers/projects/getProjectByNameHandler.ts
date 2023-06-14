import { ProjectModel } from "../../config/db"

const getProyectByNameController = async (
  validatedName: string
): Promise<object> => {
  try {
    // Busco todos los projects, filtro y generalizo la escritura al buscarlos
    const allProjects = await ProjectModel.findAll()
    const newAllProjects = allProjects.filter(
      (project) =>
        project.title.toLowerCase().trim().replace(/\s/g, "") ===
        validatedName.toLowerCase().trim().replace(/\s/g, "")
    )

    if (!newAllProjects) {
      throw new Error("Project no existe")
    }

    return newAllProjects
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default getProyectByNameController
