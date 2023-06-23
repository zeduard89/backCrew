import { Response, Request } from "express"
import { ProjectModel } from "../../config/db"

const getAllPaymentsFromOneProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectId = req.query.projectId as string
    if (projectId === undefined || projectId === null)
      throw new Error("UserId is required")
    // Busco usuario, si existe, luego los pagos
    const project = await ProjectModel.findByPk(projectId)
    if (!project) throw new Error("User not found")
    const projectPayments = await project.$get("projectPayments")
    if (!projectPayments || projectPayments.length === 0)
      res.status(200).send({ message: "No data found" })
    res.status(200).json(projectPayments)
  } catch (error) {
    res.status(400).send({ message: "Error getting all project Payments" })
  }
}

export default getAllPaymentsFromOneProject
