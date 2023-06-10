import { ProjectModel } from "../../config/db"
import { IProject } from "../../types/types"

const createProjectController = async (
  validatedProject: IProject
): Promise<object> => {
  try {
    const { title, ...rest } = validatedProject
    const existingProject = await ProjectModel.findOne({ where: { title } })
    if (existingProject) {
      return { message: "El Proyecto ya existe " }
    }

    const createdProject = await ProjectModel.create({
      title,
      ...rest
    })

    return createdProject
  } catch (error) {
    return { message: "Error creando el Projecto" }
  }
}

export default createProjectController
