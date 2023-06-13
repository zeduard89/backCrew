import { Router, Request, Response } from "express"
import {
  projectValidator,
  validatorString,
  deleteProjectValidator,
  updateProjectValidator,
  updateFundingCurrentValidator,
  updateLikes
} from "../schemas/projectSchemas"
import createProjectController from "../controllers/projects/postProjectHandler"
import getProjectByNameController from "../controllers/projects/getProjectByNameHandler"
import deleteProjectByNameController from "../controllers/projects/deleteProjectByName"
import getAllProjects from "../controllers/projects/getAllProjects"
import updateProjectController from "../controllers/projects/updateProjectController"
import updateFundingCurrentController from "../controllers/projects/updateFundingCurrentController"
import getDayLeftByNameController from "../controllers/projects/getDayLeftByNameHandler"
import updateLikesController from "../controllers/projects/updateLikesControllers"

const router = Router()
//* Datos IMPORTANTES
//* Title es unico - displaysProject'habilita/deshabilita el projecto'

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

// Ruta UPDATE DATOS de un project.
router.put("/update", async (req: Request, res: Response) => {
  try {
    const validatedProject = updateProjectValidator.parse(req.body)

    const updatedProject = await updateProjectController(validatedProject)
    res.status(200).json(updatedProject)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar proyecto por Id"
    res.status(400).send(errorMessage)
  }
})

// Ruta UPDATE fundingCurrent
router.put(
  "/update/addToFundingCurrent",
  async (req: Request, res: Response) => {
    try {
      const validatedProject = updateFundingCurrentValidator.parse(req.body)

      const updatedProject = await updateFundingCurrentController(
        validatedProject
      )
      res.status(200).json(updatedProject)
    } catch (error) {
      const errorMessage =
        (error as Error).message ||
        "Error desconocido al buscar proyecto por Id"
      res.status(400).send(errorMessage)
    }
  }
)

// Ruta UPDATE likes
router.put("/update/likes", async (req: Request, res: Response) => {
  try {
    const validatedProject = updateLikes.parse(req.body)

    const updatedProject = await updateLikesController(validatedProject)
    res.status(200).json(updatedProject)
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

// Ruta busca por name los Dias restantes
router.get("/search/daysleft", async (req: Request, res: Response) => {
  try {
    const { name } = req.query
    const validatedName = validatorString.parse(name)
    if (name !== undefined) {
      const getProjectByName = await getDayLeftByNameController(validatedName)
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

// Ruta delete por name (actualiza booleano de displayProject)
router.delete("/deleteProject", async (req: Request, res: Response) => {
  try {
    const validatedProject = deleteProjectValidator.parse(req.body)
    const deleteProjectByName = await deleteProjectByNameController(
      validatedProject
    )
    res.status(200).json(deleteProjectByName)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar Project by ID"
    res.status(400).send(errorMessage)
  }
})

// Controlador de rutas no especificadas
router.get("*", (_req: Request, res: Response) => {
  res.status(404).send("Ruta no encontrada")
})

export { router }
