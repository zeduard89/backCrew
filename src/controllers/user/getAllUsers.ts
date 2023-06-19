import { Request, Response } from "express"
import { UserModel } from "../../config/db"

const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await UserModel.findAll()
    if (users.length === 0) throw new Error("There are no users")

    return res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users:", error)

    // Si ocurre un error, envía una respuesta de error al cliente
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    })
  }
}

export default getAllUsers
