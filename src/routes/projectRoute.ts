import { Router, Request, Response } from "express"

import {
  projectValidator,
  validatorString,
  deleteProjectValidator,
  updateProjectValidator,
  updateFundingCurrentValidator,
  updateLikesValidator,
  validatorQuerySearch
} from "../schemas/projectSchemas"
// Crear project
import createProjectController from "../controllers/projects/postProjectHandler"
import deleteProject from "../controllers/projects/deleteProject"
import createRandomProjectController from "../controllers/projects/postRandomProjectHandler"

// Get by Id
import getProjectByIdController from "../controllers/projects/getProjectByIdController"

// Get by Name
import getProjectByNameController from "../controllers/projects/getProjectByNameHandler"
import getAllProjectsByNameController from "../controllers/projects/getAllProjectsByNameHandler"
import getAllProjetsWithUser from "../controllers/projects/getAllProjetsWithUser"
// Delete y getAll
import deleteProjectByNameController from "../controllers/projects/deleteProjectByName"
import getAllProjects from "../controllers/projects/getAllProjects"
// Update
import updateProjectController from "../controllers/projects/updateProjectController"
import updateFundingCurrentController from "../controllers/projects/updateFundingCurrentController"
// Varios
import getDayLeftByNameController from "../controllers/projects/getDayLeftByNameHandler"
import updateLikesController from "../controllers/projects/updateLikesControllers"
import getFilteredProjects from "../controllers/projects/getFilteredProjects"
import getTwentyMostTrending from "../controllers/projects/getTwentyMostTrending"
import getFiveMostFunding from "../controllers/projects/getFiveMostFunding"

// 50 Projects controller
// import create50Projects from "../controllers/projects/getCreate50Projects"

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
      (error as Error).message ||
      "Unknown error while searching for Project by ID"
    res.status(400).send(errorMessage)
  }
})

// Llenar la DB.
router.post("/llenarDB", (req: Request, res: Response) => {
  try {
    const { usuarios } = req.query
    if (usuarios === undefined) throw new Error("Users Query is Missing")

    createRandomProjectController(+usuarios)
    res.status(200).send({ message: "Database filled successfully" })
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while filling the database"
    res.status(400).send(errorMessage)
  }
})

// Ruta UPDATE DATOS de un project.
router.put("/update", async (req: Request, res: Response) => {
  try {
    if (
      !req.body.id ||
      !req.body.title ||
      !req.body.description ||
      !req.body.shortDescription ||
      !req.body.fundingGoal ||
      !req.body.fundingDayLeft ||
      !req.body.category
    )
      throw new Error("All fields are required")
    const validatedProject = updateProjectValidator.parse(req.body)

    const updatedProject = await updateProjectController(validatedProject)
    res.status(200).send(updatedProject)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while updating project"
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
        "Unknown error while searching for Project by ID"
      res.status(400).send(errorMessage)
    }
  }
)

// Ruta UPDATE likes
router.put("/update/likes", async (req: Request, res: Response) => {
  try {
    const validatedProject = updateLikesValidator.parse(req.body)

    const updatedProject = await updateLikesController(validatedProject)
    res.status(200).json(updatedProject)
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for Project by ID"
    res.status(400).send(errorMessage)
  }
})

// Ruta busca por nombre (UNIDAD) o devuelve un array de posibles coincidencias
router.get("/search/byName", async (req: Request, res: Response) => {
  try {
    const { name } = req.query
    const validatedName = validatorString.parse(name)
    if (name === undefined) throw Error("Name is required")
    const getProjectByName = await getProjectByNameController(validatedName)
    res.status(200).json(getProjectByName)
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for Project by Name"
    res.status(400).send(errorMessage)
  }
})

// Ruta busca por ID
router.get("/search/byId", async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    const validatedId = validatorString.parse(id)
    if (id !== undefined) {
      const getProjectById = await getProjectByIdController(validatedId)
      res.status(200).json(getProjectById)
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Error desconocido al buscar Project by ID"
    res.status(400).send(errorMessage)
  }
})

