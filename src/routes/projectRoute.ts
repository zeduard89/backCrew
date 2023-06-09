import { Router, Request, Response } from 'express'
import toNewProyects from '../utils/utilsProjects' // Validador del Body
// import proyectos from '../controllers/projects/postHandler'

const router = Router()

router.post('/', (req: Request, res: Response) => {
  try {
    const projectInfo = toNewProyects(req.body)

    // const newProject = proyectos(projectInfo)

   //  res.json(newProject)
  } catch (error) {
    res.status(400).send(error.message || 'Error Desconocido')
  }
})

export { router }
