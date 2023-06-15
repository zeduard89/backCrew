import { ProjectModel } from "../../config/db"

const getProyectByNameController = async (
  validatedName: string
): Promise<object> => {
  try {
    // Busco todos los projects, filtro y generalizo la escritura al buscarlos
    const allProjects = await ProjectModel.findAll()
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
      if (newAllProjects.length === 0) throw new Error("Project no existe")
      // Si obtengo resultados devuelvo un array de opciones
      const auxArray: string[] = []
      newAllProjects.forEach((project) => auxArray.push(project.title))
      return auxArray
    }
    // Limito la info del array
    const auxProject = {
      id: projectByName[0].id,
      title: projectByName[0].title,
      description: projectByName[0].description,
      shortDescription: projectByName[0].shortDescription,
      fundingCurrent: projectByName[0].fundingCurrent,
      fundingGoal: projectByName[0].fundingGoal,
      fundingGoalReached: projectByName[0].fundingGoalReached,
      fundingPercentage: projectByName[0].fundingPercentage,
      fundingDayLeft: projectByName[0].fundingDayLeft,
      likes: projectByName[0].likes,
      disLikes: projectByName[0].disLikes,
      categories: projectByName[0].categories,
      banco: projectByName[0].banco,
      cuenta: projectByName[0].cuenta
    }
    return auxProject
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default getProyectByNameController
