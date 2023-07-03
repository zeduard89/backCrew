import { CommentModel, UserModel } from "../../config/db"
import { ICommentUpdate } from "../../types/types"

const userToProjectComment = async (
  validatedComment: ICommentUpdate
): Promise<object> => {
  try {
    const { userId, projectId, description } = validatedComment

    const userName = await UserModel.findByPk(userId)
    if (!userName) throw new Error("userId not found")

    const currentDate = new Date()
    const formattedDate = currentDate.toDateString()

    // Creo un comentario padre
    await CommentModel.create({
      userId,
      projectId,
      name: userName.name,
      description,
      date: formattedDate
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
