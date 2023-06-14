import { Request, Response } from "express"
import { UserModel } from "../../config/db"
import { IUser } from "../../types/types"

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email }: IUser = req.body
    const user: IUser | null = await UserModel.findOne({ where: { email } })
    if (user == null) {
      throw new Error("User not found")
    }

    if (user?.access === true) {
      res.status(200).json({ user })
    } else throw new Error("Access denied")
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error searching for user"
    res.status(409).send(errorMessage)
  }
}
