// import { CommentModel } from "../../config/db"

// const getAllComments = async (validatedId: string): Promise<object> => {
//   try {
//     // Busco todos los comentarios
//     if (!validatedId) throw new Error("Project Id is required")
//     const commentsOfProject = await CommentModel.findAll({
//       where: { projectId: validatedId }
//     })

//     return commentsOfProject
//   } catch (error) {
//     const errorMessage =
//       (error as Error).message || "Error desconocido al buscar proyecto por Id"
//     return { errorMessage }
//   }
// }

// export default getAllComments

import { CommentModel, UserModel } from "../../config/db"

const getAllComments = async (validatedId: string): Promise<object> => {
  try {
    // Busco todos los comentarios
    if (!validatedId) throw new Error("Project Id is required")
    const commentsOfProject = await CommentModel.findAll({
      where: { projectId: validatedId },
      include: [{ model: UserModel, attributes: ["avatar"] }]
    })

    return commentsOfProject
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    return { errorMessage }
  }
}

export default getAllComments
