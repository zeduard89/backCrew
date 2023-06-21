import { Request, Response } from "express"
import { UserModel, ProjectModel } from "../../config/db"

export const postUserFavoriteRelationship = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, projectId } = req.query
    if (!userId || !projectId)
      throw new Error("userId and projectId are required")

    const project = await ProjectModel.findByPk(projectId.toString())
    if (project == null) {
      throw new Error("Project not found")
    }
    const foundUser = await UserModel.findByPk(userId.toString())
    if (foundUser == null) {
      throw new Error("User not found")
    }
    // Creo Relacion Favoritos
    await foundUser.$add("favoriteProjects", project)

    res.status(200).send({ message: "Relationship successfully added" })
  } catch (error) {
    res.status(500).send({ message: `${error}` })
  }
}
