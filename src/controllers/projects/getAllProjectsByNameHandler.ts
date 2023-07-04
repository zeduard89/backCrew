import { ProjectModel, ImagesModel } from "../../config/db"

const getAllProyectByNameController = async (
  validatedName: string
): Promise<object> => {
  try {
    // Busco todos los projects, filtro y generalizo la escritura al buscarlos
    const allProjects = await ProjectModel.findAll({
      where: { displayProject: true },
      include: {
        model: ImagesModel, // Incluir el modelo de imágenes relacionadas al proyecto
        attributes: ["url"] // Seleccionar solo la propiedad 'url'
      }
    })
    const newAllProjects = allProjects.filter((project) => {
      return project.title
        .toLowerCase()
        .trim()
        .replace(/\s/g, "")
        .includes(validatedName.toLowerCase().trim().replace(/\s/g, ""))
    })
    // Si obtengo un array vacio, retorno respusta STRING
    if (newAllProjects.length === 0) {
      throw new Error("Project does not exist or is Banned")
    }

    return newAllProjects
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while searching for projects"
    return { errorMessage }
  }
}

export default getAllProyectByNameController
