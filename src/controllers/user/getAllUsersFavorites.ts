import { UserModel } from "../../config/db"
import { Request, Response } from "express"
import { validatorString } from "../../schemas/projectSchemas"

const getAllUsersFavorites = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.query.userId as string
    validatorString.parse(userId)

    if (!userId || userId === undefined) {
      throw new Error("UserId is required")
    }

    const user = await UserModel.findByPk(userId)
    if (!user) {
      throw new Error("User not found")
    }

    // as:favoritesProjects es la relacion que se seleccion en UserModel
    const favoriteProjects = await user.$get("favoriteProjects") // Obtener la lista de proyectos favoritos

    if (!favoriteProjects || favoriteProjects.length === 0) {
      return res.status(200).json([])
    }

    return res.status(200).json(favoriteProjects)
  } catch (error) {
    // console.error("Error fetching projects for user:", error)
    // return res.status(500).json({
    //   success: false,
    //   error: "Internal server error"
    // })
    return res.status(400).send({ message: `${error}` })
  }
}

export default getAllUsersFavorites
