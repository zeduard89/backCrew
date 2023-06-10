import { Router, Request, Response } from "express"
import { projectValidator } from "../schemas/projectSchemas"
import createProjectController from "../controllers/projects/postProyectHandler"
import getProjectByIdController from "../controllers/projects/getProyectByIdHander"

const router = Router()

router.post("/", async (req: Request, res: Response) => {
  try {
    const validatedProject = projectValidator.parse(req.body)

    const newProject = await createProjectController(validatedProject)
    res.status(200).json(newProject)
  } catch (error: any) {
    res
      .status(400)
      .send(error.message || "Error desconocido al crear el proyecto")
  }
})

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    console.log(id)
    const getProjectById = await getProjectByIdController(id)
    res.status(200).json(getProjectById)
  } catch (error: any) {
    res
      .status(400)
      .send(error.message || "Error desconocido al buscar Project by ID")
  }
})

export { router }
