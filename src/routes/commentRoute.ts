import { Router, Request, Response } from "express"
import { validatorComment } from "../schemas/commentSchema"
import createCommentController from "../controllers/comments/postCommentController"

const router = Router()

router.post("/commentProject", async (req: Request, res: Response) => {
  try {
    const { comment } = req.body
    if (!comment) throw new Error("Ingrese un valor valido")

    // Valido la informacion
    const validatedComment = validatorComment.parse(comment)
    const newComment = await createCommentController(validatedComment)
    res.status(200).json(newComment)
    
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    res.status(400).send(errorMessage)
  }
})

export { router }
