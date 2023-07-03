import { Response, Request } from "express"
import { ImagesModel } from "../../config/db"

const deleteImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { urlId } = req.body // Access the value of the urlId parameter
    console.log(urlId)
    if (urlId === undefined) throw new Error("Imagen no encontrada")

    const imageFinded = await ImagesModel.findOne({
      where: {
        url: urlId
      }
    })
    if (imageFinded === null) throw new Error("Imagen no encontrada")
    await imageFinded.destroy()

    res.status(200).json("Imagen eliminada exitosamente")
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while deleting image"
    res.status(400).send(errorMessage)
  }
}

export default deleteImages
