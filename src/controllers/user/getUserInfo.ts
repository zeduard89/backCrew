import { Request, Response } from "express"
import { UserModel } from "../../config/db"
import { IUserLD } from "../../types/types"

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email }: IUserLD = req.query
    const user: IUserLD | null = await UserModel.findOne({ where: { email } })
    if (user == null) {
      throw new Error("User not found")
    }

    res.status(200).json({ user })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error searching for user"
    res.status(409).send(errorMessage)
  }
}
