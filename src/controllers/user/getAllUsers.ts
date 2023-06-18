import { UserModel } from "../../config/db"
import { Request, Response } from "express"

const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const existingUsers = await UserModel.findAll()

    if (Object.keys(existingUsers).length === 0) {
      throw new Error("There are no Users in the DB")
    }

    return res.status(200).json(existingUsers)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while retrieving all projects"
    res.status(400).send({ errorMessage })
  }

  return res.status(500).json({
    success: false,
    error: "Internal server error"
  })
}

export default getAllUsers
