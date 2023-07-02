import { Response, Request } from "express"
import { ImagesModel } from "../../config/db"

const getImages = async (_req: Request, res: Response): Promise<void> => {
  try {
    //! USER
    // Base de busqueda
    const images = await ImagesModel.findAll()

    res.status(200).json(images)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while retrieving all projects"
    res.status(400).send(errorMessage)
  }
}

export default getImages
