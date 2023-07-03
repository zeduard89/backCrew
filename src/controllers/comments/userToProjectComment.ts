import { CommentModel } from "../../config/db"
import { IComment } from "../../types/types"

const userToProjectComment = async (
  validatedComment: IComment
): Promise<object> => {
  try {
    const { userId, projectId, name, description, ...rest } = validatedComment

    // Creo un comentario padre
    await CommentModel.create({
      userId,
      projectId,
      name,
      description,
      ...rest
    })

    const allProjectComments = await CommentModel.findAll({
      where: { projectId }
    })

    return allProjectComments
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    return { errorMessage }
  }
}

export default userToProjectComment
