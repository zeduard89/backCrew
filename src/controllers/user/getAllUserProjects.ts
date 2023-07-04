import { UserModel } from "../../config/db"
import { Request, Response } from "express"
import { validatorString } from "../../schemas/projectSchemas"

const getAllUserProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const creatorId = req.query.creatorId as string
    if (!creatorId || creatorId === null)
      throw new Error("creatorId is required")
    validatorString.parse(creatorId)

    if (!creatorId || creatorId === undefined) {
      throw new Error("UserId is required")
    }

    const user = await UserModel.findOne({
      where: { id: creatorId, verified: true }
    })

    if (!user) {
      throw new Error("User not found or was Banned")
    }
    // Busco por medio de su relacion (projects esta dentro del modelo user)
    const findedUser = await user.$get("projects")

    res.status(200).json(findedUser)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error registering user"
    res.status(400).send(errorMessage)
  }
}

export default getAllUserProjects
