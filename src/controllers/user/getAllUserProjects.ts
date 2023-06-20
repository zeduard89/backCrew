import { ProjectModel, UserModel } from "../../config/db"
import { Request, Response } from "express"
import { validatorString } from "../../schemas/projectSchemas"

const getAllUserProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const creatorId = req.query.creatorId as string
    validatorString.parse(creatorId)

    if (!creatorId || creatorId === undefined) {
      throw new Error("UserId is required")
    }

    const user = await UserModel.findByPk(creatorId)
    if (!user) {
      throw new Error("User not found")
    }

    const findedUser = await UserModel.findOne({
      where: { id: user.id },
      include: [ProjectModel]
    })

    if (!findedUser || !findedUser.projects) {
      throw new Error("No Projects found")
    }

    return res.status(200).json(findedUser.projects)
  } catch (error) {
    console.error("Error fetching projects for user:", error)
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    })
  }
}

export default getAllUserProjects
