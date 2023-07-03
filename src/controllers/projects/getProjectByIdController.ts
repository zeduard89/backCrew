import { ProjectModel, ImagesModel, CommentModel } from "../../config/db"

const getProjectByIdController = async (
  validatedName: string
): Promise<object> => {
  try {
    // Busco todos los projects, filtro y generalizo la escritura al buscarlos
    // const Project = await ProjectModel.findByPk(validatedName, {
    //   include: [
    //     {
    //       model: ImagesModel,
    //       attributes: ["url"]
    //     }
    //   ]
    // })
    const Project = await ProjectModel.findByPk(validatedName, {
      include: [
        {
          model: ImagesModel,
          attributes: ["url"]
        },
        {
          model: CommentModel
        }
      ]
    })

    if (!Project) throw new Error("The project does not exist")

    return Project
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for projects by Id"
    return { errorMessage }
  }
}

export default getProjectByIdController
