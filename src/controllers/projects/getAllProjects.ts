import { ProjectModel, ImagesModel } from "../../config/db"

const getAllProjects = async (): Promise<object> => {
  try {
    // const newExistingProject = await ProjectModel.findAll()
    const project = await ProjectModel.findAll({
      where: { displayProject: true },
      include: {
        model: ImagesModel, // Incluir el modelo de imágenes relacionadas al proyecto
        attributes: ["url"] // Seleccionar solo la propiedad 'url'
      }
    })

    if (Object.keys(project).length === 0) {
      throw new Error("There are no projects in the DB")
    }
    return project
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while retrieving all projects"
    return { errorMessage }
  }
}

export default getAllProjects
