import { Request, Response } from "express"
import { UserModel } from "../../config/db"
import { IUser } from "../../types/types"
import { compare, encrypt } from "../../utils/handleBcrypt"

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user: IUser | null = await UserModel.findOne({ where: { email } })
    if (user == null) {
      res.status(404).send({ error: "User not found" })
    }
    if (user?.password != null) {
      const checkPassword = await compare(password, user.password)
      if (checkPassword) {
        res.status(200).send({ data: user })
      }
      if (!checkPassword) {
        res.status(409).send({ error: "Password invalid" })
      }
    }
  } catch (error: any) {
    res.send(error.error)
  }
}

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, lastName, email, password }: IUser = req.body
    const user: IUser | null = await UserModel.findOne({ where: { email } })
    if (user != null) {
      res.status(400).send({ error: "Email already used" })
    }
    const passwordHash = await encrypt(password)
    const registerUser: IUser = await UserModel.create({
      name,
      lastName,
      email,
      password: passwordHash
    })
    res.status(200).send({ registerUser })
  } catch (error: any) {
    res.send(error.error)
  }
}
