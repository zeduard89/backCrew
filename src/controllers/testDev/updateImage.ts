import { Response, Request } from "express"
import { ImagesModel } from "../../config/db"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const RAILWAY = process.env.RAILWAY

const updateImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.query.projectId // Acceder al valor del parámetro projectId

    if (!projectId || typeof projectId !== "string")
      throw new Error("Ingrese un id")
    //! USER
    // Base de busqueda

    const objectImages = (
      await axios.get(`${RAILWAY}/blobRoute/getAllFiles/crew${projectId}`)
    ).data

    const images = objectImages.map((objectImage: any) => ({
      name: objectImage.name,
      url: objectImage.url,
      projectId
    }))

    await ImagesModel.bulkCreate(images, {
      updateOnDuplicate: ["name", "url"] // Indica qué columnas se actualizarán en caso de duplicados
    })

    res.status(200).json("Projecto Actualizado")
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while retrieving all projects"
    res.status(400).send(errorMessage)
  }
}

export default updateImages
