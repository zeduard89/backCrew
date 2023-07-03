import { Response, Request } from "express"
import { UserModel } from "../../config/db"

const getAllPaymentsFromOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.query.userId as string
    if (userId === undefined || userId === null)
      throw new Error("UserId is required")
    // Busco usuario, si existe, luego los pagos
    const user = await UserModel.findByPk(userId)
    if (!user) throw new Error("User not found")
    const userPayments = await user.$get("userPayments")
    res.status(200).json(userPayments)
  } catch (error) {
    res.status(400).send({ message: "Error getting all user Payments" })
  }
}

export default getAllPaymentsFromOneUser
