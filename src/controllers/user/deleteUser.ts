import { Request, Response } from "express"
import { UserModel } from "../../config/db"
import { IUserDelete } from "../../types/types"

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userEmail, userId }: IUserDelete = req.query
    if (!userEmail || !userId) throw new Error("Email and ID are required")
    const user = await UserModel.findByPk(userId)
    if (!user) throw new Error("User not found")

    await user.destroy()

    res.status(200).send("User Was Destroyed Successfully")
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error deleting user"
    res.status(404).send(errorMessage)
  }
}
