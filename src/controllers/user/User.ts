import { compare } from '../../utils/handleBcrypt'
import { Request, Response } from 'express'
import { User } from '../../types/types'
import { UserModel } from '../../config/db'

export const loginUser = async (req: Request, res: Response) => {
  console.log(1)
  try {
    const { email, password } = req.body
    const user: User | null = await UserModel.findOne({ where: { email } })
    if (user == null) {
      res.status(404).send({ error: 'User not found' })
    }
    if (user?.password) {
      const checkPassword = await compare(password, user.password)
      if (checkPassword) {
        res.status(200).send({ data: user })
      }
      if (!checkPassword) {
        res.status(409).send({ error: 'Password invalid' })
      }
    }
  } catch (error: any) {
    res.send(error.error)
  }
}

// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { name, lastName, email, password } = req.body
//     console.log(1)
//     const user: User | null = await userModel.findOne({ where: { email } })
//     console.log(2)
//     if (user != null) {
//       res.status(400).send({ error: 'Email already used' })
//     }
//     const passwordHash = await encrypt(password)
//     const registerUser: User = await userModel.create({
//       name: name as string,
//       lastName: lastName as string,
//       email: email as string,
//       password: passwordHash
//     } as Omit<User, 'id' | 'verified'>)
//     console.log(123)
//     console.log(registerUser)
//     res.status(200).send({ registerUser })
//     console.log(3)
//   } catch (error: any) {
//     res.send(error.error)
//   }
// }
