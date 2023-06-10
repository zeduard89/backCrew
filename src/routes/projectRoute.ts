import { Router, Request, Response } from "express"
import { projectValidator, validatorUUID } from "../schemas/projectSchemas"
import createProjectController from "../controllers/projects/postProyectHandler"
import getProjectByIdController from "../controllers/projects/getProyectByIdHander"
import getAllProjects from "../controllers/projects/getAllProjects"

const router = Router()
// Datos
// Title es unico - id es UUID

// Ruta crea un project.
router.post("/", async (req: Request, res: Response) => {
  try {
    const validatedProject = projectValidator.parse(req.body)

    const newProject = await createProjectController(validatedProject)
    res.status(200).json(newProject)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    res.status(400).send(errorMessage)
  }
})

router.get("/serach/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    validatorUUID.parse(id)
    const getProjectById = await getProjectByIdController(id)
    res.status(200).json(getProjectById)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar Project by ID"
    res.status(400).send(errorMessage)
  }
})

router.get("/allProjects", async (_req: Request, res: Response) => {
  try {
    const allProjects = await getAllProjects()
    res.status(200).json(allProjects)
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Error desconocido al buscar todos los Projectos"
    res.status(400).send(errorMessage)
  }
})

export { router }
