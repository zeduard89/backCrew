import { ProjectModel } from "../../config/db"

const getAllProyectByNameController = async (
  validatedName: string
): Promise<object> => {
  try {
    // Busco todos los projects, filtro y generalizo la escritura al buscarlos
    const allProjects = await ProjectModel.findAll()
    const newAllProjects = allProjects.filter((project) => {
      return project.title
        .toLowerCase()
        .trim()
        .replace(/\s/g, "")
        .includes(validatedName.toLowerCase().trim().replace(/\s/g, ""))
    })
    // Si obtengo un array vacio, retorno respusta STRING
    if (newAllProjects.length === 0) throw new Error("Project no existe")

    // Limito la info del array
    const auxArray: object[] = []
    newAllProjects.map((project) => {
      const auxProject = {
        id: project.id,
        title: project.title,
        description: project.description,
        shortDescription: project.shortDescription,
        fundingCurrent: project.fundingCurrent,
        fundingGoal: project.fundingGoal,
        fundingGoalReached: project.fundingGoalReached,
        fundingPercentage: project.fundingPercentage,
        fundingDayLeft: project.fundingDayLeft,
        likes: project.likes,
        disLikes: project.disLikes,
        categories: project.category,
        banco: project.banco,
        cuenta: project.cuenta,
        pais: project.location,
        projectFase: project.projectFase
      }
      return auxArray.push(auxProject)
    })

    return auxArray
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default getAllProyectByNameController
