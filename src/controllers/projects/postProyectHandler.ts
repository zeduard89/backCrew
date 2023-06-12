import { ProjectModel } from "../../config/db"
import { IProject } from "../../types/types"

const createProjectController = async (
  validatedProject: IProject
): Promise<object> => {
  try {
    const { title, ...rest } = validatedProject
    const existingProject = await ProjectModel.findOne({ where: { title } })
    if (existingProject) {
      throw new Error("El Proyecto ya existe ")
    }

    const createdProject = await ProjectModel.create({
      title,
      ...rest
    })

    return createdProject
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default createProjectController
