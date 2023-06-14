import { Request, Response } from "express"
import { UserModel } from "../../config/db"
import { IUser } from "../../types/types"
import { encrypt } from "../../utils/handleBcrypt"

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, lastName, email, password }: IUser = req.body
    const user: IUser | null = await UserModel.findOne({ where: { email } })
    if (user != null) {
      throw new Error("Email already used")
    }

    const passwordHash = await encrypt(password)
    const registerUser: IUser = await UserModel.create({
      name,
      lastName,
      email,
      password: passwordHash,
      access: false
    })
    res.status(200).send({ registerUser })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error registering user"
    res.status(400).send(errorMessage)
  }
}
