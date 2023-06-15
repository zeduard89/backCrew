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

    // Si el nombre exacto no existe en la DB, busco coincidencia
    if (!newAllProjects || newAllProjects.length === 0) {
      const newAllProjects = allProjects.filter((project) => {
        return project.title
          .toLowerCase()
          .trim()
          .replace(/\s/g, "")
          .includes(validatedName)
      })
      // Si obtengo un array vacio, retorno respusta STRING
      if (newAllProjects.length === 0) throw new Error("Project no existe")
      // Si obtengo resultados devuelvo un array de opciones
      const auxArray: string[] = []
      newAllProjects.forEach((project) => auxArray.push(project.title))
      return auxArray
    }

    return newAllProjects
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default getProyectByNameController

// if (!newAllProjects) {
//   const newAllProjects = allProjects.filter((project) => {
//     return project.title.toLowerCase().includes(validatedName)
//   })
//   if (!newAllProjects) throw new Error("Project no existe")
//   return newAllProjects
// }
