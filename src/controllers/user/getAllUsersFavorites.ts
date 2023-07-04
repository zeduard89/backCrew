import { UserModel, ImagesModel, ProjectModel } from "../../config/db"
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

    const user = await UserModel.findOne({
      where: { id: userId, verified: true }
    })

    if (!user) {
      throw new Error("User not found or was Banned")
    }

    const favoriteProjects = await user.$get("favoriteProjects") // Obtener la lista de proyectos favoritos

    const auxArray = await Promise.all(
      favoriteProjects.map(async (project) => {
        const projectWithImages = await ProjectModel.findByPk(project.id, {
          include: [
            {
              model: ImagesModel,
              attributes: ["url"]
            }
          ]
        })
        return projectWithImages
      })
    )

    if (!auxArray || auxArray.length === 0) {
      return res.status(200).json([])
    }

    return res.status(200).json(auxArray)
  } catch (error) {
    return res.status(400).send({ message: `${error}` })
  }
}

export default getAllUsersFavorites
