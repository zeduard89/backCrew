import { CommentModel } from "../../config/db"
import { ILikeComment } from "../../types/types"

const putCommentToLike = async (
  validatedComment: ILikeComment
): Promise<string> => {
  try {
    const { commentId, like, disLike } = validatedComment
    const parentComment = await CommentModel.findByPk(commentId)

    if (!parentComment) throw new Error("Comment not found")

    await parentComment.update(
      {
        likes: parentComment.likes + like,
        disLikes: parentComment.disLikes + disLike
      },
      {
        where: {
          id: commentId
        }
      }
    )

    return " success"
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    return errorMessage
  }
}

export default putCommentToLike
