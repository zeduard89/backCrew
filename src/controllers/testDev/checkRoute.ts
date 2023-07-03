import { Response, Request } from "express"
import { UserModel, ProjectModel, PaymentsModel } from "../../config/db"

const checkRoute = async (_req: Request, res: Response): Promise<void> => {
  try {
    //! USER
    // Base de busqueda
    const user = await UserModel.findByPk("123456")
    if (!user) throw new Error("User not found")
    const project = await ProjectModel.findByPk(
      "31ffa365-86e8-42d3-a173-506ea427b2cc"
    )
    if (!project) throw new Error("Project not found")
    const payment = await PaymentsModel.findByPk("1315896961")
    if (!payment) throw new Error("Payment not found")

    // Obtengo los projectos asociados
    // const getAllProjects = await user.$get("projects")

    // Cuento los registros asociados
    // const countedProjects = await user.$count("projects")

    // Verifico si tiene registros Asociados (projects es una instancia especifica del projecto se ven en)
    // const createdProjectID = "31ffa365-86e8-42d3-a173-506ea427b2cc"
    // const isAsociated = await user.$has("projects", createdProjectID)

    // ELimino un projecto asociado al usuario
    // const projectId = '123456'
    // await user.$remove("projects", projectId)

    //! Projects

    // Obtengo los usuarios asociados
    // const getAllUsers = await project.$get("user")

    //! Payments
    const userPayments = await user.$get("userPayments")
    // user.$add("userPayment" /* instance */).then(/* ... */)
    // user.$get("userPayment").then(/* ... */)
    // user.$count("userPayment").then(/* ... */)
    // user.$has("userPayment").then(/* ... */)
    // user.$remove("userPayment" /* instance */).then(/* ... */)
    // user.$create("userPayment" /* value */).then(/* ... */)

    res.status(200).json(userPayments)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while retrieving all projects"
    res.status(400).send(errorMessage)
  }
}

export default checkRoute
