import {
  ProjectModel,
  ImagesModel,
  CommentModel,
  UserModel
} from "../../config/db"

const getProjectByIdController = async (
  validatedName: string
): Promise<object> => {
  try {
    const Project = await ProjectModel.findByPk(validatedName, {
      include: [
        {
          model: ImagesModel,
          attributes: ["url"]
        },
        {
          model: CommentModel,
          include: [
            {
              model: UserModel,
              attributes: ["avatar"]
            }
          ]
        }
      ]
    })

    if (!Project) throw new Error("The project does not exist")
    if (Project.displayProject === false)
      throw new Error("The project is banned")
    return Project
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for projects by Id"
    return { errorMessage }
  }
}

export default getProjectByIdController
