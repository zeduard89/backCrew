import { Router, Request, Response } from "express"
import { CommentModel } from "../config/db"
import {
  validatorCommentUserToProject,
  validatorCommentUserToUser,
  validatorCommentLikes
} from "../schemas/commentSchema"
import { validatorString } from "../schemas/projectSchemas"
import userToProjectComment from "../controllers/comments/userToProjectComment"
import userToUserComment from "../controllers/comments/userToUserComent"
import getAllComments from "../controllers/comments/getAllComents"
import putCommentLike from "../controllers/comments/putCommentLike"

const router = Router()

router.post("/addCommentUserToProject", async (req: Request, res: Response) => {
  try {
    const commentToProject = req.body
    if (!commentToProject) throw new Error("Invalid Parameters")

    // Valido la informacion
    const validatedComment =
      validatorCommentUserToProject.parse(commentToProject)
    if (validatedComment === undefined) throw new Error("Need all parametres")
    const newComment = await userToProjectComment(validatedComment)
    res.status(200).json(newComment)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    res.status(400).send(errorMessage)
  }
})

router.post("/addCommentUserToUser", async (req: Request, res: Response) => {
  try {
    const commentToUser = req.body
    if (!commentToUser) throw new Error("Innvalid Parameters")

    // Valido la informacion
    const validatedComment = validatorCommentUserToUser.parse(commentToUser)
    if (validatedComment === undefined) throw new Error("Need all parametres")
    const newComment = await userToUserComment(validatedComment)

    res.status(200).json(newComment)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    res.status(400).send(errorMessage)
  }
})

router.put("/addCommentlikes", async (req: Request, res: Response) => {
  try {
    const likesToUser = req.body
    if (!likesToUser) throw new Error("Innvalid Parameters")

    // Valido la informacion
    const validatedComment = validatorCommentLikes.parse(likesToUser)
    if (validatedComment === undefined) throw new Error("Need all parametres")
    const newComment = await putCommentLike(validatedComment)

    res.status(200).json(newComment)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    res.status(400).send(errorMessage)
  }
})

router.get("/getAllComents", async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query
    if (!projectId) throw new Error("Invalid Parameters")

    // Valido la informacion
    const validatedComment = validatorString.parse(projectId)
    if (validatedComment === undefined) throw new Error("Need all parametres")
    const commentsOfProjects = await getAllComments(validatedComment)
    res.status(200).json(commentsOfProjects)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    res.status(400).send(errorMessage)
  }
})

router.get("/getFatherComment", async (req: Request, res: Response) => {
  try {
    const { commentId } = req.query
    if (!commentId) throw new Error("Invalid Parameters")

    // Valido la informacion
    const validatedComment = validatorString.parse(commentId)
    if (validatedComment === undefined) throw new Error("Need all parametres")

    // Busco al comentario Padre
    const comment = await CommentModel.findByPk(validatedComment)
    const fatherComment = await comment?.$get("parentComment")
    res.status(200).json(fatherComment)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    res.status(400).send(errorMessage)
  }
})

router.get("/getChildsComment", async (req: Request, res: Response) => {
  try {
    const { commentId } = req.query
    if (!commentId) throw new Error("Invalid Parameters")

    // Valido la informacion
    const validatedComment = validatorString.parse(commentId)
    if (validatedComment === undefined) throw new Error("Need all parametres")

    // Busco los Comentario hijos
    const comment = await CommentModel.findByPk(validatedComment)
    const childsComment = await comment?.$get("nestedComments")
    res.status(200).json(childsComment)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    res.status(400).send(errorMessage)
  }
})

export { router }
