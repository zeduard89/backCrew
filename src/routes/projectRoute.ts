import { Router, Request, Response } from "express"
import { projectValidator, validatorString } from "../schemas/projectSchemas"
import createProjectController from "../controllers/projects/postProyectHandler"
import getProjectByNameController from "../controllers/projects/getProyectByNameHandler"
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

// Ruta busca por name
router.get("/search/", async (req: Request, res: Response) => {
  try {
    const { name } = req.query
    const validatedName = validatorString.parse(name)
    if (name !== undefined) {
      const getProjectByName = await getProjectByNameController(validatedName)
      res.status(200).json(getProjectByName)
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar Project by ID"
    res.status(400).send(errorMessage)
  }
})

// Rutra que busca todos los projectos de la DB
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

// Controlador de rutas no especificadas
router.get("*", (_req: Request, res: Response) => {
  res.status(404).send("Ruta no encontrada")
})

export { router }
