import { ProjectModel } from "../../config/db"

const getProjectByIdController = async (
  validatedName: string
): Promise<object> => {
  try {
    // Busco todos los projects, filtro y generalizo la escritura al buscarlos
    const allProjects = await ProjectModel.findByPk(validatedName)

    if (!allProjects) throw new Error("The project does not exist")

    return allProjects
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for projects by name"
    return { errorMessage }
  }
}

export default getProjectByIdController