// Filtra por nombre y devuelve un array con coincidencias o similitudes
router.get("/search/byNameGeneral", async (req: Request, res: Response) => {
  try {
    const { name } = req.query
    const validatedName = validatorString.parse(name)
    if (name !== undefined) {
      const getProjectByName = await getAllProjectsByNameController(
        validatedName
      )
      res.status(200).json(getProjectByName)
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for Project by ID"
    res.status(400).send(errorMessage)
  }
})

// Route filter by name, category and sort (most founding and trending)
router.get("/searchProjects/", async (req: Request, res: Response) => {
  try {
    const { category, sort, q, p, s, country } = req.query
    const validatedCategory = validatorString.parse(category)
    const validatedSort = validatorString.parse(sort)
    const validatedQ = validatorQuerySearch.parse(q)
    const validatedP = validatorString.parse(p)
    const validatedS = validatorString.parse(s)
    const validatedCountry = validatorString.parse(country)
    const getProjectsFiltered = await getFilteredProjects(
      validatedCategory,
      validatedSort,
      validatedQ,
      validatedP,
      validatedS,
      validatedCountry
    )
    res.status(200).json(getProjectsFiltered)
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for Project by ID"
    res.status(400).send(errorMessage)
  }
})

// Ruta busca por name los Dias restantes
router.get("/search/daysleft", async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    const validatedId = validatorString.parse(id)
    if (id !== undefined) {
      const getProjectByName = await getDayLeftByNameController(validatedId)
      res.status(200).json(getProjectByName)
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for Project by ID"
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
      (error as Error).message || "Unknown error while searching all Projects"
    res.status(400).send(errorMessage)
  }
})

// Rutra que busca todos los projectos de la DB y los usuarios que dieron favoritos
router.get("/getAllProjets/withUsers", async (_req: Request, res: Response) => {
  try {
    const allProjects = await getAllProjetsWithUser()
    res.status(200).json(allProjects)
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Error desconocido al buscar todos los Projectos"
    res.status(400).send(errorMessage)
  }
})

// Search the five most funding projects
router.get("/fiveMostFunding", async (_req: Request, res: Response) => {
  try {
    const fiveMostFunding = await getFiveMostFunding()
    res.status(200).json(fiveMostFunding)
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while fetch five most funding Projects"
    res.status(400).send(errorMessage)
  }
})

// Search the twenty most trending projects
router.get("/twentyMostTrending", async (_req: Request, res: Response) => {
  try {
    const twentyMostTrending = await getTwentyMostTrending()
    res.status(200).json(twentyMostTrending)
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while fetch twenty most trending Projects"
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
      (error as Error).message ||
      "Unknown error while searching for Project by ID"
    res.status(400).send(errorMessage)
  }
})

// // Create 50projects
// router.get("/create50projects/", async (_req: Request, res: Response) => {
//   try {
//     const c50Projects = await create50Projects()
//     res.status(200).json(c50Projects)
//   } catch (error) {
//     const errorMessage =
//       (error as Error).message || "Error to load the projects"
//     console.log(error)
//     res.status(400).send(errorMessage)
//   }
// })

// Ruta delete por name (actualiza booleano de displayProject)
router.delete("/delete", async (req: Request, res: Response) => {
  try {
    const projectId = req.query.projectId
    if (!projectId || typeof projectId !== "string")
      throw new Error("valid projectId is required")
    const deleteProjectByName = await deleteProject(projectId)
    res.status(200).json(deleteProjectByName)
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      "Unknown error while searching for Project by ID"
    res.status(400).send(errorMessage)
  }
})

// Controlador de rutas no especificadas
router.get("*", (_req: Request, res: Response) => {
  res.status(404).send("Route not found")
})

export { router }
