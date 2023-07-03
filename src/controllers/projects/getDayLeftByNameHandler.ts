import { ProjectModel } from "../../config/db"
import { limitDate } from "../../types/types"

const getLeftDayByNameController = async (
  validatedId: string
): Promise<object> => {
  try {
    const existingProject = await ProjectModel.findOne({
      where: { id: validatedId }
    })

    if (!existingProject) {
      throw new Error("Project no existe")
    }
    //! Logica para fecha limite
    // Obtengo la cantidad de milisegundos desde 1/1/1970 hasta la creacion
    const createdAtDate = new Date(existingProject.createdAt).getTime()
    // Obtengo los milisegundos de la fecha limite impuesta
    const limitDays = existingProject.fundingDayLeft * 24 * 60 * 60 * 1000
    // Sumo ambos valores (sin newDate es solo numerico)
    const deadlineDate = new Date(createdAtDate + limitDays)

    // Obtener días restantes
    const currentDate = new Date()
    const remainingTime = deadlineDate.getTime() - currentDate.getTime()
    const remainingDays = Math.ceil(remainingTime / (24 * 60 * 60 * 1000))

    // Obtener componentes individuales de la fecha límite
    const limitDate: limitDate = {
      year: deadlineDate.getFullYear(),
      month: deadlineDate.getMonth() + 1, // Los meses en JavaScript son base 0, por lo que se suma 1
      day: deadlineDate.getDate(),
      hours: deadlineDate.getHours(),
      minutes: deadlineDate.getMinutes(),
      seconds: deadlineDate.getSeconds(),
      daysLeft: remainingDays
    }

    return limitDate
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for dayleft by name"
    return { errorMessage }
  }
}

export default getLeftDayByNameController
