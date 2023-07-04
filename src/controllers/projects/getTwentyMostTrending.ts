import { ProjectModel, ImagesModel } from "../../config/db"

// sort
const sortByTrending = (a: ProjectModel, b: ProjectModel) => b.likes - a.likes

// Controller
const getTwentyMostTrending = async (): Promise<object> => {
  try {
    let existingProjects = await ProjectModel.findAll({
      where: { displayProject: true },
      include: {
        model: ImagesModel, // Incluir el modelo de imágenes relacionadas al proyecto
        attributes: ["url"] // Seleccionar solo la propiedad 'url'
      }
    })

    if (existingProjects.length === 0) {
      throw new Error("There are no projects")
    }

    //  Most trending sort
    existingProjects = existingProjects.sort(sortByTrending)

    // Slice existingProjects for deliver to Front by most treding

    const TwentyMostTrending = existingProjects.slice(0, 20)

    return TwentyMostTrending
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while fetching trending projects."
    return { errorMessage }
  }
}

export default getTwentyMostTrending
