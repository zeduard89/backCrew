import { ProjectModel, ImagesModel } from "../../config/db"

const getProyectByNameController = async (
  validatedName: string
): Promise<object> => {
  try {
    // Busco todos los projects, filtro y generalizo la escritura al buscarlos
    const allProjects = await ProjectModel.findAll({
      where: {
        displayProject: true
      },
      include: {
        model: ImagesModel, // Incluir el modelo de imágenes relacionadas al proyecto
        attributes: ["url"] // Seleccionar solo la propiedad 'url'
      }
    })
    const projectByName = allProjects.filter(
      (project) =>
        project.title.toLowerCase().trim().replace(/\s/g, "") ===
        validatedName.toLowerCase().trim().replace(/\s/g, "")
    )

    // Si el nombre exacto no existe en la DB, busco coincidencia
    if (!projectByName || projectByName.length === 0) {
      const newAllProjects = allProjects.filter((project) => {
        return project.title
          .toLowerCase()
          .trim()
          .replace(/\s/g, "")
          .includes(validatedName.toLowerCase().trim().replace(/\s/g, ""))
      })
      // Si obtengo un array vacio, retorno respusta STRING
      if (newAllProjects.length === 0) {
        throw new Error("Project does not exist or ir Banned")
      } // Si obtengo resultados devuelvo un array de opciones
      const auxArray: string[] = []
      newAllProjects.forEach((project) => auxArray.push(project.title))
      return auxArray
    }

    return projectByName
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for projects by name"
    return { errorMessage }
  }
}

export default getProyectByNameController
