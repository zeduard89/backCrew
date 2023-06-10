import { Router, Request, Response } from "express"
import projectController from "../controllers/projects/postHandler"

const router = Router()

router.post("/", (req: Request, res: Response) => {
  try {
    const projectInfo = req.body

    const newProject = projectController(projectInfo)
    // console.log(projectInfo)
    res.status(200).json(newProject)
  } catch (error: any) {
    res.status(400).send(error.message || "Error Desconocido")
  }
})

export { router }
