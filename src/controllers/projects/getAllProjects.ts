import { ProjectModel } from "../../config/db"

const getAllProjects = async (): Promise<object> => {
  try {
    const existingProject = await ProjectModel.findAll()

    if (Object.keys(existingProject).length === 0) {
      throw new Error("There are no projects in the DB")
    }
    return existingProject
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while retrieving all projects"
    return { errorMessage }
  }
}

export default getAllProjects
