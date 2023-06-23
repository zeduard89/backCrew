import { Response, Request } from "express"
import { PaymentsModel } from "../../config/db"

const getProjectPaymentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { paymentId } = req.query
    if (paymentId === undefined || paymentId === null)
      throw new Error("UserId is required")
    // Busco usuario, si existe, luego los pagos
    const payment = await PaymentsModel.findByPk(+paymentId)
    if (!payment) throw new Error("Payment not found")

    res.status(200).json(payment)
  } catch (error) {
    res.status(400).send({ message: "Error getting user Payments" })
  }
}

export default getProjectPaymentById
