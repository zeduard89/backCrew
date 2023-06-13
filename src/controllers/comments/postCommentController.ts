import { CommentModel } from "../../config/db"

const createCommentController = async (
  validatedComment: object
): Promise<object> => {
  try {
    console.log(CommentModel, validatedComment)
    return { message: "Accion correcta" }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    return { errorMessage }
  }
}

export default createCommentController
