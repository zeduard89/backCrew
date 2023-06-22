// import { Request, Response } from "express"
// import { UserModel } from "../../config/db"
// import { IUser } from "../../types/types"
// import { compare } from "../../utils/handleBcrypt"

// export const deleteUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { email, password }: IUser = req.body
//     const user: IUser | null = await UserModel.findOne({ where: { email } })
//     if (user == null) {
//       throw new Error("User not found")
//     }
//     if (user?.password != null) {
//       const checkPassword = await compare(password, user.password)
//       if (checkPassword) {
//         const newEmail = email
//         const newFalse = false
//         await UserModel.update(
//           { verified: newFalse },
//           { where: { email: newEmail } }
//         )
//         res.status(200).send({ data: user })
//       }
//       if (!checkPassword) {
//         throw new Error("Password invalid")
//       }
//     }
//   } catch (error) {
//     const errorMessage =
//       (error as Error).message || "Unknown error deleting user"
//     res.status(409).send(errorMessage)
//   }
// }
