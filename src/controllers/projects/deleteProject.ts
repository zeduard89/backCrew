import { ProjectModel } from "../../config/db"

const deleteProject = async (projectId: string): Promise<string> => {
  try {
    const project = await ProjectModel.findByPk(projectId)
    if (!project) throw new Error("User not found")

    await project.destroy()

    return "Project Was Destroyed Successfully"
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error deleting user"
    return errorMessage
  }
}

export default deleteProject
