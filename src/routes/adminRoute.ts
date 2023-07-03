import { Router, Request, Response } from "express"
import { validatorQuerySearch } from "../schemas/projectSchemas"
// Filtered Admin Main
import getFilteredAdminMain from "../controllers/admin/getFilteredAdminMainInfo"
import getFilteredSortUsers from "../controllers/admin/getFilteredSortUsers"
import toggleAdminStatus from "../controllers/admin/putAdmin"

const router = Router()

router.get("/dashboardMain", async (_req: Request, res: Response) => {
  try {
    const getAdminMainInfo = await getFilteredAdminMain()
    res.status(200).json(getAdminMainInfo)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while searching info"
    res.status(400).send(errorMessage)
  }
})

// Route filter user by name and sort (admin and funding)
router.get("/dashboardSearchUsers", async (req: Request, res: Response) => {
  try {
    const { name, admin, funding } = req.query
    const validatedName = validatorQuerySearch.parse(name)
    const validatedAdmin = validatorQuerySearch.parse(admin)
    const validatedFunding = validatorQuerySearch.parse(funding)

    const getFilteredUsers = await getFilteredSortUsers(
      validatedName,
      validatedAdmin,
      validatedFunding
    )
    res.status(200).json(getFilteredUsers)
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching users in DashBoard Admin"
    res.status(400).send(errorMessage)
  }
})

// Change user to admin
router.put("/userToAdmin", async (req: Request, res: Response) => {
  try {
    const { userID } = req.query
    console.log(userID)
    if (!userID || typeof userID !== "string") {
      throw new Error("Valid userID is required")
    }

    const changeUserToAdmin = await toggleAdminStatus(userID)
    res.status(200).json({ message: changeUserToAdmin })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while changing user to admin"
    res.status(400).send(errorMessage)
  }
})

export { router }
