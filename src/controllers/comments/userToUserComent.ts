import { CommentModel, UserModel } from "../../config/db"
import { childComment } from "../../types/types"

const userToUserComment = async (
  validatedComment: childComment
): Promise<object> => {
  try {
    const { name, description, userId, projectId, parentId } = validatedComment

    const parentComment = await CommentModel.findByPk(parentId)

    if (!parentComment) throw new Error("Comment not found")

    // Creo un comentario hijo
    await CommentModel.create({
      name,
      description,
      userId,
      projectId,
      parentId: parentComment.id
    })

    // const allProjectComments = await CommentModel.findAll({
    //   where: { projectId }
    // })

    const allProjectComments = await CommentModel.findAll({
      where: { projectId },
      include: [{ model: UserModel, attributes: ["image"] }]
    })

    return allProjectComments
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    return { errorMessage }
  }
}

export default userToUserComment
