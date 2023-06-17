import { Request, Response } from "express"
import { UserModel } from "../../config/db"
import { IUser } from "../../types/types"

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id }: IUser = req.body
    const user: IUser | null = await UserModel.findOne({ where: { id } })
    if (user != null) {
      throw new Error("ID already used")
    }
    const newId = id
    const registerUser: IUser = await UserModel.create({
      id: newId
    })
    res.status(200).send({ registerUser })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error registering user"
    res.status(400).send(errorMessage)
  }
}
