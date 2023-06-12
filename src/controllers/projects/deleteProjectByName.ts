import { ProjectModel } from "../../config/db"
import { deleteIProyect } from "../../types/types"

const deleteProyectByNameController = async (
  validatedProject: deleteIProyect
): Promise<object> => {
  try {
    const projectDB = await ProjectModel.findOne({
      where: { title: validatedProject.title }
    })
    if (!projectDB) throw new Error("Projecto no encontrado")
    //* Si la condicion es FALSE la retorno a TRUE
    if (!validatedProject.displayProject) {
      const existingProject = await ProjectModel.update(
        {
          // Aquí se proporcionan los valores a actualizar
          displayProject: false
        },
        {
          // Aquí se especifica la condición de búsqueda
          where: {
            title: validatedProject.title
          }
        }
      )
      if (!existingProject) {
        throw new Error("Project no existe")
      }

      return {
        message: `Cambio exitoso displayProject: ${validatedProject.displayProject}`
      }
    }
    //* Si la condicion es TRUE la retorno a FALSE
    const existingProject = await ProjectModel.update(
      {
        // Aquí se proporcionan los valores a actualizar
        displayProject: true
      },
      {
        // Aquí se especifica la condición de búsqueda
        where: {
          title: validatedProject.title
        }
      }
    )
    if (!existingProject) {
      throw new Error("Project no existe")
    }

    return {
      message: `Cambio exitoso displayProject: ${validatedProject.displayProject}`
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al guardar ImagenAzure"
    return { errorMessage }
  }
}

export default deleteProyectByNameController
