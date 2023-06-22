import { Request, Response } from "express"
import { UserModel, ProjectModel } from "../../config/db"

export const deleteUserFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, projectId } = req.query
    if (!userId || !projectId)
      throw new Error("userId and projectId are required")

    const projectToRemove = await ProjectModel.findByPk(projectId.toString())
    if (projectToRemove == null) {
      throw new Error("Project not found")
    }
    const foundUser = await UserModel.findByPk(userId.toString())
    if (foundUser == null) {
      throw new Error("User not found")
    }
    // Creo Relacion Favoritos
    await foundUser.$remove("favoriteProjects", projectToRemove) // Eliminar un proyecto de la lista de favoritos

    res.status(200).send({ message: "Project was successfully Deleted" })
  } catch (error) {
    res.status(500).send({ message: `${error}` })
  }
}
