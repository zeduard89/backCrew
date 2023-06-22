// import { Request, Response } from "express"
// import { UserModel } from "../../config/db"
// import { IUser } from "../../types/types"

// export const loginUser = async (req: Request, res: Response): Promise<void> => {
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
//         await UserModel.update({ access: true }, { where: { email: newEmail } })
//         const userAccess: IUser | null = await UserModel.findOne({
//           where: { email }
//         })

//         res.status(200).send({ data: userAccess })
//       }
//       if (!checkPassword) {
//         throw new Error("Password invalid")
//       }
//     }
//   } catch (error) {
//     const errorMessage =
//       (error as Error).message || "Unknown error searching for user"
//     res.status(409).send(errorMessage)
//   }
// }
